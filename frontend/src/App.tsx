import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'


function App() {

  return (
    <> 
      <Header/> {/* Usar react router para navegar entre telas */}
      <LoginForm/>
      <Footer/>
    </>
  )
}

export default App
