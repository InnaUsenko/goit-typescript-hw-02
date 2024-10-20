import css from "./Button.module.css";
import { MouseEventHandler, FC } from "react";

interface ButtonProps {
  hendleLoadMore: MouseEventHandler<HTMLButtonElement>;
}
export const Button: FC<ButtonProps> = (props) => {
  return (
    <button className={css.button} onClick={props.hendleLoadMore}>
      Load more..
    </button>
  );
};
