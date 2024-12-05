import React from 'react'
import Menubar from '../../Components/menu';
import SideMenubar from '../../Components/SideMenubar.jsx';
import { Outlet } from 'react-router-dom';
const Index = () => {
  return (
    <>
     <div className="outer h-full overflow-y-hidden" >
        <div className="top">
        <Menubar/>
        </div>
        <div className="bottom flex flex-row">
          <div className="navigationPart sticky h-full w-[calc(100vw-85vw)] overflow-hidden bg-gray-200">
            <SideMenubar />
          </div>
          <div className="outletPart h-[calc(100vh-5rem)] w-[calc(100vw-15vw)] bg-white overflow-hidden">
            <Outlet/>
          </div>
        </div>
     </div> 
    </>
  )
}

export default Index
