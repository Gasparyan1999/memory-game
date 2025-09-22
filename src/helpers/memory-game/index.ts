import { v4 as uuidv4 } from "uuid";
import type { ICard } from "../../types";

export const memoryGameApi = {
  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  generateUniqueColor(excludedColors: string[]) {
    let newColor = this.getRandomColor();
    while (excludedColors.includes(newColor)) {
      newColor = this.getRandomColor();
    }
    return newColor;
  },

  shuffleCards(cards: ICard[]): ICard[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  generateCards(count: number = 16): ICard[] {
    const existColors: string[] = [];

    const cards: ICard[] = Array.from({ length: count / 2 })
      .map(() => {
        const backgroundColor = this.generateUniqueColor(existColors);
        existColors.push(backgroundColor);

        const firstId = uuidv4();
        const secondId = uuidv4();

        return [
          {
            id: firstId,
            refId: secondId,
            backgroundColor,
            status: "default" as const,
          },
          {
            id: secondId,
            refId: firstId,
            backgroundColor,
            status: "default" as const,
          },
        ];
      })
      .flat();

    return this.shuffleCards(cards);
  },
};
