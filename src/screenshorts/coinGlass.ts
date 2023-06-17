import puppeteer from 'puppeteer';
import cron from 'node-cron';
import { sendMessage, sendPhotoToWhitelistedUsers } from '../telegram';

export const task = cron.schedule('*/15 * * * *', async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    await page.goto('https://www.coinglass.com/', { waitUntil: 'networkidle0' });

    // Wait for a bit for the settings to take effect
    await new Promise(r => setTimeout(r, 3000));

    // Click on the div to switch to dark mode
    const darkModeToggle = '.shou.MuiBox-root.cg-style-14d0z92';
    await page.click(darkModeToggle);

    // Wait for a bit for the dark mode to take effect
    await new Promise(r => setTimeout(r, 3000));

    // Select the specific element to screenshot
    const element1 = await page.$('.mbh.MuiBox-root.cg-style-1mh511h');
    const element2 = await page.$('.ant-table-wrapper');

    sendMessage('CoinGlass');
    if (element1) {
        // Take a screenshot of the selected element
        const screenshot1 = await element1.screenshot();
        await sendPhotoToWhitelistedUsers(screenshot1);
    }

    if (element2) {
        // Take a screenshot of the second element
        const screenshot2 = await element2.screenshot();
        await sendPhotoToWhitelistedUsers(screenshot2);
    }
    await browser.close();
}); 
