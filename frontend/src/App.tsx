import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SearchBar from "./components/SearchBar";
import TourCard from "./components/TourCard";
import Home from "./pages/Home";
import TitleSubHome from "./components/TitleSubHome";
import TesteAPI from "./components/TesteAPI";

function App() {
  return (
    <>
      {/* Usar react router para navegar entre telas */}
      {/* <Home /> */}
      <TesteAPI />
    </>
  );
}

export default App;
