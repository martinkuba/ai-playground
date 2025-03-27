import { test } from "./fixture.js";

test("search headphone on ebay", async ({ page, ai, aiQuery, aiAssert }) => {
  page.setViewportSize({ width: 1280, height: 768 });
  await page.goto("https://www.ebay.com");
  await page.waitForLoadState("load");

  await ai('type "Headphones" in search box, hit Enter');
  await ai('click the first item in the search results');
  await ai('click the "Add to cart" button');
  await ai('click the "Cart" button');

  await page.waitForTimeout(5000);
});
