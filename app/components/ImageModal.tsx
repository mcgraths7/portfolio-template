import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { PortableTextBlock } from "next-sanity";

import Modal from "@/app/components/layout/Modal"
import type { Image as ProjectImage } from "@/types/sanity/image"

interface ImageModalProps {
  image: ProjectImage
  content: PortableTextBlock[]
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({ image, content, isOpen, onClose }: ImageModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full max-w-screen-lg mx-auto">
        <div className="relative aspect-w-16 aspect-h-9 w-full flex-grow" style={{ flexBasis: "75%" }}>
          <Image
            src={image.url}
            alt={image.alt}
            fill={true}
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, 50vw"
          />
        </div>
        <div className="mt-4 flex-grow overflow-auto" style={{ flexBasis: "25%" }}>
          <PortableText value={content} />
        </div>
      </div>
    </Modal>
  )
}
