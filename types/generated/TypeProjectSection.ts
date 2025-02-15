import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeDetailedImageSkeleton } from "./TypeDetailedImage";

export interface TypeProjectSectionFields {
    name?: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.RichText;
    previewImage?: EntryFieldTypes.AssetLink;
    images?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeDetailedImageSkeleton>>;
    useGrid: EntryFieldTypes.Boolean;
}

export type TypeProjectSectionSkeleton = EntrySkeletonType<TypeProjectSectionFields, "projectSection">;
export type TypeProjectSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProjectSectionSkeleton, Modifiers, Locales>;
