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
    tags: "no image",
    webformatURL: "",
    largeImageURL: "",
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
    setPict({
      id: "0",
      url: null,
      tags: "no image",
      webformatURL: "",
      largeImageURL: "",
    });
    setError(null);
  };

  const hendleLoadMore = (): void => {
    setPage(page + 1);
  };

  const showModal = (id: number): void => {
    let localPict: IImage = {
      id: "0",
      url: null,
      tags: "no image",
      webformatURL: "",
      largeImageURL: "",
    };
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
    if (searchQuery && searchQuery.length > 0) {
      setIsLoading(true);
      let hits: IImage[] = [
        {
          id: "2942477",
          url: null,
          tags: "forest, trail, sunbeams",
          webformatURL:
            "https://pixabay.com/get/g89fbc14d76cfde127ddd6275147a89ae1436a18405c818b6e2e0c841f1fe99533c0e8419e2664a943b401a96ebacb5b22e5eb2d5221c18f241aadc014aea0bbb_640.jpg",
          largeImageURL:
            "https://pixabay.com/get/g4c85be9a4b7fa0dc4a4b5e031c3387498dca54a504142c752b2cde5c45681a7ed672c11f182b766b08ef17ca3e7655b18f1dbf8adf2fc6fc292a7a979e2ceb31_1280.jpg",
        },
        {
          id: "2942478",
          url: null,
          tags: "forest, trail, sunbeams",
          webformatURL:
            "https://pixabay.com/get/g89fbc14d76cfde127ddd6275147a89ae1436a18405c818b6e2e0c841f1fe99533c0e8419e2664a943b401a96ebacb5b22e5eb2d5221c18f241aadc014aea0bbb_640.jpg",
          largeImageURL:
            "https://pixabay.com/get/g4c85be9a4b7fa0dc4a4b5e031c3387498dca54a504142c752b2cde5c45681a7ed672c11f182b766b08ef17ca3e7655b18f1dbf8adf2fc6fc292a7a979e2ceb31_1280.jpg",
        },
      ];

      let localIsLoadMore = true;
      setImages((prevState) => [...prevState, ...hits]);
      setIsLoadMore(localIsLoadMore);

      setIsLoading(false);
    }
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
