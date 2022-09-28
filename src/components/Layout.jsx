import { HomeOutlined, AppstoreAddOutlined, AppstoreOutlined, UserOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { auth } from "../database/authentication";
import { signOut } from "firebase/auth";
import { AuthContext } from "../utils/AuthProvider";
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import NewTickets from '../pages/NewTickets';
import ActiveTickets from '../pages/ActiveTickets';
import './style/Layout.css';
const { Content, Sider } = Layout;


const SidebarLayout = (props) => {
  const {currentUser} = useContext(AuthContext);
  let navigate = useNavigate()

  const logout = () =>{
    signOut(auth)
    .then(() =>{
      alert('Cerró su sesión correctamente')
      setInterval(navigate('/'), 1000)
    })
  }
  const loggedOutMenuItems = [
    {label: <Link to='/'>Página principal</Link>, key: '1', icon: <HomeOutlined />},
    {label: <Link to='/ingresa'>Ingresa</Link>, key: '2', icon: <UserOutlined />},] 
  const loggedInMenuItems =[
      {label: <Link to='/nuevos-tickets'>Nuevos Tickets</Link>, key: '3', icon: <AppstoreAddOutlined />, },
      {label: <Link to='/tickets-activos'>Tickets Activos</Link>, key: '4', icon: <AppstoreOutlined />, },
      {label: 'Cerrar sesión', key: '5', icon: <UserDeleteOutlined />, onClick: logout, danger: true}]
    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsed={true}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" items={currentUser ? loggedInMenuItems : loggedOutMenuItems}/>
      </Sider>
      <Layout className="site-layout">
        <Content style={{margin: '16px 16px'}}>
          <div className="site-layout-background" style={{padding: 24,minHeight: 360,}}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/ingresa' element={<SignIn />} />
              <Route path='/tickets-activos' element={<ActiveTickets parentProps={props}/>} />
              <Route path='/nuevos-tickets'  element={<NewTickets parentProps={props}/>} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
    );
  };
  
  export default SidebarLayout;