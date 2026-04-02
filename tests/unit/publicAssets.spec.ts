// @vitest-environment node
import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { build, resolveConfig } from 'vite';

import {
  faviconFileName,
  legacyPublicAssetSourceDir,
  publicAssetFileNames,
  publicAssetSourceDir,
  pwaIconFileNames
} from '@/shared/config/publicAssets';

const repoRoot = resolve(__dirname, '..', '..');
const viteConfigPath = resolve(repoRoot, 'vite.config.ts');

function toRepoPath(relativePath: string): string {
  return join(repoRoot, ...relativePath.split('/'));
}

function normalizePathForAssertion(path: string): string {
  return path.replaceAll('\\', '/');
}

async function expectRepoFileExists(relativePath: string): Promise<void> {
  await expect(access(toRepoPath(relativePath))).resolves.toBeUndefined();
}

async function loadResolvedProjectConfig() {
  return resolveConfig(
    {
      configFile: viteConfigPath,
      root: repoRoot,
      mode: 'test'
    },
    'build'
  );
}

async function buildIntoTempDir(): Promise<string> {
  const outDir = await mkdtemp(join(tmpdir(), 'duotify-public-assets-'));

  await build({
    configFile: viteConfigPath,
    root: repoRoot,
    mode: 'test',
    logLevel: 'silent',
    build: {
      outDir,
      emptyOutDir: true
    }
  });

  return outDir;
}

async function readBuiltFile(outDir: string, relativePath: string): Promise<string> {
  return readFile(join(outDir, ...relativePath.split('/')), 'utf8');
}

describe('public asset configuration', () => {
  let buildOutDir = '';

  beforeAll(async () => {
    buildOutDir = await buildIntoTempDir();
  }, 120000);

  afterAll(async () => {
    if (buildOutDir) {
      await rm(buildOutDir, { recursive: true, force: true });
    }
  });

  it('公開資產來源指向 v1/public，而不是舊的缺失路徑', async () => {
    const projectConfig = await loadResolvedProjectConfig();

    expect(normalizePathForAssertion(projectConfig.publicDir)).toBe(normalizePathForAssertion(toRepoPath(publicAssetSourceDir)));
    expect(normalizePathForAssertion(projectConfig.publicDir)).not.toBe(normalizePathForAssertion(toRepoPath(legacyPublicAssetSourceDir)));
  });

  it('必要 favicon 與 PWA icon 檔案都存在於公開資產來源', async () => {
    for (const assetFileName of publicAssetFileNames) {
      await expectRepoFileExists(`${publicAssetSourceDir}/${assetFileName}`);
    }
  });

  it('建置後首頁會引用 favicon，且實際輸出 icon 產物', async () => {
    const builtHtml = await readBuiltFile(buildOutDir, 'index.html');

    expect(builtHtml).toMatch(/rel="icon"/);
    expect(builtHtml).toContain(`href="/${faviconFileName}"`);

    await expect(access(join(buildOutDir, faviconFileName))).resolves.toBeUndefined();

    for (const iconFileName of pwaIconFileNames) {
      await expect(access(join(buildOutDir, ...iconFileName.split('/')))).resolves.toBeUndefined();
    }
  });

  it('建置後 manifest 只引用可發布的 PWA icon 路徑', async () => {
    const manifestContent = await readBuiltFile(buildOutDir, 'manifest.webmanifest');
    const manifest = JSON.parse(manifestContent) as {
      icons?: Array<{ src: string }>;
    };

    expect(manifest.icons?.map((icon) => icon.src)).toEqual(expect.arrayContaining(pwaIconFileNames.map((icon) => `/${icon}`)));
    expect(manifestContent).not.toContain(legacyPublicAssetSourceDir);
  });
});
