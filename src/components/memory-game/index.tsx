import { useMemoryGame } from "../../hooks";
import { Card } from "./card";
import styles from "./index.module.scss";

export const MemoryGame = () => {
  const { gameState, resetGame, cardClick } = useMemoryGame();

  return (
    <main className={styles.container}>
      <button onClick={resetGame}>Reset</button>
      <article className={styles.board}>
        {gameState.cards.map((card) => {
          return (
            <Card key={card.id} {...card} onClick={() => cardClick(card.id)} />
          );
        })}
      </article>
    </main>
  );
};
