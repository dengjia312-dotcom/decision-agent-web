# 后端说明

Node.js + Express 后端，提供 `/api/chat` 接口，转发请求到 Dify API。

## 本地启动

```bash
cd backend
npm install
cp .env.example .env   # 填入真实 DIFY_API_KEY
npm start
```

启动后访问：http://localhost:3000

## 部署到 Railway

1. 在 Railway 新建项目，选择"Deploy from GitHub repo"
2. 选择此仓库，**Root Directory 设置为 `backend`**
3. 在 Railway 的 Variables 页面添加：
   - `DIFY_API_KEY` = 你的真实 API Key
   - `PORT` = 3000（Railway 会自动注入，可不填）
4. 部署完成后，Railway 会分配一个域名，例如：
   `https://your-app.up.railway.app`
5. 把这个域名填入前端的 `frontend/config.js`：
   ```js
   window.APP_API_BASE_URL = "https://your-app.up.railway.app";
   ```
