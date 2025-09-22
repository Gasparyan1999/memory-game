import styles from "./index.module.scss";

export interface ICardProps {
  id: string;
  src: string;
  onClick: VoidFunction;
}
export const Card = ({ id, src, onClick }: ICardProps) => {
  return <article className={styles.cardContainer}></article>;
};
