import type { ICard } from "../../../types";
import styles from "./index.module.scss";

export interface ICardProps extends ICard {
  onClick: VoidFunction;
}

export const Card = ({ backgroundColor, onClick, status }: ICardProps) => {
  const isFlipped = status !== "default";

  return (
    <div className={styles.cardWrapper} onClick={onClick}>
      <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ""}`}>
        <div className={styles.cardFront} />
        <div className={styles.cardBack} style={{ backgroundColor }} />
      </div>
    </div>
  );
};
