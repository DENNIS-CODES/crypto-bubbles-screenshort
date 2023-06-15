import puppeteer from "puppeteer";
import { sendPhotoToWhitelistedUsers } from "../telegram/bot";
// Define the screenshot task
export const screenshotTask = async () => {
    // Step 1: Launch Puppeteer and open the page
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    const watchDog = page.waitForFunction('window.innerWidth > 1300');
    await page.setViewport({ width: 1920, height: 1080 });
    await watchDog

    // Step 2: Navigate to the page and wait until it's loaded
    await page.goto('https://cryptobubbles.net/', { waitUntil: 'networkidle2' });

    // Step 3: Modify the page's content to meet the desired settings (Top 200, 1hour bubbles)
    await page.evaluate(() => {
        // Select and click the "200" button
        let top200Option: any = document.querySelector('#top200');
        top200Option?.click();

        // Select and click the "Hour" button
        let tabs = Array.from(document.querySelectorAll(".configuration-tabs .tab"));
        let hourTab: any = tabs.find((tab: any) => tab.textContent.trim() === "Hour");
        hourTab?.click();

        // Click the "Confirm" button
        let confirmButton: any = document.querySelector('#confirmSettingsButton');
        confirmButton?.click();
    });

    // Wait for a bit for the settings to take effect
    await new Promise(r => setTimeout(r, 3000));

    // Step 4: Take a screenshot
    const screenshot: any = await page.screenshot({ fullPage: false });
    // Step 5: Close the browser
    await browser.close();

    // Step 6: Send the screenshot to the Telegram chat
    await sendPhotoToWhitelistedUsers(screenshot);
}