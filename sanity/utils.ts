import imageUrlBuilder from "@sanity/image-url";
import client from "@/sanity/lib/client";
import { Image } from "@/types/sanity";

const builder = imageUrlBuilder(client);

const urlFor = (source: Image) => {
  return builder.image(source.asset);
};

export { urlFor };
