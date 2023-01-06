import viewer from '../config/initViewer'
import {
  IFCPROJECT
} from 'web-ifc'

const { ifcManager } = viewer.IFC.loader

/**
 * @param   {Integer} modelID - con el ID del modelo
 * @returns {String} (GUID de 22 caracteres) - Es un identificador unico para el documento.
 */
export async function getProjectGuid (modelID) {
  const expressID = await ifcManager.getAllItemsOfType(modelID, IFCPROJECT)
  const { GlobalId } = await ifcManager.getItemProperties(modelID, parseInt(expressID))
  return GlobalId.value
}

/* Unused functions */
export async function getGuids (modelID, blockProps) {
  const { getProperties } = viewer.IFC

  for (const block of blockProps) {
    for (const item of block) {
      const { expressID } = item
      const props = await getProperties(modelID, expressID, false, false)

      console.log(props)
    }
  }
}
