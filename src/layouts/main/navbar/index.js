import React from 'react';
import {PageHeader} from 'antd';
import {Link} from 'react-router-dom';
import {NavbarContainer, Menu} from './elements';
const {Item} = Menu;

const NavBar = () => {
  return (
    <NavbarContainer>
      <Menu
        mode="horizontal"
        style={{display: 'flex', justifyContent: 'flex-end'}}
      >
        <PageHeader
          style={{marginRight: 'auto', padding: '0px 20px'}}
          title={
            <Link to="/">
              <img style={{height: '40px'}} src="/static/logo.png" />
            </Link>
          }
        />
        {/* <Link to="/new-document">
          <Button type="primary" shape="round" icon={<PlusOutlined />}>
            Nuevo
          </Button>
        </Link> */}
        <Item key="3">
          <span>Salir</span>
        </Item>
      </Menu>
    </NavbarContainer>
  );
};

export default NavBar;
