import "./App.css";
import Calculator from "./Components/Calculator";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Calculator />
      <div id="tribute">
        <p>Designed by <b>Amaan Shamim Khan</b></p>
      </div>
    </>
  );
}

export default App;
