
export interface ComponentData {
  key: string,
  name: string,
}

export interface ComponentAction {
  type: 'add' | 'remove' | 'change',
  data: ComponentData | {key: string}
}

export const ComponentKeys: ReadonlyArray<string> = [
  "key",
  "name",
  "rating",
]

