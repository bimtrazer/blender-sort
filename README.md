## 🏢 Proto Bricks Builder
It's the tool that mainly allows you to build Bimtrazer Blocks.

### Directory tree
📦src <br/>
 ┣ 📂assets <br/>
 ┣ 📂bootApp <br/>
 ┃ ┣ 📂responses (Dev util) <br/>
 ┃ ┣ 📜bootAppUtils.js <br/>
 ┃ ┣ 📜index.js <br/>
 ┃ ┣ 📜updateBlocks.js <br/>
 ┃ ┗ 📜updateBlocksUtils.js <br/>
 ┣ 📂config <br/>
 ┃ ┣ 📜initIfcApi.js <br/>
 ┃ ┣ 📜initViewer.js <br/>
 ┃ ┗ 📜loadIfc.js <br/>
 ┣ 📂modules <br/>
 ┃ ┣ 📂getting <br/>
 ┃ ┃ ┣ 📜getGroupItems.js <br/>
 ┃ ┃ ┣ 📜getStuff.js <br/>
 ┃ ┃ ┣ 📜index.js <br/>
 ┃ ┃ ┗ 📜utils.js <br/>
 ┃ ┗ 📂sorting <br/>
 ┃ ┃ ┣ 📂triggers <br/>
 ┃ ┃ ┃ ┣ 📜blender.js <br/>
 ┃ ┃ ┃ ┣ 📜fullDevVersion.js (Dev util) <br/>
 ┃ ┃ ┃ ┗ 📜oldSort.js <br/>
 ┃ ┃ ┣ 📜bimtrazerSort.js <br/>
 ┃ ┃ ┣ 📜bricksUtils.js <br/>
 ┃ ┃ ┣ 📜development.functions.js (Dev util) <br/>
 ┃ ┃ ┣ 📜index.js <br/>
 ┃ ┃ ┣ 📜sortGroups.js <br/>
 ┃ ┃ ┣ 📜sortStuff.js <br/>
 ┃ ┃ ┗ 📜utils.js <br/>
 ┣ 📂services <br/>
 ┃ ┣ 📜devServices.js (Dev util) <br/>
 ┃ ┣ 📜getBlockCodes.js <br/>
 ┃ ┣ 📜index.js <br/>
 ┃ ┣ 📜sendChecksumData.js <br/>
 ┃ ┗ 📜storeBlocks.js <br/>
 ┣ 📂styles <br/>
 ┃ ┣ 📜button.css <br/>
 ┃ ┣ 📜button.scss <br/>
 ┃ ┣ 📜loader.css <br/>
 ┃ ┣ 📜main.css <br/>
 ┃ ┗ 📜tree.css <br/>
 ┣ 📂utils <br/>
 ┃ ┣ 📜highlight.js <br/>
 ┃ ┣ 📜index.js <br/>
 ┃ ┣ 📜logger.js <br/>
 ┃ ┣ 📜normalize.js <br/>
 ┃ ┣ 📜renderStuff.js <br/>
 ┃ ┣ 📜setColor.js <br/>
 ┃ ┣ 📜shortcuts.js <br/>
 ┃ ┗ 📜validate.js <br/>
 ┣ 📜app.js <br/>
 ┗ 📜bundle.js <br/>

### ⚙ Super cool functions

#### Modules / Sorting

```JS
  /**
   * @param   {Integer} modelID
   * @returns {Promise<void>}
   */
  async function bimtrazerSort (modelID)  
```
Es la funcion que se encarga de disparar todo el proceso de clasificacion de la información necesaria para Bimtrazer.

Existen dos variaciones de esta función, `bimtrazerSort` y `bimtrazerSortDev`. La versión para desarrollo incluye logs de todo el proceso de ejecución.


```JS
  /**
   * @param   {Object} rawDictionary - Es un conjuntos de arreglos que contiene toda la 
   * información del los parametros Bimtrazer introduccidos en un modelo IFC. Estos son,
   *   1. rawDictionary.descriptions
   *   2. rawDictionary.startDates
   *   3. rawDictionary.endDates
   * @returns {Array<Object>} - Un array de objetos que almacena parte de la información
   * de un bloque por cada posición.
   */
  async function sortPropertiesV4 (rawDictionary)  
```
Esta cuarta versión se utiliza para pre-construir los bloques, es decír, contiene parte de la información final del conjunto de bloques. A partir de la ejecución de esta función podemos determinar el numero de bloques y sus elementos, entre otras cosas.


```JS
  /**
   * @param   {Array<Object>} rawPropsSet - Un subconjunto de todas las clases PROPERTYSET en el
   * documento IFC las cuales fueron filtradas anteriormente. Estos objetos tienen información
   * ligada a aquellos elementos con parametros Bimtrazer.
   * @param   {Array<Object>} prebuiltBlocks - Es un array de objetos que almacena parte de la
   * información de un bloque por cada posición.
   * @returns {Array<Array<Object>>}
   */
  async function buildBtzBlocksV4 (rawPropsSet, prebuiltBlocks)  
```
Se encarga de construir la estructura de datos final para todos los bloques en esta instancia.


```JS
  /**
   * @param   {Array<Object>} rawBtzParams - Contiene un conjunto de propiedades sin clasificar
   * de los elementos que tienen parametros Bimtrazer.
   * @returns {Array<Integer>}
   */
  function filterPropertiesIds (rawBtzParams)  
```
Filtra los expressIDs de aquellos elementos con alguna propiedad BTZ.


```JS
  /**
   * @param   {Array<Object>} rawBtzParams - Contiene un conjunto de propiedades sin clasificar
   * de los elementos que tienen parametros Bimtrazer.
   * @returns {Array<Integer>}
   */
  function filterProps (rawBtzParams)  
```
Filtra el contenido de texto en los parametros BTZ sin repeterir.


```JS
  /**
   * @param   {Function} filterFieldFrom - accede a todas las ocurrencias de un cierto campo
   * del IFC sin repetir.
   * @param   {Array} rawProps - objetos con todas las propiedades del archivo IFC.
   * @returns {Array}
   */
  function sortProperties (filterFieldFrom, rawProps)
```
Esta funcion filtra las propiedades de un documento IFC y agrupa
la informacion para poder conseguir una estructura de datos en bloques




#### Modules / Getting

```JS
  /**
   * @param   {Integer} modelID
   * @returns {Array<Objetos>}
   */
  async function getAllBtzParams (modelID)
```
Accede a todos las propiedades del modelo que estan ligadas a parametros Bimtrazer. Se utiliza
la clase `IfcPropertySingleValue` para filtrar las propiedades.


```JS
  /**
   * @param   {String} parameter - con el nombre del parametro a buscar en el IFC
   *   1. 'description'
   *   2. 'beginning'
   *   3. 'ending'
   * @param   {Integer} modelID
   * @returns {Array<Object>}
   */
  async function getPropSingleValue (parameter, modelID)
```
Accede a un conjunto de propiedades del modelo que estan ligadas a un parametro Bimtraazer especifico. 


```JS
  /**
   * @param   {Array<Integer>} paramIds - IDs btz-description.
   * @param   {Integer} modelID
   * @returns {Array<Object>}
   */
  async function getPropertySet (paramIds, modelID)
```
Esta funcion obtiene las propiedades provenientes de la clase PropertySet, 
la cual contiene informacion valiosa como, el GUID, los expressIds de las 
propiedades del bloque (btzd, beginning, end).


```JS
  /**
   * @param {Integer} modelID - con el ID del modelo.
   * @param {Integer} groupID - un expressID que corresponde al identificador de un grupo de elementos.
   */
  async function getItemsOfGroup (modelID, groupID)
```
Accede a todos los Guids de los elementos pertenecientes a ese grupo en particular.


### 🤖 Scripts
`npm run build` genera el bundle.js dentro de la carpeta /src ubicada en el root del proyecto. Si la carpeta no existe el comando se encarga de crearla.

`npm run watch` genera la build y queda escuchando los cambios en la aplicacion.

### WebAssembly
Hay que tener en cuenta que es necesario copiar los archivos `web-ifc.wasm` y `web-ifc-mt.wasm` en nuestro proyecto.
Estos archivos contienen el codigo C++ compilado con la logica **_web-ifc_**.

### Errores
_"unexpected style type"_
It means that there's something that hasn't been implemented in _web-ifc_ yet. You can create an issue in web-ifc to request for the implementation.

_Manejar los contenidos de descripciones con tildes_
