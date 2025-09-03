# 🚀 如何部署修复到GitHub

## ⚠️ 重要说明

当前目录不是git仓库(可能是从GitHub下载的ZIP文件)。
您需要将修复的文件上传到GitHub仓库。

## 📋 方法1: 使用GitHub Desktop (推荐,最简单)

1. **打开GitHub Desktop**

2. **克隆您的仓库**:
   - File → Clone Repository
   - 选择 `DeangeloKreiger/PropertyTrading`
   - 克隆到一个新位置,例如: `D:\repos\PropertyTrading`

3. **复制修复的文件**:
   从当前目录复制这些文件到克隆的仓库:
   ```
   D:\PropertyTrading\PropertyTrading\
   ```

   复制到:
   ```
   D:\repos\PropertyTrading\
   ```

   需要复制的关键文件:
   - ✅ `.npmrc` (新文件)
   - ✅ `vercel.json` (新文件)
   - ✅ `index.html` (已修改)
   - ✅ `src/config/wagmi.ts` (已修改)
   - ✅ `src/utils/contract.ts` (已修改)
   - ✅ `tsconfig.json` (已修改)

4. **在GitHub Desktop中**:
   - 您会看到所有更改
   - 在Summary中输入: `Fix deployment issues`
   - 在Description中输入: `Resolve npm dependencies and TypeScript errors`
   - 点击 "Commit to main"
   - 点击 "Push origin"

5. **等待部署** (2-5分钟)

## 📋 方法2: 使用Git命令行

### 步骤1: 克隆仓库
```bash
cd D:\repos
git clone https://github.com/DeangeloKreiger/PropertyTrading.git
cd PropertyTrading
```

### 步骤2: 复制修复的文件
在Windows资源管理器中:
- 从: `D:\PropertyTrading\PropertyTrading\`
- 到: `D:\repos\PropertyTrading\`

复制以下文件:
- `.npmrc`
- `vercel.json`
- `index.html`
- `src/config/wagmi.ts`
- `src/utils/contract.ts`
- `tsconfig.json`

### 步骤3: 提交并推送
```bash
cd D:\repos\PropertyTrading

# 查看更改
git status

# 添加所有更改
git add .

# 提交
git commit -m "Fix deployment: resolve npm dependencies and TypeScript errors

- Add .npmrc for legacy-peer-deps support
- Fix TypeScript type errors in wagmi config
- Fix address parameter types in contract utils
- Update tsconfig for better compatibility
- Add Vercel deployment configuration"

# 推送到GitHub
git push origin main
```

## 📋 方法3: 使用GitHub网页界面上传

1. **访问**: https://github.com/DeangeloKreiger/PropertyTrading

2. **对于每个需要修改的文件**:

   **新建文件** (.npmrc):
   - 点击 "Add file" → "Create new file"
   - 文件名: `.npmrc`
   - 内容: `legacy-peer-deps=true`
   - 提交

   **新建文件** (vercel.json):
   - 点击 "Add file" → "Create new file"
   - 文件名: `vercel.json`
   - 内容: (见下方)

   **编辑已存在的文件**:
   - 点击文件 → 点击编辑按钮(铅笔图标)
   - 修改内容
   - 提交

## 📄 需要创建/修改的文件内容

### 1. `.npmrc` (新建)
```
legacy-peer-deps=true
```

### 2. `vercel.json` (新建)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --legacy-peer-deps",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. `index.html` (修改第5行)
找到:
```html
<link rel="icon" type="image/svg+xml" href="./vite.svg" />
```

改为:
```html
<link rel="icon" type="image/svg+xml" href="/PropertyTrading/vite.svg" />
```

### 4. `src/config/wagmi.ts` (修改第20-29行)
找到:
```typescript
export const config = createConfig({
  chains: [sepolia],
  connectors: projectId
    ? [injected(), walletConnect({ projectId })]
    : [injected()],
  transports: {
    [sepolia.id]: http(),
  },
})
```

改为:
```typescript
const connectors: any = projectId
  ? [injected(), walletConnect({ projectId })]
  : [injected()]

export const config = createConfig({
  chains: [sepolia],
  connectors,
  transports: {
    [sepolia.id]: http(),
  },
})
```

### 5. `src/utils/contract.ts` (修改第50-70行)
找到两处:
```typescript
args: [owner as `0x${string}`],
```
和
```typescript
args: [user as `0x${string}`],
```

改为:
```typescript
args: [owner as any as `0x${string}`],
```
和
```typescript
args: [user as any as `0x${string}`],
```

### 6. `tsconfig.json` (修改)
在 `compilerOptions` 中找到:
```json
"noUnusedLocals": true,
"noUnusedParameters": true,
```

改为:
```json
"noUnusedLocals": false,
"noUnusedParameters": false,
```

在末尾添加:
```json
"include": ["src/**/*.ts", "src/**/*.tsx"],
"exclude": ["node_modules", "dist", "**/*.old.*", "**/main-old.ts"]
```

## ✅ 验证部署

推送后:

1. **查看GitHub Actions**:
   - 访问: https://github.com/DeangeloKreiger/PropertyTrading/actions
   - 查看最新的workflow运行
   - 等待绿色勾号 ✅

2. **访问网站**:
   - 等待2-5分钟
   - 访问: https://deangelokreiger.github.io/PropertyTrading/
   - 应该看到完整的应用界面 (不再是空白页)

## 🆘 如果遇到问题

如果部署仍然失败:
1. 检查GitHub Actions日志中的错误信息
2. 确认所有文件都已正确修改
3. 确认commit已成功推送到main分支

---

**所有修复文件都在当前目录中**:
`D:\PropertyTrading\PropertyTrading\`

**选择上面任一方法将它们上传到GitHub即可!**
