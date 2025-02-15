import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLinkFields {
    name: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    displayText?: EntryFieldTypes.Symbol;
    icon?: EntryFieldTypes.Object;
    socialUrl?: EntryFieldTypes.Symbol;
}

export type TypeLinkSkeleton = EntrySkeletonType<TypeLinkFields, "link">;
export type TypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLinkSkeleton, Modifiers, Locales>;
