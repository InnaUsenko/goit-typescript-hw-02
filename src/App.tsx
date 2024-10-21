import "./App.css";
import { IImage, FetchType } from "./types/types";
import { useState, useEffect } from "react";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "./components/Button/Button";
import { Loader } from "./components/Loader/Loader";
import { Modal } from "./components/Modal/Modal";
import { fetchImages } from "./services/api";

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

  const showModal = (id: string): void => {
    let localPict: IImage = {
      id: "0",
      url: null,
      tags: "no image",
      webformatURL: "",
      largeImageURL: "",
    };
    for (const img of images) {
      if (img.id.toString() === id) {
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

      fetchImages<FetchType>(searchQuery, perPage, page)
        .then((el) => {
          if (!el) {
            throw new Error("No data received from API");
          }
          let localIsLoadMore = true;
          if (el.totalHits <= page * perPage) {
            localIsLoadMore = false;
            window.alert(
              "We're sorry, but you've reached the end of search results."
            );
          }

          setImages((prevState) => [...prevState, ...el.hits]);
          setIsLoadMore(localIsLoadMore);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
