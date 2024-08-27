const { telegraf, Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);
console.log("Bot is running!");
try {
    bot.start((ctx) => ctx.reply("Welcome to Abhi's Bot!"));

    const helpMessage = `Hello! I am Abhi's Bot. DM me to get help!`;
    bot.help((ctx) => ctx.reply(helpMessage));

    bot.on('text', async(ctx) => {
        const name = ctx.message.text.replace(/My name is /i, '');
        const nameFromEnv = process.env.NAME;
        if (nameFromEnv && new RegExp(nameFromEnv, 'i').test(name)) {
            ctx.reply('Hi cutie!');
        } 
        else if (/code/i.test(name)) {
            await axios.get('https://raw.githubusercontent.com/Abhi-187/problem_solver_proo/main/0013-roman-to-integer/0013-roman-to-integer.cpp')
            .then((response) => {
                ctx.reply(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        }
        else {
            ctx.reply(`Hello ${name}!`);
        }
    });


    const todo = ['DSA', 'Complete Backend Course', 'Interview Prep'];
    bot.command('todo', async (ctx) => {
        await ctx.reply('Your todo list:');
        todo.forEach(async (task, i) => {
            await ctx.reply(`${i + 1}. ${task}`);
        });
    });

    bot.on('sticker', (ctx) => {
        ctx.reply('👍');
    });
    bot.launch();
} catch (error) {
    console.error('Error occurred:', error);
}