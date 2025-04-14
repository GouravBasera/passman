import './App.css'
import PassGen from './passwordGenerator/passGen'
import PassMan from './passwordManager/passMan'
import Popup from './utils/popup'

function App() {

  return (
    <>
    <Popup/>
    <div className='flex h-[100vh] w-[100vw] justify-center'>
      <PassMan/>
      <PassGen/>
    </div>
    </>
  )
}

export default App