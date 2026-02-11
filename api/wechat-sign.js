// api/wechat-sign.js —— 兼容 Vercel Edge Runtime（无需 import crypto）
export default async function handler(req, res) {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'GET') return res.status(405).end();

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url parameter' });

  const APPID = process.env.WX_APPID;
  const APPSECRET = process.env.WX_APPSECRET;

  if (!APPID || !APPSECRET) {
    console.error('WX_APPID or WX_APPSECRET not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    // Step 1: 获取 access_token
    const tokenRes = await fetch(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
    );
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) throw new Error(`No access_token: ${JSON.stringify(tokenData)}`);
    const accessToken = tokenData.access_token;

    // Step 2: 获取 jsapi_ticket
    const ticketRes = await fetch(
      `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`
    );
    const ticketData = await ticketRes.json();
    if (ticketData.errcode !== 0) throw new Error(`No jsapi_ticket: ${JSON.stringify(ticketData)}`);
    const ticket = ticketData.ticket;

    // Step 3: 生成签名参数
    const nonceStr = Math.random().toString(36).substring(2, 15);
    const timestamp = Math.floor(Date.now() / 1000);
    const signUrl = decodeURIComponent(url).split('#')[0];

    const string = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${signUrl}`;

    // ✅ 使用 Web Crypto API 计算 SHA1（兼容 Edge）
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    res.json({
      appId: APPID,
      timestamp,
      nonceStr,
      signature,
      url: signUrl
    });

  } catch (error) {
    console.error('WeChat sign error:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}