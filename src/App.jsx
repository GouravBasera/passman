import './App.css'
import PassGen from './passwordGenerator/passGen'
import PassMan from './passwordManager/passMan'
import Login from './login/login'
import Header from './header/header'
import Popup from './utils/popup'

function App() {

  return (
    <>
    {/* <Header/> */}
    {/* <Login/> */}
    <Popup/>
    <div className='flex h-[90vh] w-[100vw] justify-center'>
      <PassMan/>
      <PassGen/>
    </div>
    </>
  )
}

export default App