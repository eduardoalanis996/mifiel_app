import HomePage from "./pages/HomePage";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
