/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'glamor';
import colors from 'Styles/colors';

export default css({
  boxShadow: '0 0 6px rgba(0, 0, 0, .1)',
  position: 'absolute',
  top: 0,
  left: 0,
  background: colors.light,
  width: '100%',
  height: '100%',
  willChange: 'transform',
  zIndex: 1,
}).toString();
