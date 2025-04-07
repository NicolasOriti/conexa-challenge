import { CreateMovieInput } from './create-movie-input';

export class Movie {
  constructor(
    public id: string | undefined,
    public title: string,
    public director: string,
    public producer: string,
    public releaseDate: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.title = title;
    this.director = director;
    this.producer = producer;
    this.releaseDate = releaseDate;
  }

  public static create({
    title,
    director,
    producer,
    releaseDate,
  }: CreateMovieInput): Movie {
    const id = crypto.randomUUID();
    return new Movie(id, title, director, producer, releaseDate);
  }

  public static createExisting({
    id,
    title,
    director,
    producer,
    releaseDate,
    createdAt,
    updatedAt,
  }: CreateMovieInput): Movie {
    return new Movie(
      id,
      title,
      director,
      producer,
      releaseDate,
      createdAt,
      updatedAt,
    );
  }
}
