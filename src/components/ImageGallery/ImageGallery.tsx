import css from "./ImageGallery.module.css";
import { ReactNode, FC } from "react";

interface ImageGalleryProps {
  children: ReactNode;
}
export const ImageGallery: FC<ImageGalleryProps> = (props) => {
  return <ul className={css.imageGallery}>{props.children}</ul>;
};
