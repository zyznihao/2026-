// api/wechat-sign.js
import crypto from 'crypto';

export default async function handler(req, res) {
  // 设置 CORS，允许跨域请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // 从环境变量读取公众号密钥（安全！）
  const APPID = process.env.WX_APPID;
  const APPSECRET = process.env.WX_APPSECRET;

  if (!APPID || !APPSECRET) {
    console.error('WX_APPID or WX_APPSECRET not set in environment variables');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    // Step 1: 获取 access_token
    const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      throw new Error(`Failed to get access_token: ${JSON.stringify(tokenData)}`);
    }
    const accessToken = tokenData.access_token;

    // Step 2: 获取 jsapi_ticket
    const ticketUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`;
    const ticketRes = await fetch(ticketUrl);
    const ticketData = await ticketRes.json();

    if (ticketData.errcode !== 0 || !ticketData.ticket) {
      throw new Error(`Failed to get jsapi_ticket: ${JSON.stringify(ticketData)}`);
    }
    const ticket = ticketData.ticket;

    // Step 3: 生成签名所需参数
    const nonceStr = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const timestamp = Math.floor(Date.now() / 1000);

    // 拼接签名字符串（注意：url 必须是前端传入的完整 URL，不含 hash）
    let signUrl = decodeURIComponent(url);
    if (signUrl.includes('#')) {
      signUrl = signUrl.split('#')[0]; // 微信要求去掉 # 及之后的内容
    }

    const string = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${signUrl}`;
    const signature = crypto.createHash('sha1').update(string, 'utf8').digest('hex');

    // 返回结果
    res.json({
      appId: APPID,
      timestamp,
      nonceStr,
      signature,
      url: signUrl
    });

  } catch (error) {
    console.error('Error in wechat-sign:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}