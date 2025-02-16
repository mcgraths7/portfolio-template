import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import type { TypeDetailedImageSkeleton } from "./TypeDetailedImage";
import type { TypeLinkSkeleton } from "./TypeLink";

export interface TypeNavigationFields {
    name?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    richTextContent?: EntryFieldTypes.RichText;
    logo?: EntryFieldTypes.EntryLink<TypeDetailedImageSkeleton>;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation = Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", "en-US">;
