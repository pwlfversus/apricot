## APRICOT
Un piccolo esperimento con gli n-grammi. Partendo da due parole fornite dall'utente, l'algoritmo genera una piccola frase prevedendo la prossima parola che avrebbe usato Dante. Per mia comodità in debug, input/output vengono inviati attraverso un BOT TELEGRAM che non è presente nella repository (ovviamente).

### Telegram.ts
Anche se la logica del BOT TELEGRAM è rimasta intatta ed è facile provare lo script con la console di Deno, qui sotto lascio le misteriose linee di codice del file mancante:
```ts
import { Bot } from "https://deno.land/x/grammy@v1.36.0/mod.ts";
export const bot = new Bot("YOUR-TELEGRAM-API-KEY");
```
### Nel Futuro
Questo piccolo progetto è stato davvero divertente, probabilmente il più divertente da anni. In futuro penso che vorrei ampliare l'algoritmo per generare frasi che suonino più naturali, e soprattutto che non si perdano via (anche se probabilmente il lessico di Dante è il problema principale qui).
