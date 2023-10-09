import {Catalog} from '../Components/Catalog'

function App() {

  return (
 
<div className="grid grid-cols-5 grid-rows-8 gap-3 overflow-hidden bg-[#161a1d]">
    
    <div className="col-span-5 grid grid-cols-5 gap-4">
      <Catalog/><Catalog/> <Catalog/> <Catalog/><Catalog/>
      <Catalog/><Catalog/><Catalog/><Catalog/><Catalog/>
      <Catalog/><Catalog/><Catalog/><Catalog/>
      </div>
</div>
    
  )
}

export default App
