import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeDetailedImageSkeleton } from "./TypeDetailedImage";
import type { TypeProjectSkeleton } from "./TypeProject";

export interface TypePageFields {
    name?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    pageTitle?: EntryFieldTypes.Symbol;
    emphasizedTitle?: EntryFieldTypes.Symbol;
    richTextContent?: EntryFieldTypes.RichText;
    projects?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectSkeleton>>;
    heroImage?: EntryFieldTypes.EntryLink<TypeDetailedImageSkeleton>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;
