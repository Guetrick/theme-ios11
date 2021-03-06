import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { getAbsoluteHeight } from '@shopgate/pwa-common/helpers/dom';
import { bin2hex } from '@shopgate/pwa-common/helpers/data';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import { ITEM_PATH } from '@shopgate/pwa-common-commerce/product/constants/index';
import { CART_ITEM_TYPE_PRODUCT } from '@shopgate/pwa-common-commerce/cart/constants';
import CardListItem from '@shopgate/pwa-ui-shared/CardList/components/Item';
import MessageBar from '@shopgate/pwa-ui-shared/MessageBar';
import {
  cartItemTransitionDuration as duration,
  getCartItemTransitionStyle as getTransitionStyle,
} from '../../../../style';
import styles from '../../style';
import connect from './connector';
import Layout from './components/Layout';

const messageStyles = {
  container: styles.messagesContainer,
  message: styles.messages,
};

/**
 * The Cart Product component.
 */
class Product extends Component {
  static propTypes = {
    currency: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    product: PropTypes.shape().isRequired,
    quantity: PropTypes.number.isRequired,
    deleteProduct: PropTypes.func,
    onToggleFocus: PropTypes.func,
    updateProduct: PropTypes.func,
  };

  static defaultProps = {
    deleteProduct: () => {},
    onToggleFocus: () => {},
    updateProduct: () => {},
  };

  static childContextTypes = {
    cartItemId: PropTypes.string,
    type: PropTypes.string,
    product: PropTypes.shape(),
  };

  /**
   * Constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      visible: true,
    };
  }

  /**
   * Expose props to the descendant components to use them for the portals.
   * @return {Object}
   */
  getChildContext() {
    return {
      cartItemId: this.props.id,
      type: CART_ITEM_TYPE_PRODUCT,
      product: this.props.product,
    };
  }

  /**
   * We need to set the element height explicitly so that we can animate it later.
   */
  componentDidMount() {
    this.transitionElement.style.height = `${getAbsoluteHeight(this.cardElement) + 4}px`;
  }

  /**
   * Toggles the edit mode of the products. This should be always called,
   * when interaction with the quantity input happens.
   * @param {boolean} [isEnabled=true] Tells if the edit mode is enabled, or disabled.
   */
  toggleEditMode = (isEnabled = true) => {
    this.props.onToggleFocus(isEnabled);

    this.setState({
      editMode: isEnabled,
    });
  };

  /**
   * Sets this product to be invisible via its state.
   */
  transitionOut = () => {
    this.setState({
      visible: false,
    });
  };

  /**
   * Deletes the product from the cart.
   */
  deleteProduct = () => {
    this.props.deleteProduct(this.props.id);
  };

  /**
   * Updates the quantity of the product within the cart.
   * @param {number} quantity The new quantity
   */
  updateProduct = (quantity) => {
    this.props.updateProduct(this.props.id, quantity);
  };

  /**
   * Render Function.
   * @returns {jsx}
   */
  render() {
    return (
      <Transition in={this.state.visible} timeout={duration} onExited={this.deleteProduct}>
        {state => (
          <div
            ref={(element) => { this.transitionElement = element; }}
            key={this.props.id}
            style={getTransitionStyle(state)}
          >
            <CardListItem>
              <div ref={(element) => { this.cardElement = element; }}>
                {this.props.messages.length > 0 &&
                  <MessageBar messages={this.props.messages} classNames={messageStyles} />}
                <Link
                  tagName="a"
                  href={`${ITEM_PATH}/${bin2hex(this.props.product.id)}`}
                  itemProp="item"
                  itemScope
                  itemType="http://schema.org/Product"
                >
                  <Layout
                    handleDelete={this.transitionOut}
                    handleUpdate={this.updateProduct}
                    toggleEditMode={this.toggleEditMode}
                    editMode={this.state.editMode}
                    product={this.props.product}
                    currency={this.props.currency}
                    quantity={this.props.quantity}
                  />
                </Link>
              </div>
            </CardListItem>
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(Product);
