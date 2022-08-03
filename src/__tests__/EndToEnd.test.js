import puppeteer from "puppeteer";

describe("show/hide event details", () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(60000);
    browser = await puppeteer.launch();

    page = await browser.newPage();
    await page.goto("http://localhost:3000/meet");
    await page.waitForSelector(".event-visible");
  });

  afterAll(() => {
    browser.close();
  });

