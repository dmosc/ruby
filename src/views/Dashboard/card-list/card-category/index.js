import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Card} from 'antd';
import {RightOutlined} from '@ant-design/icons';

const {Meta} = Card;

const trim = (text) =>
  text.length > 100 ? `${text.substring(0, 100)}...` : text;

const CardCategory = ({thumbnail, title, description}) => {
  return (
    <Link to="/cam">
      <Card
        style={{cursor: 'pointer'}}
        key={Math.random() * Date.now()}
        cover={<img alt="example" src={thumbnail} />}
        actions={[<RightOutlined key="setting" />]}
      >
        <Meta title={title} description={trim(description)} />
      </Card>
    </Link>
  );
};

CardCategory.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardCategory;
