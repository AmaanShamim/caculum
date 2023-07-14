import "./App.css";
import Calculator from "./Components/Calculator";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Calculator />
      <div id="tribute">
        <p>by Amaan Shamim Khan</p>
      </div>
    </>
  );
}

export default App;
