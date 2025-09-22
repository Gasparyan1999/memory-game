export type CardStatusT = "default" | "pending" | "passed" | "displaying";
export type GameSessionT = "finished" | "in_play";

export interface ICard {
  id: string;
  refId: string;
  backgroundColor: string;
  status: CardStatusT;
}

export interface IMemoryGameState {
  cards: ICard[];
  gameSession: GameSessionT;
}
