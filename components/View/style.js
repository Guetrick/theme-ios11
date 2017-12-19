/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'glamor';
import variables from 'Styles/variables';

const NAVBAR_HEIGHT = variables.navigator.height;
const STATUSBAR_HEIGHT = variables.statusBar.height;

/**
 * Creates the content style.
 * @param {boolean} hasNavigator Whether to add the top offset when the navigator is visible.
 * @param {boolean} hasTabBar Whether to add the bottom offset when the tab bar is visible.
 * @return {string} The content style class.
 */
const content = (hasNavigator = true, hasTabBar = true) => css({
  overflow: 'auto',
  overflowScrolling: 'touch',
  WebkitOverflowScrolling: 'touch',
  width: '100%',
  position: 'absolute',
  top: hasNavigator ? NAVBAR_HEIGHT + STATUSBAR_HEIGHT : STATUSBAR_HEIGHT,
  marginBottom: hasTabBar ? variables.tabBar.height : 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
}).toString();

export default {
  content,
};
