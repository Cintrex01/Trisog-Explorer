import "./App.css";
import TesteAPI from "./components/TesteAPI";
import { Slider, SliderProps, Slide } from "./components/Slider";
import Home from "./pages/Home";

function App() {
  const settings: SliderProps = {
    spaceBetween: 50,
    slidesPerView: 3,
    navigation: true,
    pagination: {
      clickable: true,
    },
  };

  return (
    <>
      {/* Usar react router para navegar entre telas */}
      <Home />
      {/* <TesteAPI /> */}
    </>
  );
}

export default App;
