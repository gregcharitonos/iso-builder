import { useEffect, ReactNode, Dispatch} from "react";
import ComponentProps from "../types/componentProps";
import save from "../server/save";
import { v4 } from "uuid";
import { GenericAction } from "../types/reducer";
import Notification from "../types/notification";

interface ParentProps {
  data: ComponentProps
  children: ReactNode[]
  dispatch: Dispatch<GenericAction<Notification>>
}
export default function Parent({data, children, dispatch}: ParentProps) {
  useEffect(()=>{
    const handleSave =(e: KeyboardEvent)=>{
      if(e.metaKey && e.key === 's'){
        e.preventDefault();
        save(data).then(r=>{
          dispatch({
            type:'add',
            data: {key: v4(), content: String(r), ts: Date.now()}
          })
        })
        return
      }
    }
    window.addEventListener('keydown',handleSave);
    return ()=>{window.removeEventListener('keydown',handleSave)}
  },[])
  return (
    <div className="p-2 flex">
      {children}
    </div>
  )
}
