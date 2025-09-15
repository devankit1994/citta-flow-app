import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SqlEditor from "./pages/SqlEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sql-editor" element={<SqlEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
