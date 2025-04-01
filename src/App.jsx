import './App.css'
import PassGen from './passwordGenerator/passGen'
import PassMan from './passwordManager/passMan'
import Login from './login/login'

function App() {

  return (
    <>
    <div className='flex h-[100vh] items-center m-auto justify-between'>
      {/* <PassGen/>
      <PassMan/> */}
      <Login/>
    </div>
    </>
  )
}

export default App