import React from 'react';
import PropTypes from 'prop-types';
import {Layout} from 'antd';
import Navbar from './navbar';
import Footer from './footer';
import {Content} from './elements';

const MainLayout = ({children}) => {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout>
        <Navbar />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainLayout;
