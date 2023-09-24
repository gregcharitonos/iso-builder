import { ComponentData } from "../types/component";
import { RiskData } from "../types/risk";
import { ControlData } from "../types/control";
import { AnnexData } from "../types/annex";


export default interface ComponentProps {
  components: ComponentData[]
  risks: RiskData[],
  controls: ControlData[],
  annexes: AnnexData[]
}
