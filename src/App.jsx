import './style/App.css';
import { BrowserRouter } from "react-router-dom";
import SidebarLayout from './components/Layout';
import { AuthProvider } from './utils/AuthProvider';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarLayout />
      </AuthProvider>
    </BrowserRouter>
  );
} 

export default App;
