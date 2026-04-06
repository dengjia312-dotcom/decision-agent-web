require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_API_URL = 'https://api.dify.ai/v1/chat-messages';

// 解析 JSON 请求体
app.use(express.json());

// 托管前端静态文件
app.use(express.static(path.join(__dirname, 'public')));

// POST /api/chat — 转发请求到 Dify
app.post('/api/chat', async (req, res) => {
  const { query, conversation_id } = req.body;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: '请输入问题内容' });
  }

  if (!DIFY_API_KEY) {
    return res.status(500).json({ error: '服务器未配置 DIFY_API_KEY，请检查 .env 文件' });
  }

  try {
    const response = await axios.post(
      DIFY_API_URL,
      {
        inputs: {},
        query: query.trim(),
        response_mode: 'blocking',
        conversation_id: conversation_id || '',
        user: 'user-demo-001',
      },
      {
        headers: {
          Authorization: `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { answer, conversation_id: newConversationId } = response.data;

    res.json({
      answer,
      conversation_id: newConversationId,
    });
  } catch (err) {
    // 把 Dify 返回的错误信息透传给前端，方便调试
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.message || err.message || '调用 Dify API 失败';
    console.error('[Dify Error]', status, message);
    res.status(status).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`服务已启动：http://localhost:${PORT}`);
});
