import { useContext, useState } from "react";
import { ControlDispatchCtx, E, RiskDispatchCtx } from "../contexts";
import { AnnexData } from "../types/annex";
import { ControlData, ControlImplemented } from "../types/control";
import { RiskData } from "../types/risk";
import Control from "./control";
import { v4 } from "uuid";
import { plus, minus, trash } from "./buttons";

interface RiskProps {
  data: RiskData,
  controls: ControlData[],
  annexes: AnnexData[]
}
const defaultButtonClasses = "flex items-center align-middle shadow border border-gray-600 rounded w-6 h-6 justify-center";
export default function Risk({data, controls, annexes}: RiskProps) {
  const [minim, setMinim] = useState(true);
  const disp = useContext(RiskDispatchCtx) as E<RiskData>;
  const controlDisp = useContext(ControlDispatchCtx) as E<ControlData>;
  const filteredControls = controls.filter(e=>e.parent===data.key)
  if(minim) {
    return (
      <div style={{background: "hsl(200,20%,80%)"}} className="flex flex-row gap-4 p-2 border-2 border-gray-500 py-2 w-full items-center align-middle bg-zinc-200 font-medium">
        <button className={`bg-green-300 hover:bg-green-200 ${defaultButtonClasses}`} onClick={_=>setMinim(false)}>{plus}</button>
        <div>{data.name}</div><div>({filteredControls.length} controls)</div>
      </div>
    )
  }
  return (
    <div style={{background: "hsl(200,20%,80%)"}} className="flex flex-col w-full pr-4 border-2 border-black align-middle justify-start space-x-8 py-4 items-center">
      <div className="flex flex-row p-2 space-x-8 w-full">
        <div className="w-1/6 p-2 flex flex-row gap-4">
      <button className={`bg-yellow-300 hover:bg-yellow-200 ${defaultButtonClasses}`} onClick={_=>setMinim(true)}>{minus}</button>
      <button className={`bg-red-300 hover:bg-red-200 ${defaultButtonClasses}`} onClick={_=>{
        const reallyDel = confirm("delete risk?");
          if(!reallyDel) return;
        disp({
          type: 'remove',
          data: data
        })
      }}>{trash}</button>
        </div>
        <div>
          risk:
        </div>
      <textarea className="w-full h-full" value={data.name} placeholder="risk" onChange={e=>{disp({
        type: 'change',
        data: {...data, name: e.target.value}
      })}}/>
      </div>
      <input hidden={true} value={data.rating} placeholder="rating"/>
      <div className="w-full">
        {filteredControls.map(e=>(
          <Control key={e.key} data={e} annexes={annexes}/>
        ))}
      </div>
      <button className="bg-green-300 " onClick={_=>{
        controlDisp({
          type:'add',
          data: {parent: data.key, key: v4(), name: '', implemented: ControlImplemented.na}
        })
      }}>{plus} control</button>
    </div>
  )
}
