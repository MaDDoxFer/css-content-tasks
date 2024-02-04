const { test, expect } = require("@playwright/test");

const settings = {
  screenshot: {
    type: "jpeg",
    quality: 70,
    fullPage: true,
  },
  viewport: {
    width: 1280,
    height: 1600,
  },
};

let page;

test.beforeAll(async ({ browser }, testInfo) => {
  testInfo.snapshotPath = (name) => `${testInfo.file}-snapshots/${name}`;
  page = await browser.newPage();
  await page.goto("/4-columns.html");
  await page.setViewportSize(settings.viewport);
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Chess World Championship", () => {
  test("Layout should be equal to template", async () => {
    const template = await page.locator("body").screenshot(settings.screenshot);

    expect(template).toMatchSnapshot();
  });
});