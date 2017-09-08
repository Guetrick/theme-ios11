/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';

/**
 * Review Author Component
 * @param {string} author The author name
 * @returns {*}
 * @constructor
 */
const ReviewAuthor = ({ author }) => {
  if (!author) {
    return null;
  }

  return (<I18n.Text string="reviews.author" params={[author]} />);
};

ReviewAuthor.propTypes = {
  author: PropTypes.string,
};

ReviewAuthor.defaultProps = {
  author: null,
};

export default ReviewAuthor;
