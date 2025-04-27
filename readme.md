## APRICOT
Un piccolo esperimento con gli n-grammi. Partendo da due parole fornite dall'utente, l'algoritmo predittivo genera una piccola frase prevedendo la parola successiva che avrebbe usato Dante. Per mia comodità in fase di test input/output vengono mandati attraverso un BOT TELEGRAM che non è presente nella repository (ovviamente).

### Telegram.ts
Anche se la logica del BOT TELEGRAM è rimasta intatta ed è facile provare lo script con la console di Deno, qui sotto lascio le misteriose linee di codice del file mancante:
```ts
import { Bot } from "https://deno.land/x/grammy@v1.36.0/mod.ts";
export const bot = new Bot("YOUR-TELEGRAM-API-KEY");
```
