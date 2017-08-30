/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import { getQueryParam } from '@shopgate/pwa-common/selectors/history';
import { toggleSearch } from 'Components/Navigator/action-creators';
import setSearchPhrase from './actions/setSearchPhrase';
import submitSearch from 'Components/Navigator/actions/submitSearch';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  getQueryParam: param => getQueryParam(state, param),
  searchPhrase: state.navigator.searchPhrase,
});

/**
 * Maps action dispatchers to the component props.
 * @param {function} dispatch The store dispatcher.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  setSearchPhrase: query => dispatch(setSearchPhrase(query)),
  submitSearch: () => dispatch(submitSearch()),
  toggleSearch: active => dispatch(toggleSearch(active)),
});

export default connect(mapStateToProps, mapDispatchToProps);
