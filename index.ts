import { TextGenerator } from "./generator.ts";
const generator = new TextGenerator();

// Addestra il modello sulla Divina Commedia
generator.train(await Deno.readTextFile("./texts/commedia.txt"));

// for await(const f of Deno.readDir('./texts')) {
//     if(!f.isFile) continue;
//     predictor.train(await Deno.readTextFile(`./texts/${f.name}`));
// }

import { bot } from "./telegram.ts";

// Legge il contesto di un messaggio telegram ricevuto
bot.on("message", (ctx: { message: { text: string; }; reply: (arg0: string) => void; }) => {
    const words = ctx.message.text.toLowerCase().split(" ");
    const sentence = generator.genSentence(words[words.length-2] || "e", words[words.length-1]);
    ctx.reply(sentence);
});

bot.start();