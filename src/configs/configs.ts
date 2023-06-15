import 'dotenv/config'

export const configs = {
    BOT_TOKEN: process.env.BOT_TOKEN || "",
    WHITELISTED_USERS: [1195869296],
    TELEGRAM_DELETE_MESSAGE_INTERVAL: 10000,
}