const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
}

const { html } = req.body;

if (!html) {
return res.status(400).json({ error: 'HTML is required' });
}

const browser = await puppeteer.launch({
args: chromium.args,
defaultViewport: { width: 1080, height: 1080 },
executablePath: await chromium.executablePath(),
headless: true,
});

const page = await browser.newPage();
await page.setContent(html);
const screenshot = await page.screenshot({ type: 'png' });
await browser.close();

res.setHeader('Content-Type', 'image/png');
res.send(screenshot);
}
