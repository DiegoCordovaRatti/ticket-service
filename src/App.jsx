import './style/App.css';
import { BrowserRouter } from "react-router-dom";
import SidebarLayout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <SidebarLayout />
    </BrowserRouter>
  );
} 

export default App;
