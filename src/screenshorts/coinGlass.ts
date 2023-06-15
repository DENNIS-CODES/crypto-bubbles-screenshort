import puppeteer from 'puppeteer';
import cron from 'node-cron';
import { sendPhotoToWhitelistedUsers } from '../telegram';

// Set up the task
export const task = cron.schedule('*/5 * * * *', async () => {
    // Start the browser and create a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const watchDog = page.waitForFunction('window.innerWidth > 1300');
    await page.setViewport({ width: 1920, height: 1080 });
    await watchDog
    // Navigate to the website
    await page.goto('https://www.coinglass.com/', { waitUntil: 'networkidle0' });

    // Select the specific element to screenshot
    const element = await page.$('.mbh.MuiBox-root.cg-style-1mh511h');
     // Wait for a bit for the settings to take effect
     await new Promise(r => setTimeout(r, 3000));
    if (element) {
        // Step 4: Take a screenshot
        const screenshot: any = await page.screenshot({ fullPage: false });
        // Step 5: Close the browser
        await browser.close();
        // Step 6: Send the screenshot to the Telegram chat
        await sendPhotoToWhitelistedUsers(screenshot);
    }
});
