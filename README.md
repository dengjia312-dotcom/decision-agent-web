# 帮我做决定

一个最简单的前后端项目，用来对接 Dify 聊天应用 API。

## 项目结构

```
decision-agent-web/
├── public/
│   └── index.html      # 前端页面（纯 HTML/CSS/JS）
├── server.js           # 后端（Node.js + Express）
├── package.json
├── .env.example        # 环境变量示例
└── README.md
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

把 `.env.example` 复制为 `.env`：

```bash
cp .env.example .env
```

然后打开 `.env` 文件，填入你的 Dify API Key：

```
DIFY_API_KEY=你的真实APIKey
PORT=3000
```

> 你可以在 Dify 控制台 → 应用 → API 访问 页面找到 API Key。

### 3. 启动后端

```bash
npm start
```

启动成功后会看到：

```
服务已启动：http://localhost:3000
```

### 4. 打开前端页面

直接在浏览器访问：

```
http://localhost:3000
```

前端页面由后端静态托管，无需单独启动。

---

## 开发模式（自动重启）

如果你想修改代码后自动重启服务，可以用：

```bash
npm run dev
```

需要先安装 nodemon（已包含在 devDependencies 中，`npm install` 会自动安装）。

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
  "answer": "这是 AI 的回答...",
  "conversation_id": "abc-123"
}
```

- 第一次发送时 `conversation_id` 传空字符串，后续把上次返回的 `conversation_id` 带上，即可实现连续对话。

---

## 常见问题

**Q: 页面提示"网络错误，请检查后端是否已启动"**
A: 确认 `npm start` 已运行，且访问的是 `http://localhost:3000`。

**Q: 提示"服务器未配置 DIFY_API_KEY"**
A: 检查根目录是否有 `.env` 文件，且 `DIFY_API_KEY` 已填写真实值。

**Q: 提示 401 Unauthorized**
A: API Key 填写有误，请到 Dify 控制台重新复制。
