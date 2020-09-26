import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import VideoComparator from './views/video-comparator';
import Dashboard from './views/dashboard';

const {Header, Content} = Layout;

const App = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{padding: '0 50px'}}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/cam" component={VideoComparator} />
          <Redirect to="/" />
        </Switch>
      </Content>
    </Layout>
  );
};

export default App;
