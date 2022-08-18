import { useState } from 'react'
import ReceiveForm from '../../Component/FormReceive/ReceiveForm'
import SideBar from '../../Component/SideBar/Sidebar'
import './Admin.css'
const Admin=()=>{
    const [com,setCom]=useState(<ReceiveForm/>)
    return(
        <div className='wrap'>
            <div className='side-bar'>

            </div>
            {com}
        </div>
    )
}
export default Admin