import React from 'react';
import PropTypes from 'prop-types';
import CardCategory from './card-category';

const CardList = ({category}) => {
  return (
    <>
      {category.map(({id, snippet}) => (
        <CardCategory
          key={id}
          thumbnail={snippet.thumbnails.standard.url}
          title={snippet.title}
          description={snippet.description}
        />
      ))}
    </>
  );
};

CardList.propTypes = {
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
  ).isRequired,
};

export default CardList;
