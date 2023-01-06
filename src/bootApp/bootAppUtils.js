import {
  getProjectGuid
} from '../getting'
import { validateAnArray } from '../utils'

// const { ifcManager } = viewer.IFC.loader

export async function collectModelDataV3 (modelId, file, elementsProps) {
  const guids = elementsProps.map(element => {
    const { GlobalId } = element
    return GlobalId.value
  })

  validateAnArray(guids, 'No GUIDs found.')

  return {
    Name: await getProjectGuid(modelId),
    IfcContent: file,
    Guids: guids
  }
}
