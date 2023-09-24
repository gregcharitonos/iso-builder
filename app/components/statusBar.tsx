import Notification from "../types/notification"
import { Dispatch, useEffect } from "react"
import { GenericAction } from "../types/reducer";

const maxTime = 3000;
export function StatusBar ({notifications, dispatch}: {notifications: Notification[], dispatch: Dispatch<GenericAction<Notification>>}) {
  useEffect(()=>{
    let anim: number = -1;
    function loop() {
      if(notifications.length){
        const n = notifications[0];
        if((Date.now() - n.ts) > maxTime) {
          dispatch({
            type: 'remove',
            data: n
          })
        }
      }
      anim = requestAnimationFrame(loop);
    }
    if(anim===-1){loop()};
    return ()=>{cancelAnimationFrame(anim)}
  })
  return (
    <div className="w-full h-8 bg-blue-100 flex flex-row gap-4 justify-center">
      {notifications.map(e=>(
        <span>{e.content}</span>
      ))}
    </div>
  )
}
