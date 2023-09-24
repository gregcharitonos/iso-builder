import GenericChild from "./GenericChild";

export interface AnnexData extends GenericChild {
  ID: string,
  description: string
}

type AnnexDataKey = keyof AnnexData;

export const AnnexKeys: AnnexDataKey[] = [
  "key",
  "ID",
  "description"
]

export interface AnnexAction {
  type: 'add' | 'remove' | 'change',
  data: AnnexData | {key: string}
}
