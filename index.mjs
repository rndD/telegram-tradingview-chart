import dotenv from 'dotenv';

import {Telegraf} from 'telegraf';
import { captureScreenshot } from './get-screenshot.mjs';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.on('text', async (ctx) => {
    // // Explicit usage
    // ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)
  
    // // Using context shortcut
    // ctx.reply(`Hello ${ctx.state.role}`)
    if (ctx.message.text.startsWith('/')) {
        const ticker = ctx.message.text.slice(1);
        if (!ticker) {
          console.debug(`No ticker found`, ctx.message.text);
          return;
        }
        const buf = await captureScreenshot(ticker);
        ctx.replyWithPhoto({source: buf});
    }
  })
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));