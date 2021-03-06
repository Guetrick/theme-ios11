import { connect } from 'react-redux';
import {
  getFavorites,
  isInitialLoading,
} from '@shopgate/pwa-common-commerce/favorites/selectors';

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  products: getFavorites(state),
  initialLoading: isInitialLoading(state),
});

export default connect(mapStateToProps, null, null, { withRef: true });
