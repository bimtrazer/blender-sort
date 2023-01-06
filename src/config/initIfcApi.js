import { IfcAPI } from 'web-ifc/web-ifc-api'

const ifcApi = new IfcAPI()

ifcApi.SetWasmPath('../wasm/')

export default ifcApi
