import GenericChild from "./GenericChild";


export const RiskKeys: ReadonlyArray<string> = [
  "key",
  "name",
  "rating",
  // "controls"
]
export interface RiskAction {
  type: 'add' | 'remove' | 'change',
  data: RiskData | {key: string}
}

export interface RiskData extends GenericChild {
  name: string;
  rating: string;
  // controls: ControlData[];
}
// export interface RiskInterface extends RiskData {
//   remove(key: number): void;
//   addControl(key: number, control: ControlInterface): void;
//   removeControl(key: number, controlKey: number): void;
//   changeControl(
//     key: number,
//     controlKey: number,
//     newControl: ControlInterface,
//   ): void;
// }
