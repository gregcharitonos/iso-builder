import { useContext, useState } from "react";
import { E, ControlDispatchCtx, AnnexDispatchCtx } from "../contexts";
import { AnnexData } from "../types/annex";
import { ControlData, ControlImplemented } from "../types/control";
import Annex from "./annex";
import annexes from "../annexes.json";
import { v4 } from "uuid";
import { plus, minus, trash } from "./buttons";

export function AnnexList({parent}: {parent: string}) {
  const [val, setVal] = useState('');
  const [selected, setSelected] = useState<Pick<AnnexData,'ID'|'description'>|null>();
  const annexDisp = useContext(AnnexDispatchCtx) as E<AnnexData>
  const re = new RegExp(val,'i');
  const filteredAnnexes = annexes.filter(e=>re.test(e.description));
  return (
    <div className="relative">
      <input onClick={_=>setSelected(null)} placeholder="annex" value={val} onChange={e=>{
        try{
          new RegExp(e.target.value)
          setVal(e.target.value)
        } catch(e: unknown){
          return
        }
      }}/>
      <div className="max-h-20 overflow-auto z-50 bg-gray-100" hidden={val.length === 0}>
        {
          filteredAnnexes.map(e=>(
            <div onClick={()=>{
              annexDisp({
              type: 'add',
              data: {ID: e.ID, description: e.description, key: v4(), parent: parent}
              });
            }}>
              {e.ID} {e.description}
            </div>
          ))
        }
      </div>
      <button hidden={!selected} onClick={_=>{
        if(!selected) return;
      }}>{plus}</button>
    </div>
  )
}

interface ControlProps {
  data: ControlData,
  annexes: AnnexData[]
}
export default function Control({data, annexes}: ControlProps) {
  const disp = useContext(ControlDispatchCtx) as E<ControlData>
  return (
    <div className="m-4 bg-gray-200 shadow even:bg-gray-300 flex flex-col gap-4 border-gray-500 border p-4">
      <div className="flex flex-row gap-4 ">
      <button className="bg-red-200 border-red-900 shadow" onClick={_=>{
        if(!confirm('delete control?')){return}
        disp({
          type: 'remove',
          data: data
        })
      }}>{trash}</button>
        <div>
          control
        </div>
      <textarea className="w-full" value={data.name} placeholder="control" onChange={e=>{
        disp({
          type: 'change',
          data: {...data,name: e.target.value}
        })
      }}/>
      </div>
      <select defaultValue={ControlImplemented.na} value={data.implemented} onChange={e=>{
        disp({
          type: 'change',
          data: {...data, implemented: e.target.value}
        })
      }}>
        {Object.values(ControlImplemented).map(e=><option value={e}>{e}</option>)}
      </select>
      <div className="flex flex-row gap-4">
        {
          annexes.filter(a=>a.parent===data.key).map(a=>(
          <Annex key={a.key} data={a}/>
        ))}
      </div>
      <button hidden className="w-32 bg-green-100 border-green-300 border-2 shadow-gray-800 hover:shadow-md shadow-sm p-2 rounded-md" >add annex</button>
      <AnnexList parent={data.key} />
    </div>
  )
}

