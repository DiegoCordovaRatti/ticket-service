import { HomeOutlined, AppstoreAddOutlined, AppstoreOutlined, CloseSquareFilled } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { Route, Routes, Link } from "react-router-dom";
import Home from './Home';
import ActiveTickets from './ActiveTickets';
import NewTickets from './NewTickets';
import './style/Layout.css';
import { auth } from "../database/authentication";
import { signOut } from "firebase/auth";
const { Header, Content, Sider } = Layout;


const SidebarLayout = (props) => {
  const menuItems = [
    {label: <Link to='/'>Página principal</Link>, key: '1', icon: <HomeOutlined />},
    {label: <Link to='/tickets-activos'>Tickets Activos</Link>, key: '2', icon: <AppstoreOutlined />, },
    {label: <Link to='/nuevos-tickets'>Nuevos Tickets</Link>, key: '3', icon: <AppstoreAddOutlined />, }]
  const logout = () =>{
      signOut(auth)
      .then(alert('Cerró su sesión correctamente'))
  }

    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsed={true}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0,}} />
        <Content style={{margin: '0 16px',}}>
          <div className="site-layout-background" style={{padding: 24,minHeight: 360,}}>
            <Routes>
              <Route path='/' element={<Home />} />
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