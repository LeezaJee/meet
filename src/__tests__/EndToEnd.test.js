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

  // SCENARIO 1
  // END TO END TEST
  test("an event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event-visible .event-details");
    expect(eventDetails).toBeNull();
  });

  // SCENARIO 2
  // END TO END TEST
  test("User can expand an event to see its details", async () => {
    await page.click(".event-visible .btn-details");
    const eventDetails = await page.$(".event-visible .event-details");
    expect(eventDetails).toBeDefined();
  });

