import "./App.css";
import { IImage } from "./types/types";
import { useState, useEffect } from "react";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "./components/Button/Button";
import { Loader } from "./components/Loader/Loader";
import { Modal } from "./components/Modal/Modal";

function App() {
  const [images, setImages] = useState<IImage[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(12);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const [pict, setPict] = useState<IImage>({
    id: "0",
    url: null,
    alt: "no image",
  });
  const [error, setError] = useState(null);

  const handleSearch = (searchQuery: string): void => {
    setImages([]);
    setSearchQuery(searchQuery);
    setPerPage(12);
    setPage(1);
    setIsLoading(false);
    setIsLoadMore(false);
    setIsModalShow(false);
    setPict({ id: "0", url: null, alt: "no image" });
    setError(null);
  };

  const hendleLoadMore = (): void => {
    setPage(page + 1);
  };

  const showModal = (id: number): void => {
    let localPict: IImage = { id: "0", url: null, alt: "no image" };
    for (const img of images) {
      if (img.id.toString() === id.toString()) {
        localPict = img;
        break;
      }
    }
    setIsModalShow(true);
    setPict(localPict);
  };

  const closeModal = (): void => {
    setIsModalShow(false);
  };

  // componentDidUpdate(prevProps, prevState, snapshot)
  useEffect(() => {
    console.log("Updating phase: same when componentDidUpdate runs");
  }, [searchQuery, page, perPage]);

  return (
    <div className="AppWrapper">
      <Searchbar handleSearch={handleSearch} />
      <ImageGallery>
        {images.map((el) => {
          return (
            <ImageGalleryItem
              key={el.id}
              id={el.id}
              src={el.webformatURL}
              alt={el.tags}
              showModal={showModal}
            />
          );
        })}
      </ImageGallery>
      {isLoadMore && <Button hendleLoadMore={hendleLoadMore} />}
      {error != null && <p>{error}</p>}
      {isLoading && <Loader />}
      {isModalShow && (
        <Modal
          src={pict.largeImageURL}
          alt={pict.tags}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
