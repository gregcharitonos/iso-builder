import { useContext, useEffect, useRef } from "react";
import { E, AnnexDispatchCtx } from "../contexts";
import { AnnexData } from "../types/annex";
import { trash } from "./buttons";

interface AnnexProps {
  data: AnnexData
}

const colors = {
  '5': 'hsl(210,50%,80%)',
  '6': 'hsl(80,50%,80%)',
  '7': 'hsl(0,50%,80%)',
  '8': 'hsl(320,50%,80%)'
}
type colorType = '5'|'6'|'7'|'8'

export default function Annex({data}: AnnexProps) {
  const disp = useContext(AnnexDispatchCtx) as E<AnnexData>
  const colIndex = data.ID.split('.')[0].trim() as colorType;
  let col = colors[colIndex];
  if(col === undefined) {
    col = "red";
  }
  const style = `flex flex-col border shadow rounded-sm border-black p-2`;
  const ref = useRef(null);
  return (
    <div ref={ref} style={{background: col}} className={style}>
      <div className="flex flex-row w-full align-middle justify-between">
      <span>{data.ID}</span>
      <button className="w-6 h-6 text-sm bg-red-300 hover:bg-red-200 p-2" onClick={_=>{
        disp({
          type: 'remove',
          data: data
        })
      }}>{trash}</button>
      </div>
      <span className="text-xs">{data.description}</span>
    </div>
  )
}
