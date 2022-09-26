import { HomeOutlined, AppstoreAddOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Route, Routes, Link } from "react-router-dom";
import React, { useState } from 'react';
import Home from './Home';
import ActiveTickets from './ActiveTickets';
import NewTickets from './NewTickets';
import './style/Layout.css';
const { Header, Content, Sider } = Layout;

const menuItems = [
    {label: <Link to='/'>Home</Link>, key: '1', icon: <HomeOutlined />, },
    {label: <Link to='/active-tickets'>Active tickets</Link>, key: '2', icon: <AppstoreOutlined />, },
    {label: <Link to='/new-tickets'>New tickets</Link>, key: '3', icon: <AppstoreAddOutlined />, },
];

const SidebarLayout = (props) => {
    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={true}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0,}} />
        <Content style={{margin: '0 16px',}}>
          <Breadcrumb style={{margin: '16px 0',}}>
            <Breadcrumb.Item>{props.area}</Breadcrumb.Item>
            <Breadcrumb.Item>{props.user}</Breadcrumb.Item> {/* username */}
          </Breadcrumb>
          <div className="site-layout-background" style={{padding: 24,minHeight: 360,}}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/active-tickets' element={<ActiveTickets parentProps={props}/>} />
              <Route path='/new-tickets'  element={<NewTickets parentProps={props}/>} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
    );
  };
  
  export default SidebarLayout;