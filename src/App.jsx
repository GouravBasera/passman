import './App.css'
import PassGen from './passwordGenerator/passGen'
import PassMan from './passwordManager/passMan'

function App() {

  return (
    <>
    <div className='flex w-[80vw] h-[100vh] items-center m-auto justify-between'>
      <PassGen/>
      <PassMan/>
    </div>
    </>
  )
}

export default App