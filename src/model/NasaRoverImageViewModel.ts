import { ImageViewModel } from "../model/ImageViewModel";
import { NasaRoverImage } from "../model/NasaRoverImage";

export class NasaRoverImageViewModel implements ImageViewModel {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  liked = false;

  constructor({
    id,
    sol,
    earth_date: earthDate,
    img_src: imageSrc,
    camera: { id: cameraId, full_name: cameraName },
    rover: { id: roverId, name: roverName, status },
  }: NasaRoverImage) {
    this.id = id;
    this.imageSrc = imageSrc;
    this.imageAlt = `Rover image #${id}`;
    this.title = roverName;
    this.subtitle = cameraName;
    this.date = `${earthDate} / sol ${sol}`;
  }
}
