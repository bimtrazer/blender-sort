import {
  normalizeGroundFloor,
  parseUnicode,
  validateAnArray
} from '../utils'
import viewer from '../config/initViewer'

const { ifcManager } = viewer.IFC.loader

export function buildBlocks (elementsProps, projectId) {
  const blocks = elementsProps.map(element => {
    const { Name, GlobalId } = element

    const normalizedDesc = normalizeGroundFloor(
      parseUnicode(Name.value).toUpperCase().trim()
    )

    let description = normalizedDesc
    if (normalizedDesc.includes('WALL/')) {
      // get al the descriptions after the first slash
      description = normalizedDesc.split('/').slice(1).join('/')
    }

    const newElm = {
      ExpressId: element.expressID,
      GlobalId: GlobalId.value,
      HasProperties: [],
      ProjectId: projectId
    }

    return {
      BtzCode: 'UNASSIGNED',
      BtzDescription: description,
      BtzStartDate: null,
      BtzEndDate: null,
      Elements: [newElm],
      Labels: []
    }
  })

  return blocks
}

export async function filterModelElements (modelID, ifcWalls) {
  const fedeElements = []

  for (const ifcWall of ifcWalls) {
    const aIfcWall = await ifcManager.getItemProperties(modelID, ifcWall)
    fedeElements.push(aIfcWall)
  }

  return fedeElements
}

export function joinBricks (blocks) {
  const mergedBlocks = []

  blocks.forEach(block => {
    const { BtzDescription } = block

    const blockIndex = mergedBlocks.findIndex(
      mergedBlock => mergedBlock.BtzDescription === BtzDescription
    )

    if (blockIndex === -1) {
      mergedBlocks.push(block)
    } else {
      mergedBlocks[blockIndex].Elements.push(...block.Elements)
    }
  })

  return mergedBlocks
}

/**
 * @param  {Function} filterFieldFrom - accede a todas las ocurrencias de un cierto campo
 *         del IFC sin repetir
 * @param  {Array} rawProps - objetos con todas las propiedades del archivo IFC
 * @returns {Array}
 *
 * Esta funcion filtra las propiedades de un documento IFC y agrupa
 * la informacion para poder conseguir una estructura de datos en bloques
 */
export function sortProperties (filterFieldFrom, rawProps) {
  const sortedProps = []

  validateAnArray(rawProps, 'There is no btz parameter.')

  for (const field of filterFieldFrom(rawProps)) {
    const block = []
    for (const prop of rawProps) {
      const { expressID, NominalValue } = prop
      if (NominalValue.value === field) {
        block.push({
          expressID,
          btzDescription: NominalValue.value
        })
      }
    }

    sortedProps.push(block)
  }

  return sortedProps
}

/**
 * @param {Array<Object>} rawBtzParams - Contiene un conjunto de propiedades sin clasificar
 * de los elementos que tienen parametros Bimtrazer.
 * @returns {Array<Integer>}
 *
 * Filtra el contenido de texto en los parametros BTZ sin repeterir.
 */
export function filterProps (rawBtzParams) {
  const propertyValues = []

  if (rawBtzParams.length === 0) return null

  for (const param of rawBtzParams) {
    const { NominalValue } = param
    const value = NominalValue.value
    if (!propertyValues.includes(value)) {
      propertyValues.push(value)
    }
  }

  return propertyValues
}

/**
 * @param {Array<Object>} rawBtzParams - Contiene un conjunto de propiedades sin clasificar
 * de los elementos que tienen parametros Bimtrazer.
 * @returns {Array<Integer>}
 *
 * Filtra los expressIDs de aquellos elementos con alguna propiedad BTZ.
 */
export function filterPropertiesIds (rawBtzParams) {
  const ids = []

  if (rawBtzParams.length === 0) return null

  for (const param of rawBtzParams) {
    const { expressID } = param
    if (!ids.includes(expressID)) {
      ids.push(expressID)
    }
  }

  return ids
}
