import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeDetailedImageSkeleton } from "./TypeDetailedImage";
import type { TypeLinkSkeleton } from "./TypeLink";

export interface TypeNavigationFields {
    name?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    richTextContent?: EntryFieldTypes.RichText;
    logo?: EntryFieldTypes.EntryLink<TypeDetailedImageSkeleton>;
    linksCollection?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;
