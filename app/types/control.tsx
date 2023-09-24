import GenericChild from "./GenericChild"

export enum ControlImplemented {
  na = "N/A",
  ni = "Not Implemented",
  design = "Design",
  build = "Design + Build",
  partialD = "Partially (Design)",
  partialB = "Partially (Build)",
  notConf = "Implemented in Build, must be configured by client"
}


export const ControlKeys: (keyof ControlData)[] = [
  "key",
  "name",
  "implemented",
]

export interface ControlData extends GenericChild {
  name: string,
  implemented:string 
}

export interface ControlAction {
  type: 'add' | 'remove' | 'change',
  data: ControlData | {key: string}
}
