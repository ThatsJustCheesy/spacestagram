import { API_BASE_URL } from "../config";

export async function fetchNasaRoverImagesForEarthDate(
  date: Date
): Promise<NasaRoverImage[]> {
  const url = new URL(API_BASE_URL + "/v1/images");
  url.searchParams.append(
    "earth_date_ymd",
    `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
  );

  console.log(`Fetching from ${url}`);

  const res = await (await fetch(url.toString())).json();
  if (!res.success) throw res.error;

  return res.result as NasaRoverImage[];
}

export type NasaRoverImage = {
  id: number;

  sol: number;
  earth_date: string;

  img_src: string;

  camera: {
    id: number;
    rover_id: number;
    name: NasaRoverCameraAbbreviation;
    full_name: NasaRoverCameraName;
  };
  rover: {
    id: number;
    name: string;
    status: string;
  };
};

export const nasaRoverCameraNames = {
  FHAZ: "Front Hazard Avoidance Camera",
  RHAZ: "Rear Hazard Avoidance Camera",
  MAST: "Mast Camera",
  CHEMCAM: "Chemistry and Camera Complex",
  MAHLI: "Mars Hand Lens Imager",
  MARDI: "Mars Descent Imager",
  NAVCAM: "Navigation Camera",
  PANCAM: "Panoramic Camera",
  MINITES: "Miniature Thermal Emission Spectrometer (Mini-TES)",
};
export type NasaRoverCameraAbbreviation = keyof typeof nasaRoverCameraNames;
export type NasaRoverCameraName =
  typeof nasaRoverCameraNames[NasaRoverCameraAbbreviation];
