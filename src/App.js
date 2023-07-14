import "./App.css";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-value">123456789*</div>
          <div className="current-value">123456789</div>
        </div>
        <button className="two-span">AC</button>
        <button>DEL</button>
        <button>÷</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button className="two-span">=</button>
      </div>
      <div id="tribute">
        <p>by Amaan Shamim Khan</p>
      </div>
    </>
  );
}

export default App;
