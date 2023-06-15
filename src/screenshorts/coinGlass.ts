import puppeteer from 'puppeteer';
import cron from 'node-cron';

// Set up the task
export const task = cron.schedule('*/5 * * * * *', async () => {
    // Start the browser and create a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the website
    await page.goto('https://www.coinglass.com/', { waitUntil: 'networkidle0' });

    // Select the specific element to screenshot
    const element = await page.$('.mbh.MuiBox-root.cg-style-1mh511h');

    // Screenshot the specific element
    if (element) {
        await element.screenshot({ path: 'screenshot.png' });
    }

    // Close the browser
    await browser.close();
});
