# 帮我做决定

前端部署到 Vercel，后端部署到 Railway，通过 Dify API 实现 AI 聊天。

## 目录结构

```
decision-agent-web/
├─ frontend/
│  ├─ index.html     # 聊天页面
│  └─ config.js      # 接口地址配置（部署时修改这里）
├─ backend/
│  ├─ server.js      # Express 后端
│  ├─ package.json
│  ├─ .env.example   # 环境变量模板
│  └─ README.md
├─ .gitignore
└─ README.md
```

---

## 本地开发

### 1. 启动后端

```bash
cd backend
npm install
cp .env.example .env
# 编辑 .env，填入 DIFY_API_KEY=你的真实key
npm start
```

后端启动后监听：http://localhost:3000

### 2. 打开前端

直接用浏览器打开 `frontend/index.html` 文件，或用 VS Code Live Server 插件打开。

`frontend/config.js` 默认配置为：
```js
window.APP_API_BASE_URL = "http://localhost:3000";
```
本地开发无需修改。

---

## 部署

### 前端 → Vercel

1. 在 Vercel 新建项目，选择此 GitHub 仓库
2. **Root Directory 设置为 `frontend`**
3. Framework Preset 选 `Other`（纯静态）
4. 部署完成

> 部署前，先把 `frontend/config.js` 里的地址改成 Railway 后端域名：
> ```js
> window.APP_API_BASE_URL = "https://your-app.up.railway.app";
> ```

### 后端 → Railway

1. 在 Railway 新建项目，选择此 GitHub 仓库
2. **Root Directory 设置为 `backend`**
3. 在 Variables 页添加 `DIFY_API_KEY`
4. 部署完成后复制域名，填入 `frontend/config.js`

---

## 接口说明

### POST /api/chat

请求体：
```json
{
  "query": "我该换工作吗？",
  "conversation_id": ""
}
```

响应：
```json
{
  "answer": "AI 的回答...",
  "conversation_id": "abc-123",
  "message_id": "msg-xxx"
}
```

第一次请求 `conversation_id` 传空字符串，后续带上返回值即可实现连续对话。
