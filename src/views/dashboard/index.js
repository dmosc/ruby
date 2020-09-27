import React, {useEffect, useState} from 'react';
import {Typography} from 'antd';
import trainings from 'data/trainings';
import {youtube} from 'client';
import CardList from './card-list';
import {Container} from './elements';

const {Title} = Typography;

const Dashboard = () => {
  const [upperBody, setUpperBody] = useState([]);
  const [lowerBody, setLowerBody] = useState([]);
  const [core, setCore] = useState([]);
  const [cardio, setCardio] = useState([]);
  const [flexibility, setFlexibility] = useState([]);
  const [loading, setLoading] = useState(true);

  const get = async (videoList) => {
    const {
      data: {items},
    } = await youtube.get(
      `/videos?part=id%2C+snippet&id=${videoList.toString()}`,
    );

    return items || [];
  };

  useEffect(() => {
    const getVideos = async () => {
      const [
        upperBodyToSet,
        lowerBodyToSet,
        coreToSet,
        cardioToSet,
        flexibilityToSet,
      ] = await Promise.all([
        get(trainings.upperBody),
        get(trainings.lowerBody),
        get(trainings.core),
        get(trainings.cardio),
        get(trainings.flexibility),
      ]);

      setUpperBody(upperBodyToSet);
      setLowerBody(lowerBodyToSet);
      setCore(coreToSet);
      setCardio(cardioToSet);
      setFlexibility(flexibilityToSet);
      setLoading(false);
    };

    getVideos();
  }, []);

  return (
    <>
      <Title style={{marginTop: 10}} level={4}>
        Upper body
      </Title>
      <Container>
        <CardList loading={loading} category={upperBody} />
      </Container>
      <Title style={{marginTop: 10}} level={4}>
        Lower body
      </Title>
      <Container>
        <CardList loading={loading} category={lowerBody} />
      </Container>
      <Title style={{marginTop: 10}} level={4}>
        Core
      </Title>
      <Container>
        <CardList loading={loading} category={core} />
      </Container>
      <Title style={{marginTop: 10}} level={4}>
        Cardio
      </Title>
      <Container>
        <CardList loading={loading} category={cardio} />
      </Container>
      <Title style={{marginTop: 10}} level={4}>
        Flexibility
      </Title>
      <Container>
        <CardList loading={loading} category={flexibility} />
      </Container>
    </>
  );
};

export default Dashboard;
