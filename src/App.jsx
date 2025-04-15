import { useEffect } from 'react'
import './App.css'
import PassGen from './passwordGenerator/passGen'
import PassMan from './passwordManager/passMan'
import Popup from './utils/popup'

function App() {
  useEffect(()=>{
    const passwordArr = [] || localStorage.setItem("passArr", JSON.stringify(passArr))
  })

  return (
    <>
    <Popup/>
    <div className='flex h-screen w-screen justify-center'>
      <PassMan/>
      <PassGen/>
    </div>
    </>
  )
}

export default App