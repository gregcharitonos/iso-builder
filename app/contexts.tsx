import { Dispatch, createContext } from "react";
import { GenericAction } from "./types/reducer";
import { sharedStateProps } from "./types/reducer";
import { ComponentData } from "./types/component";
import { RiskData } from "./types/risk";
import { ControlData } from "./types/control";
import { AnnexData } from "./types/annex";
import Notification from "./types/notification";

export type E<T extends sharedStateProps> = Dispatch<GenericAction<T>>
export type D<T extends sharedStateProps> = E<T>|null
export const ComponentCtx = createContext<ComponentData[]|null>(null);
export const ComponentDispatchCtx = createContext<D<ComponentData>>(null);

export const RiskCtx = createContext<RiskData[]|null>(null);
export const RiskDispatchCtx = createContext<D<RiskData>>(null);

export const ControlCtx = createContext<ControlData[]|null>(null);
export const ControlDispatchCtx = createContext<D<ControlData>>(null);

export const AnnexCtx = createContext<AnnexData[]|null>(null);
export const AnnexDispatchCtx = createContext<D<AnnexData>>(null);

export const NotificationCtx = createContext<Notification[]|null>(null)
export const NotificationDispatch = createContext<D<Notification>>(null)
