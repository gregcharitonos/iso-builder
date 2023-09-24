"use client";
import { ComponentData } from "../types/component";
import { RiskData } from "../types/risk";
import { ControlData } from "../types/control";
import { AnnexData } from "../types/annex";
import { useRef } from "react";
import { copy } from "./buttons";

interface ComponentProps {
  components: ComponentData[];
  risks: RiskData[];
  controls: ControlData[];
  annexes: AnnexData[];
}

const tdStyle = {border: '2px solid black'};

function MakeControl({control, data}: {control: ControlData, data: ComponentProps}) {
  const annexes = data.annexes.filter((a) => a.parent === control.key).sort((a,b)=>{
    const as = a.ID.split('.').map(Number);
    const bs = b.ID.split('.').map(Number);
    if(as[0] > bs[0]) {
      return 1;
    }
    if(as[0] > bs[0]) {
      return -1;
    }
    if(as[1] < bs[1]) {
      return 1;
    }
    if(as[1] < bs[1]) {
      return -1;
    }
    return 0;
  })
  return (
    <>
      <td style={tdStyle}>{control.name}</td>
      <td style={tdStyle}>{control.implemented.replace(/not implemented/ig,'N/A')}</td>
      <td style={tdStyle}>
        {annexes.map((a) => "A."+a.ID).join(", ")}
      </td>
    </>
  );
}

function MakeRisk({risk, data}: {risk: RiskData, data: ComponentProps}) {
  const controls = data.controls.filter((c) => c.parent === risk.key);
  let firstRow = null;
  if(controls.length){
    const c = controls.shift() as ControlData;
    firstRow = <MakeControl control={c} data={data}/>
  }
  return (
    <>
      <tr key={risk.key} className="border-black border-2">
        <td style={tdStyle} className="" rowSpan={Math.max(controls.length+1,1)}>{risk.name}</td>
        <td style={tdStyle} rowSpan={Math.max(controls.length+1,1)}>{risk.rating}</td>
        {firstRow}
      </tr>
      {controls.map((c) => (
        <tr key={c.key}>
          {<MakeControl key={c.key} control={c} data={data} />}
        </tr>
      ))}
    </>
  );
}

function MakeTable(
  { component, data }: { component: ComponentData; data: ComponentProps },
) {
  return (
    <table style={{width:'1000px'}} className=" table-auto child:border-2 child:border-black mb-4">
      <thead>
        <tr>
          <th style={tdStyle} colSpan={5}>{component.name}</th>
        </tr>
        <tr>
          <th style={tdStyle}>Risk</th>
          <th style={tdStyle}>Rating</th>
          <th style={tdStyle} colSpan={3}>Controls</th>
        </tr>
        <tr>
          <th style={{...tdStyle, borderRight:'none'}}></th>
          <th style={{...tdStyle,borderLeft:'none'}}></th>
          <th style={tdStyle}>Description</th>
          <th style={tdStyle}>Implemented</th>
          <th style={tdStyle}>Annexes</th>
        </tr>
      </thead>
      <tbody>
        {data.risks.filter((risk) => risk.parent === component.key).map((r) =><MakeRisk key={r.key} risk={r} data={data} />
        )}
      </tbody>
    </table>
  );
}

export default function TableOutput(data: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <button
        onClick={(_) => {
          const curr = ref.current as HTMLDivElement;
          const html = curr.innerHTML;
          const clItem = new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
          });
          navigator.clipboard.write([clItem]);
        }}
      >
        {copy}
      </button>
      <div ref={ref}>
        {data.components.map((c) => (
          <MakeTable key={c.key} component={c} data={data} />
        ))}
      </div>
    </div>
  );
}
