import './App.css'
import PassGen from './passwordGenerator/passGen'
import PassMan from './passwordManager/passMan'
import Login from './login/login'
import Header from './header/header'
import Footer from './footer/footer'

function App() {

  return (
    <>
    <Header/>
    {/* <Login/> */}
    <div className='flex h-[80vh] w-[100vw] justify-center'>
      <PassMan/>
      <PassGen/>
    </div>
    <Footer/>
    </>
  )
}

export default App