import puppeteer from 'puppeteer';
import cron from 'node-cron';
import { sendMessage, sendPhotoToWhitelistedUsers } from '../telegram';


export const CoinMarketTask = cron.schedule('*/50 * * * *', async () => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new', // Corrected launch option
        });
        const page = await browser.newPage();

        await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
        await page.goto('https://coinmarketcap.com/gainers-losers/', { waitUntil: 'networkidle0' });

        // Wait for a bit for the settings to take effect
        await new Promise(r => setTimeout(r, 3000));

        // Click on the div to switch to dark mode
        const darkModeToggle = '.sc-476bb07-0.sc-8aef48ae-6.iFHkOn.cmc-theme-picker.cmc-theme-picker--day';
        await page.click(darkModeToggle);

        // Wait for a bit for the dark mode to take effect
        await new Promise(r => setTimeout(r, 3000));

        // Select the specific element to screenshot
        const element = await page.$('.sc-fbf6f08a-0.fvFzkg.table-wrap');

        if (element) {
            // Take a screenshot of the selected element
            const screenshot = await element.screenshot({ encoding: 'binary' }); // Added screenshot options
            await sendPhotoToWhitelistedUsers(screenshot).then(() => sendMessage('CoinMarketCap')).catch((error) => console.log(error));
        }

        await browser.close();
    } catch (error) {
        console.error(error); // Simple error handling
    }
});