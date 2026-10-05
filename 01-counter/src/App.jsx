import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="counter-page">
      <div className="counter-card">
        

        <h1>Counter</h1>
        <p className="description">
          A simple counter built with React state.
        </p>

        <div className="count-display">
          <span>{count}</span>
        </div>

        <div className="button-group">
          <button
            className="counter-button decrease"
            onClick={() => setCount(count - 1)}
          >
            -
          </button>

          <button
            className="counter-button reset"
            onClick={() => setCount(0)}
          >
            Reset
          </button>

          <button
            className="counter-button increase"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>

        <p className="status">
          Current value: <strong>{count}</strong>
        </p>
      </div>
    </main>
  );
}

export default App;