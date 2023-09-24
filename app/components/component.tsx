import { useContext} from "react";
import { ComponentData } from "../types/component";
import { E, ComponentDispatchCtx, RiskDispatchCtx } from "../contexts";
import { RiskData } from "../types/risk";
import { ControlData } from "../types/control";
import { AnnexData } from "../types/annex";
import Risk from "./risk";
import { v4 } from "uuid";
import { plus } from "./buttons";


interface ComponentProps {
  data: ComponentData,
  risks: RiskData[],
  controls: ControlData[],
  annexes: AnnexData[]
}

export default function Component({data, risks, controls, annexes}: ComponentProps) {
  const disp = useContext(ComponentDispatchCtx) as E<ComponentData>; 
  const dispRisk = useContext(RiskDispatchCtx) as E<RiskData>;
  return (
    <div className="p-4">
      <input value={data.name} onChange={e=>{disp({
        type: 'change',
        data: {...data, name: e.target.value}
      })}}/>

      <div className="flex flex-col gap-4 m-4">
        {
          risks.filter(e=>e.parent===data.key).map(e=>(
          <Risk key={e.key} data={e} controls={controls} annexes={annexes}/>
          ))
        }
      </div>
      <button className="bg-green-300" onClick={_=>{
        dispRisk({
          type: 'add',
          data: {key: v4(), parent: data.key, name: '', rating: ''}
        })
      }}>
        {plus} risk
      </button>
    </div>
  )
}
