// const fullUrl = window.location.host
// const subdomain = fullUrl.split('.')[0]

const subdomain = '28'
const BASE_URL = `http://${subdomain}.bimtrazer.com/`

export async function sendChecksumData (data) {
  const modelData = new FormData()

  modelData.append('Name', data.Name)
  modelData.append('Guids', JSON.stringify(data.Guids))
  modelData.append('IfcContent', data.IfcContent)

  const URL = BASE_URL + 'checksum'
  const options = {
    method: 'POST',
    body: modelData
  }

  const res = await fetch(URL, options)
  return await res.json()
}

export async function storeBlocksNew (data, serviceType) {
  const URL = BASE_URL + 'api/PostDataProj'
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ID: serviceType,
      DATA: data
    })
  }

  try {
    const res = await fetch(URL, options)
    return await res.json()
  } catch (error) {
    console.error('There was an error: ', error)
    return null
  }
}

export async function sendChecksumDataNew (data) {
  const modelData = new FormData()

  modelData.append('Name', data.Name)
  modelData.append('Guids', JSON.stringify(data.Guids))
  modelData.append('IfcContent', data.IfcContent)

  const URL = BASE_URL + 'checksum'
  const options = {
    method: 'POST',
    body: modelData
  }

  try {
    const res = await fetch(URL, options)
    return await res.json()
  } catch (error) {
    console.error('There was an error: ', error)
    return null
  }
}

export async function getBlockCodesNew (numberOfBlocks) {
  const URL = BASE_URL + `api/GetBlocks/${numberOfBlocks}/0`
  const options = {
    method: 'GET'
  }

  try {
    const res = await fetch(URL, options)
    const {
      DATA: data,
      DESCRIPCION: status,
      ID: id
    } = await res.json()

    if (status === 'Successful' && id === '00') {
      return data
    }
  } catch (error) {
    console.error('There was an error: ', error)
    return null
  }
}
