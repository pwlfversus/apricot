export class TextGenerator {
    model: Record<string, Record<string, number>>;
    usedWords: Set<string>;

    constructor() {
        this.model = {};
        this.usedWords = new Set();
    }

    // Funzione di addestramento con trigrammi
    train(text: string) {
        const words = text.
        toLowerCase()
        .split(" ")
        .map(word => word.replace(/[.!?]/, ''));

        for (let i = 0; i < words.length - 2; i++) {
            const firstWord = words[i];
            const secondWord = words[i + 1];
            const thirdWord = words[i + 2];

            if (secondWord === "") continue;
            if (thirdWord === "") continue;

            if (!this.model[firstWord]) {
                this.model[firstWord] = {};
            }

            if (!this.model[firstWord][secondWord]) {
                this.model[firstWord][secondWord] = {};
            }

            if (!this.model[firstWord][secondWord][thirdWord]) {
                this.model[firstWord][secondWord][thirdWord] = 0;
            }

            this.model[firstWord][secondWord][thirdWord]++;
        }
    }

    // Generare la parola successiva
    getNextWord(firstWord: string, secondWord: string): string {
        const nextWords = this.model[firstWord]?.[secondWord];
        if(!nextWords) {
            // Non ci sono parole seguenti
            const keys = Object.keys(this.model);
            return keys[Math.floor(Math.random() * keys.length)];
        }

        // Prendiamo le parole che possono seguire
        const words = Object.keys(nextWords);
        const probabilities = Object.values(nextWords);
        const total = probabilities.reduce((acc, count) => acc + count, 0);

        // Penalizzazione delle parole usate recentemente
        const filteredWords = words.filter(word => !this.usedWords.has(word));
        const filteredProbabilities = filteredWords.map(word => nextWords[word]);
        const filteredTotal = filteredProbabilities.reduce((acc, count) => acc + count, 0);

        // Selezione probabilistica della parola successiva
        const rand = Math.random() * filteredTotal;
        let cumulativeProbability = 0;

        for (let i = 0; i < filteredWords.length; i++) {
            cumulativeProbability += filteredProbabilities[i];
            if (rand < cumulativeProbability) {
                this.usedWords.add(filteredWords[i]);
                if (this.usedWords.size > 10) {
                    // Teniamo in memoria solo le dieci parole più recenti
                    this.usedWords.clear();
                }
                return filteredWords[i];
            }
        }

        // Prediamo una parola casuale tra quelle originali
        const randOriginal = Math.random() * total;
        cumulativeProbability = 0;
        for (let i = 0; i < words.length; i++) {
            cumulativeProbability += probabilities[i];
            if (randOriginal < cumulativeProbability) {
                return words[i];
            }
        }

        return words[0];
    }

    // Generare una frase completa
    genSentence(startWord: string, secondWord: string, maxLength: number = 50): string {
        const punctuationMarks = ['.', '!', '?'];
        let currentWord1 = startWord.toLowerCase();
        let currentWord2 = secondWord.toLowerCase();
        let sentence = [currentWord1, currentWord2];

        while (sentence.length < maxLength) {
            const nextWord = this.getNextWord(currentWord1, currentWord2);

            if (nextWord === "") break;

            if (punctuationMarks.includes(nextWord.trim())) {
                sentence.push(nextWord);
                break;
            }
            if (nextWord.trim() !== "") {
                sentence.push(nextWord);
                currentWord1 = currentWord2;
                currentWord2 = nextWord;
            }
        }

        return sentence.join(" ")
    }
}