export interface IImage {
  id: string;
  url: string | null;
  tags: string;
  webformatURL: string;
  largeImageURL: string;
}

export type FetchType = { hits: IImage[]; totalHits: number; total: number };
