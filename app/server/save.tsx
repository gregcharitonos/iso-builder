'use server'

import { writeFileSync } from "fs"
import ComponentProps from "../types/componentProps"

export default async function save(data: ComponentProps) {
  try {
    writeFileSync('./public/out.json',JSON.stringify(data))
    return true;
  } catch(e: unknown) {
    return String(e) || false;
  }
}
