export interface CreateMovieInput {
  id?: string;
  title: string;
  director: string;
  producer: string;
  releaseDate: string;
  createdAt?: Date;
  updatedAt?: Date;
}
