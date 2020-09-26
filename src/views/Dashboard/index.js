import React from 'react';
import {Row, Col} from 'antd';
import {useHistory} from 'react-router-dom';
import {Container, Box} from './elements';

const Dashboard = () => {
  const history = useHistory();

  const pushView = (info) => {
    history.push({
      pathname: '/cam',
      props: {
        info,
      },
    });
  };

  return (
    <Container>
      <Row>
        <Col span={24}></Col>
      </Row>
      <Row gutter={[48, 48]}>
        <Col span={8}>
          <Box onClick={() => pushView('1')}>Item</Box>
        </Col>
        <Col span={8}>
          <Box onClick={() => pushView('2')}>Item</Box>
        </Col>
        <Col span={8}>
          <Box onClick={() => pushView('3')}>Item</Box>
        </Col>
      </Row>
      <Row gutter={[48, 48]}>
        <Col span={8}>
          <Box onClick={() => pushView('4')}>Item</Box>
        </Col>
        <Col span={8}>
          <Box onClick={() => pushView('5')}>Item</Box>
        </Col>
        <Col span={8}>
          <Box onClick={() => pushView('6')}>Item</Box>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
