export interface IImage {
  id: string;
  url: string | null;
  alt: string | null;
  webformatURL?: string;
  largeImageURL?: string;
  tags?: { title: string }[];
}
