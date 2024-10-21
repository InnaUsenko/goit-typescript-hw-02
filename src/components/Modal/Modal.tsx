import { FC, useEffect } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  src: string;
  alt: string;
  closeModal: () => void;
}
export const Modal: FC<ModalProps> = (props) => {
  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.closeModal();
      }
    };
    //componentDidMount()
    document.addEventListener("keydown", escFunction, false);
    console.log("addEventListener");
    return () => {
      //componentWillUnmount()
      document.removeEventListener("keydown", escFunction, false);
      console.log("removeEventListener");
    };
  }, [props]);

  return (
    <div
      className={css.overlay}
      onClick={() => {
        props.closeModal();
      }}
    >
      <div className={css.modal}>
        <img src={props.src} alt={props.alt} />
      </div>
    </div>
  );
};
