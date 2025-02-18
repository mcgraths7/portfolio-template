"use client";

import Image from "next/image";

import Modal from "../layout/Modal";
import { DetailedImage } from "../../types/contentful";

interface ImageModalProps {
  image: DetailedImage;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({
  image,
  isOpen,
  onClose,
}: ImageModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full max-w-screen-xl mx-auto">
        <div
          className="relative aspect-w-16 aspect-h-9 w-full flex-grow"
          style={{ flexBasis: "85%" }}
        >
          <Image
            src={image.image.url}
            alt={image.altText}
            fill={true}
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, 50vw"
          />
        </div>
        <div
          className="mt-4 flex-grow overflow-auto"
          style={{ flexBasis: "15%" }}
        >
          {/* <PortableText value={image.content} /> */}
        </div>
      </div>
    </Modal>
  );
}
