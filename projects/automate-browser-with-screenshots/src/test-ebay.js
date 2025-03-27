import { chromium } from 'playwright';
import { askGPTVisualClick } from './askGPTVisualClick.js';

(async () => {
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  await page.goto('https://www.ebay.com/');

  const screenshotPath = 'page.png';
  await page.screenshot({ path: screenshotPath, fullPage: false });

  const response = await askGPTVisualClick(screenshotPath, 'Type in "headphones" in search box');
  await executeAction(page, response);

  const response2 = await askGPTVisualClick(screenshotPath, 'Click the Search button');
  await executeAction(page, response2);

  await page.waitForLoadState('load');
  await page.screenshot({ path: screenshotPath, fullPage: false });

  const response3 = await askGPTVisualClick(screenshotPath, 'Click the first product');
  await executeAction(page, response3);

  await page.waitForTimeout(9000);
  await browser.close();
})();

async function executeAction(page, action) {
  await showDot(page, action.target.x, action.target.y);

  if (action.action === 'click') {
    await page.mouse.click(action.target.x, action.target.y);
  } else if (action.action === 'type') {
    await page.mouse.click(action.target.x, action.target.y);
    await page.keyboard.type(action.text);
  }
}

async function showDot(page, x, y) {
  return page.evaluate(({ x, y }) => {
    const dot = document.createElement('div');
    dot.style.position = 'absolute';
    dot.style.top = `${y}px`;
    dot.style.left = `${x}px`;
    dot.style.width = '10px';
    dot.style.height = '10px';
    dot.style.background = 'red';
    dot.style.borderRadius = '50%';
    dot.style.zIndex = '9999';
    document.body.appendChild(dot);
  }, { x, y });
}
