import './style/App.css';
import { BrowserRouter } from "react-router-dom";
import SidebarLayout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <SidebarLayout area='Call Center' user='Diego' />
    </BrowserRouter>
  );
} 

export default App;
