import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeDetailedImageFields {
    name?: EntryFieldTypes.Symbol;
    altText: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
}

export type TypeDetailedImageSkeleton = EntrySkeletonType<TypeDetailedImageFields, "detailedImage">;
export type TypeDetailedImage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeDetailedImageSkeleton, Modifiers, Locales>;
