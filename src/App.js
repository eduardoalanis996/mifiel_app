import HomePage from "./pages/HomePage";
import SignPage from "./pages/SignPage";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign/:widgetId" element={<SignPage />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
