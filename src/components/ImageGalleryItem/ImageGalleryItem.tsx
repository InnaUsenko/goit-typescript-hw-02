import css from "./ImageGalleryItem.module.css";
import { FC } from "react";

interface ImageGalleryItemProps {
  id: string;
  src: string;
  alt: string;
  showModal: Function;
}
export const ImageGalleryItem: FC<ImageGalleryItemProps> = (props) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        id={props.id}
        className={css.imageGalleryItemImage}
        src={props.src}
        alt={props.alt}
        onClick={() => {
          props.showModal(props.id);
        }}
      />
    </li>
  );
};
