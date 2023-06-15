import { task } from './screenshorts';
import { screenshotTask } from './screenshorts/cryptoBubbles';
import { bot, sendMessage } from './telegram/bot';
import cron from 'node-cron';

const main = async () => {
    try {
        console.log('Connecting to Telegram bot...\n---')
        console.log('Telegram Connected🦾🦾')
        sendMessage(
            `Bot started at ${new Date()
                .toString()
                .replaceAll('(', '\\(')
                .replaceAll(')', '\\)')}...`,
        )
    } catch (error) {
        console.log('Error connecting to Telegram😪:', JSON.parse(JSON.stringify(error)))
    }
}
main()

const Start = async () => {
    cron.schedule('*/10 * * * *', screenshotTask).start();
    // task.start();
}
Start()