import './App.css';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className='calculator-grid'>
        <div className='output'>
          <div className='previous-value'></div>
          <div className='current-value'></div>
        </div>
        <button className='two-span'>AC</button>
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
        <button className='two-span'>=</button>
      </div>
    </>
  );
}

export default App;
