import { useCallback, useState } from "react";
import type { ICard, IMemoryGameState } from "../../types";
import { memoryGameApi } from "../../helpers";

const INITIAL_GAME_STATE: IMemoryGameState = {
  cards: memoryGameApi.generateCards(),
  gameSession: "in_play",
};

export const useMemoryGame = () => {
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
  const [gameState, setGameState] =
    useState<IMemoryGameState>(INITIAL_GAME_STATE);

  const cardClick = useCallback(
    (id: string) => {
      if (gameState.gameSession === "finished") return;

      const clickedCard = gameState.cards.find((c) => c.id === id);
      if (!clickedCard || clickedCard.status !== "default") return;

      const handleMatch = () => {
        setGameState((prev) => ({
          ...prev,
          cards: prev.cards.map((card) =>
            card.id === id || card.refId === id
              ? { ...card, status: "passed" }
              : card
          ),
        }));
        setActiveCard(null);
      };

      const handleMismatch = () => {
        setGameState((prev) => ({
          ...prev,
          cards: prev.cards.map((card) =>
            card.id === id || card.id === activeCard?.id
              ? { ...card, status: "displaying" }
              : card
          ),
        }));
        setActiveCard(null);
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            cards: prev.cards.map((card) =>
              card.id === id || card.id === activeCard?.id
                ? { ...card, status: "default" }
                : card
            ),
          }));
        }, 600);
      };

      const handleFirstClick = () => {
        setGameState((prev) => ({
          ...prev,
          cards: prev.cards.map((card) =>
            card.id === id ? { ...card, status: "pending" } : card
          ),
        }));
        setActiveCard(clickedCard);
      };

      if (activeCard) {
        if (activeCard.refId === id) {
          handleMatch();
        } else {
          handleMismatch();
        }
      } else {
        handleFirstClick();
      }
    },
    [activeCard, gameState.cards, gameState.gameSession]
  );

  const resetGame = useCallback(() => {
    setActiveCard(null);
    setGameState({
      cards: memoryGameApi.generateCards(),
      gameSession: "in_play",
    });
  }, []);

  return {
    cardClick,
    resetGame,
    gameState,
  };
};
