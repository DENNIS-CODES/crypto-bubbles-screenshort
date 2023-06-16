import puppeteer from 'puppeteer';
import cron from 'node-cron';
import { sendMessage, sendPhotoToWhitelistedUsers } from '../telegram';

export const CoinMarketTask = cron.schedule('*/5 * * * *', async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    await page.goto('https://coinmarketcap.com/gainers-losers/', { waitUntil: 'networkidle0' });

    // Wait for a bit for the settings to take effect
    await new Promise(r => setTimeout(r, 3000));

    // Click on the div to switch to dark mode
    const darkModeToggle = 'button.sc-476bb07-0.sc-8aef48ae-6.bBHpMZ.cmc-theme-picker.cmc-theme-picker--night';
    await page.click(darkModeToggle);

    // Wait for a bit for the dark mode to take effect
    await new Promise(r => setTimeout(r, 3000));

    // Select the specific element to screenshot
    const element = await page.$('.uikit-col-md-8 uikit-col-sm-16');

    if (element) {
        // Take a screenshot of the selected element
        const screenshot = await element.screenshot();
        await browser.close();
        sendMessage('CoinMarketCap');
        await sendPhotoToWhitelistedUsers(screenshot);
    }
});