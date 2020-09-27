import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Card} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import {Skeleton} from 'antd';

const {Meta} = Card;

const trim = (text) =>
  text.length > 100 ? `${text.substring(0, 100)}...` : text;

const CardList = ({category, loading}) => {
  return (
    <>
      {loading
        ? new Array(8).fill().map(() => (
            <Card key={Math.random()}>
              <Skeleton.Image loading />
              <Skeleton loading key={Math.random()} />
            </Card>
          ))
        : category.map(({id, snippet}) => (
            <Link key={Math.random() * Date.now()} to="/cam">
              <Card
                style={{cursor: 'pointer'}}
                cover={
                  <img alt="example" src={snippet.thumbnails.standard.url} />
                }
                actions={[<RightOutlined key="setting" />]}
              >
                <Meta
                  title={snippet.title}
                  description={trim(snippet.description)}
                />
              </Card>
            </Link>
          ))}
    </>
  );
};

CardList.defaultProps = [];

CardList.propTypes = {
  loading: PropTypes.bool.isRequired,
  category: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      snippet: PropTypes.shape({
        thumbnails: PropTypes.shape({
          standard: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }),
        }),
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
    }),
  ),
};

export default CardList;
