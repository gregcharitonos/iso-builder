import { v4 } from "uuid"

export interface sharedStateProps {
  key: string
}

type ActionTypes = 'add' | 'change' | 'remove'

export interface GenericAction<T extends sharedStateProps> {
  type: ActionTypes
  data: GenericAction<T>['type'] extends 'remove'? sharedStateProps: T
}

export function GenericReducer<T extends sharedStateProps>(array: T[], action: GenericAction<T>): T[] {
  switch (action.type) {
    case "add":{
      const data = {...action.data}
      data.key = v4(); 
      return [...array, data]
    }
    case "remove": {
      return array.filter(t=>t.key !== action.data.key)
    }
    case "change": {
      return array.map(c=>c.key===action.data.key?action.data:c)
    }
  }
}
