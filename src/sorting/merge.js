export function mergeBricks (blocksA, blocksB) {
  const nonDuplicatedBlocks = []

  // Merge the blocks that have the same BtzDescription
  for (const blockA of blocksA) {
    let isDuplicated = false

    for (const blockB of blocksB) {
      if (blockA.BtzDescription === blockB.BtzDescription) {
        // Join the elements
        blockB.Elements = mergeElements(blockA.Elements, blockB.Elements)
        isDuplicated = true
        break
      }
    }

    if (!isDuplicated) {
      nonDuplicatedBlocks.push(blockA)
    }
  }

  return [...nonDuplicatedBlocks, ...blocksB]
}

// merge the elements of two different blocks without duplicating them
function mergeElements (elementsA, elementsB) {
  const nonDuplicatedElements = []

  for (const elementA of elementsA) {
    let isDuplicated = false

    for (const elementB of elementsB) {
      if (elementA.GlobalId === elementB.GlobalId) {
        isDuplicated = true
        break
      }
    }

    if (!isDuplicated) {
      nonDuplicatedElements.push(elementA)
    }
  }

  return [...nonDuplicatedElements, ...elementsB]
}
