/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Review from './components/Review';

/**
 * Review List Component
 * @param {Object} reviews A list of reviews
 * @returns {XML}
 * @constructor
 */
const List = ({ reviews }) => {
  let components = [];

  Object.keys(reviews).forEach((key) => {
    components = [
      ...components,
      [<Review key={key} review={reviews[key]} />],
    ];
  });

  return (
    <div>
      {components}
    </div>
  );
};

List.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape()),
};

List.defaultProps = {
  reviews: null,
};

export default List;
