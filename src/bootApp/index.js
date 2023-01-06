import loadIfc from '../config/loadIfc'
import viewer from '../config/initViewer'

import { sendChecksumData } from '../services/allservices'
import { magicLogger } from '../utils'
import {
  collectModelDataV3
} from './bootAppUtils'

import bimtrazerSortBlender from '../sorting/blender'
import { filterModelElements } from '../sorting/sortStuff'
import { IFCWALL } from 'web-ifc'

const { ifcManager } = viewer.IFC.loader

export default function initMyApp () {
  const $fileElment = document.getElementById('file-input')

  $fileElment.addEventListener('change',
    async (changed) => {
      const { myModel, file } = await loadIfc(changed)
      const { modelID } = myModel

      // Get all IfcWalls elements (IDs) from the model
      const allIfcWalsIds = await ifcManager.getAllItemsOfType(modelID, IFCWALL)

      // Get the elements properties
      const elementsProps = await filterModelElements(modelID, allIfcWalsIds)
      console.log('elementsProps', elementsProps)

      const modelData = await collectModelDataV3(modelID, file, elementsProps)
      console.log('model data', modelData)

      // Send model data to the API
      const response = await sendChecksumData(modelData)
      console.log(response)

      checkResponse(response, modelID, elementsProps, modelData.Guids, modelData.Name)
    },
    false
  )
}

function checkResponse (res, modelId, elementsProps, guids, projectId) {
  const isTheSameModel = res?.ID === '00'
  const aNewModel = res?.ID === '01'
  const anUpdatedModel = res?.ID === '02'

  if (aNewModel) {
    // shared blocks feature to be implemented
    const { DATA: DATA_FROM_API } = res
    const { Blocks: blocksInDb } = DATA_FROM_API

    magicLogger('The file corresponds to a new document', blocksInDb)

    setTimeout(() => {
      return bimtrazerSortBlender(modelId, elementsProps, blocksInDb, projectId)
    }, 1500)
  }
  if (anUpdatedModel) {
    const { DATA: DATA_FROM_API } = res

    magicLogger('Checksum: added elements', DATA_FROM_API.AddedElements)

    // if (DATA_FROM_API.AddedElements === null) {
    //   magicLogger('There is no new elements in the model')
    //   return
    // }

    magicLogger('The document belongs to an existing project')

    // return updateBlocks(DATA_FROM_API, updatedProps, modelId, projectId)
  }
  if (isTheSameModel) {
    magicLogger('The document is already in the storage')
  }
  if (!aNewModel && !anUpdatedModel && !isTheSameModel) {
    magicLogger('It was not a valid case [00 | 01 | 02]', res)
  }

  return res
}
