import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoApp from './pages/todo';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
