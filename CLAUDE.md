## General behavior
- Always explain the plan before making changes.
- Report progress after each meaningful step.
- Summarize changed files and test results before finishing.
- Reply in Traditional Chinese.
- 所有新增或修改的中文內容（包含 commit message、規格文件與對外說明）都必須以 UTF-8 正確保存與提交，不得出現亂碼、問號替代字元，或讓 BOM 汙染可見文字。

<!-- ## Spec workflow -->

## File access restrictions
- Do not read or modify `_private/_private_notes/筆記.txt`.
- Ignore personal notes and learning materials unless explicitly asked.
- Restricted version folder names: `done`.
<!-- - Restricted version folder names: `done`, `v11`. -->
- Within `_private/_private_notes/`, do not read or modify any folder whose name matches a restricted version folder name, or any files inside it, regardless of nesting depth.
- Within `_private/_private_fileAssets/`, do not read or modify any folder whose name matches a restricted version folder name, or any files inside it, regardless of nesting depth.
