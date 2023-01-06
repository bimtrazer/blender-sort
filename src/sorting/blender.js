// import viewer from '../config/initViewer'
import {
  // checkException,
  // validate,
  normalizeGroundFloor,
  parseUnicode
} from '../utils'
// import {
//   // getBlockCodesNew,
//   // storeBlocksNew
// } from '../services/allservices'
import { buildBlocks, joinBricks } from './sortStuff'
import { mergeBricks } from './merge'

// const { ifcManager } = viewer.IFC.loader

export default async function bimtrazerSortBlender (modelID, elementsProps, blocksInDb, projectId) {
  console.log('bimtrazer sort for Blender')

  blocksInDb.forEach(block => {
    block.BtzDescription = normalizeGroundFloor(
      parseUnicode(block.BtzDescription).toUpperCase().trim()
    )
  })

  const blocks = buildBlocks(elementsProps, projectId)
  console.log('blocks before merge', blocks)

  // Merge blocks with the same description
  const joinedBlocks = joinBricks(blocks)
  console.log('blocks after', joinedBlocks)

  const finalBlocks = mergeBricks(joinedBlocks, blocksInDb)

  // Get block codes from API
  // const codes = await getBlockCodesNew(finalBlocks.length)
  // checkException(codes, 'There was an error getting the block codes')

  finalBlocks.forEach((block) => {
    if (block.BtzCode === 'UNASSIGNED') {
      // block.BtzCode = codes[index]
      block.BtzCode = 'TEST'
    }
  })

  console.log('final blocks [DB]', finalBlocks)

  // const res = await storeBlocksNew(blocks, 'BlocksIFC')
  // console.log('Store blocks res', res)

  // validate(res, 'BimtrazerSort: There was a problem while storing the blocks.')

  // collectBlenderModelData(finalBlocks)
}

// function collectBlenderModelData (blocks) {
//   blocks.forEach(block => {
//     const { BtzDescription } = block

//     console.log(
//       `Block "${BtzDescription}", elements count: ${block.Elements.length}`)
//   })
// }

/*
  Element data structure:

  {
      "expressID": 37160,
      "type": 2391406946,
      "GlobalId": {
          "type": 1,
          "value": "341xYnQ6LE$QsG6HkFDtRY"
      },
      "OwnerHistory": {
          "type": 5,
          "value": 37159
      },
      "Name": {
          "type": 1,
          "value": "492 Viga Sobre Planta N1"
      },
      "Description": null,
      "ObjectType": null,
      "ObjectPlacement": {
          "type": 5,
          "value": 37521
      },
      "Representation": {
          "type": 5,
          "value": 37516
      },
      "Tag": null
  }

*/
