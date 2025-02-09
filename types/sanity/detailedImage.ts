import {Image} from '@/types/sanity'
import { PortableTextBlock } from 'next-sanity';

export interface DetailedImage {
    _key: string;
    name: string,
    title: string,
    altText: string;
    url: string;
    image: Image;
    content: PortableTextBlock[];
}