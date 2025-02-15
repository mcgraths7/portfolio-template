import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeDetailedImageSkeleton } from "./TypeDetailedImage";
import type { TypeProjectSectionSkeleton } from "./TypeProjectSection";

export interface TypeProjectFields {
    name?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.RichText;
    sections?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectSectionSkeleton>>;
    heroImage?: EntryFieldTypes.EntryLink<TypeDetailedImageSkeleton>;
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, "project">;
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProjectSkeleton, Modifiers, Locales>;
