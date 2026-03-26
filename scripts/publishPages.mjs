import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

function parseArgs(argv) {
  const options = {
    source: 'dist',
    branch: 'gh-pages',
    targetSubdir: ''
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const nextValue = argv[index + 1];

    if (token === '--source' && nextValue) {
      options.source = nextValue;
      index += 1;
      continue;
    }

    if (token === '--branch' && nextValue) {
      options.branch = nextValue;
      index += 1;
      continue;
    }

    if (token === '--target-subdir' && nextValue) {
      options.targetSubdir = nextValue;
      index += 1;
      continue;
    }
  }

  return options;
}

function runGit(args, cwd, options = {}) {
  const { allowFailure = false, stdio = 'inherit', encoding } = options;

  try {
    return execFileSync('git', args, {
      cwd,
      stdio,
      encoding
    });
  } catch (error) {
    if (allowFailure) {
      return null;
    }

    throw error;
  }
}

async function removeChildren(directory, preservedNames = []) {
  if (!existsSync(directory)) {
    return;
  }

  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (preservedNames.includes(entry.name)) {
      continue;
    }

    await rm(path.join(directory, entry.name), { recursive: true, force: true });
  }
}

async function preparePublishTree(worktreeDir, targetSubdir) {
  if (targetSubdir) {
    const targetDir = path.join(worktreeDir, targetSubdir);
    await mkdir(targetDir, { recursive: true });
    await removeChildren(targetDir);
    return targetDir;
  }

  await removeChildren(worktreeDir, ['.git', 'staging']);
  return worktreeDir;
}

async function copyDirectoryContents(sourceDir, destinationDir) {
  const entries = await readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    await cp(path.join(sourceDir, entry.name), path.join(destinationDir, entry.name), {
      recursive: true
    });
  }
}

async function main() {
  const repoRoot = process.cwd();
  const { source, branch, targetSubdir } = parseArgs(process.argv.slice(2));
  const sourceDir = path.resolve(repoRoot, source);

  if (!existsSync(sourceDir)) {
    throw new Error(`找不到要發佈的資料夾：${sourceDir}`);
  }

  const tempDir = mkdtempSync(path.join(tmpdir(), 'publish-pages-'));
  const hasRemoteBranch = runGit(['ls-remote', '--exit-code', '--heads', 'origin', branch], repoRoot, {
    allowFailure: true,
    stdio: 'ignore'
  }) !== null;

  let worktreeAdded = false;

  try {
    if (hasRemoteBranch) {
      runGit(['fetch', 'origin', branch], repoRoot);
      runGit(['worktree', 'add', '--force', tempDir, `origin/${branch}`], repoRoot);
      worktreeAdded = true;
      runGit(['checkout', '-B', branch], tempDir);
    } else {
      runGit(['worktree', 'add', '--detach', tempDir, 'HEAD'], repoRoot);
      worktreeAdded = true;
      runGit(['checkout', '--orphan', branch], tempDir);
    }

    const publishDir = await preparePublishTree(tempDir, targetSubdir);
    await copyDirectoryContents(sourceDir, publishDir);
    await writeFile(path.join(tempDir, '.nojekyll'), '');

    runGit(['add', '-A'], tempDir);
    const statusOutput = runGit(['status', '--porcelain'], tempDir, {
      stdio: 'pipe',
      encoding: 'utf8'
    });

    if (!statusOutput.trim()) {
      console.log('No publish changes to commit.');
      return;
    }

    const deployLabel = targetSubdir || 'production';
    const shortSha = (process.env.GITHUB_SHA || 'local').slice(0, 7);

    runGit(['commit', '-m', `deploy: publish ${deployLabel} (${shortSha})`], tempDir);
    runGit(hasRemoteBranch ? ['push', 'origin', `${branch}:${branch}`] : ['push', '-u', 'origin', `${branch}:${branch}`], tempDir);
  } finally {
    if (worktreeAdded) {
      runGit(['worktree', 'remove', '--force', tempDir], repoRoot, { allowFailure: true });
    }

    await rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
