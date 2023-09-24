"use client";
import { useReducer, useState} from "react";
import { GenericReducer } from "../types/reducer";
import { ComponentData } from "../types/component";
import { RiskData } from "../types/risk";
import { ControlData } from "../types/control";
import { AnnexData } from "../types/annex";
import Component from "./component";
import {
  ComponentCtx,
  ComponentDispatchCtx,
  RiskCtx,
  RiskDispatchCtx,
  ControlCtx,
  ControlDispatchCtx,
  AnnexCtx,
  AnnexDispatchCtx,
  NotificationCtx,
  NotificationDispatch,
} from "../contexts";
import initialData from "../../public/out.json";
import TableOutput from "./table";
import save from "../server/save";
import Notification from "../types/notification";
import { StatusBar } from "./statusBar";
import { v4 } from "uuid";
import Parent from "./parent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const initialComponents: ComponentData[] = initialData.components;
const initialRisks: RiskData[] = initialData.risks;
const initialControls: ControlData[] = initialData.controls;
const initialAnnexes: AnnexData[] = initialData.annexes;
export default function Main() {

  const [selectedComponentID, setSelectedComponent] = useState<string>();
  const [showSource, setShowSource] = useState<boolean>(false);
  const [components, dispatchComponents] = useReducer(
    GenericReducer<ComponentData>,
    initialComponents,
  );
  const [risks, dispatchRisks] = useReducer(
    GenericReducer<RiskData>,
    initialRisks,
  );
  const [controls, dispatchControls] = useReducer(
    GenericReducer<ControlData>,
    initialControls,
  );
  const [annexes, dispatchAnnexes] = useReducer(
    GenericReducer<AnnexData>,
    initialAnnexes,
  );
  const [notifications, dispatchNotifications] = useReducer(
    GenericReducer<Notification>,
    [],
  );
  const selectedComponent =
    components.find((c) => c.key === selectedComponentID) || components[0];
  const element = selectedComponent ? (
    <Component
      data={selectedComponent}
      risks={risks}
      controls={controls}
      annexes={annexes}
    />
  ) : (
    "select"
  );
  return (
    <NotificationCtx.Provider value={notifications}>
      <NotificationDispatch.Provider value={dispatchNotifications}>
        <ComponentCtx.Provider value={components}>
          <ComponentDispatchCtx.Provider value={dispatchComponents}>
            <RiskCtx.Provider value={risks}>
              <RiskDispatchCtx.Provider value={dispatchRisks}>
                <ControlCtx.Provider value={controls}>
                  <ControlDispatchCtx.Provider value={dispatchControls}>
                    <AnnexCtx.Provider value={annexes}>
                      <AnnexDispatchCtx.Provider value={dispatchAnnexes}>
                        <StatusBar
                          notifications={notifications}
                          dispatch={dispatchNotifications}
                        />
                        <Parent
                          data={{ components, risks, controls, annexes }}
                          dispatch={dispatchNotifications}
                        >
                          <button className="flex" onClick={()=> {
                            dispatchComponents({
                              type:'add',
                              data: {key: v4(), name: '[new component]'}
                            })
                          }}>
                            New Component
                          </button>
                          <button
                            className="flex items-center justify-center h-7 w-7 text-lg shadow m-1 rounded bg-white border border-black"
                            onClick={() => {
                              save({
                                components,
                                risks,
                                controls,
                                annexes,
                              }).then((r) => {
                                dispatchNotifications({
                                  type: "add",
                                  data: {
                                    key: v4(),
                                    content: String(r),
                                    ts: Date.now(),
                                  },
                                });
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faSave} />
                          </button>
                          <select
                            value={selectedComponentID}
                            onChange={(e) => {
                              setSelectedComponent(e.target.value);
                            }}
                          >
                            {components.map((e) => (
                              <option key={e.key} value={e.key}>
                                {e.name}
                              </option>
                            ))}
                          </select>
                          <input
                            type="checkbox"
                            checked={showSource}
                            onChange={(e) => {
                              setShowSource(e.target.checked);
                            }}
                          />
                        </Parent>
                        <div hidden={showSource}>{element}</div>
                        <div hidden={!showSource}>
                          <TableOutput
                            components={components}
                            risks={risks}
                            controls={controls}
                            annexes={annexes}
                          />
                        </div>
                      </AnnexDispatchCtx.Provider>
                    </AnnexCtx.Provider>
                  </ControlDispatchCtx.Provider>
                </ControlCtx.Provider>
              </RiskDispatchCtx.Provider>
            </RiskCtx.Provider>
          </ComponentDispatchCtx.Provider>
        </ComponentCtx.Provider>
      </NotificationDispatch.Provider>
    </NotificationCtx.Provider>
  );
}
