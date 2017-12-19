/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import { clientWidth } from '@shopgate/pwa-common/helpers/agent';
import connect from './connector';
import styles from './style';

const SWIPE_BACK_START = 20;
const SWIPE_BACK_MIN_DISTANCE = clientWidth / 3;
const SWIPE_BACK_MAX_DISTANCE = clientWidth / 2;

/**
 * The SwipeableContainer component.
 */
class SwipeableContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    historyBack: PropTypes.func.isRequired,
    historyLength: PropTypes.number.isRequired,
  };

  /**
   * Constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.element = null;

    this.state = {
      isSwipingBack: false,
    };
  }

  /**
   * Update only when the swiping state changes.
   * @param {*} nextProps The next component props.
   * @param {*} nextState The next component state.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isSwipingBack !== nextState.isSwipingBack;
  }

  /**
   * Updates the HTMLElement to move relative to the swipe gesture.
   * @param {number} position The position that the element should move to.
   */
  setElementPosition = (position) => {
    // Cap the distance that the element can travel.
    const posX = Math.min(position, SWIPE_BACK_MAX_DISTANCE);
    this.element.style.transform = `translate3d(${posX}px, 0, 0)`;
  }

  /**
   * Creates an internal reference to an element.
   * @param {Object} ref The reference to an element.
   */
  setRef = (ref) => {
    this.element = ref;
  }

  /**
   * Handles the swipe down gesture.
   * @param {Object} event The event object.
   * @param {number} deltaX The change on the x axis.
   * @param {number} deltaY The change on the y axis.
   * @param {boolean} isFlick Whether this is a flick or swipe.
   * @param {number} velocity The velocity of the gesture.
   */
  handleSwipe = (event, deltaX, deltaY, isFlick, velocity) => {
    // If this is an intended swipe back then move back through the history.
    if (this.state.isSwipingBack) {
      this.setState({
        isSwipingBack: false,
      });

      if (Math.abs(deltaX) >= SWIPE_BACK_MIN_DISTANCE) {
        this.props.historyBack();
      } else {
        this.setElementPosition(0);
      }

      return;
    }

    const swipeEvent = new CustomEvent('swipe', {
      detail: {
        event,
        deltaX,
        deltaY,
        isFlick,
        velocity,
      },
    });

    this.element.dispatchEvent(swipeEvent);
    this.setElementPosition(0);
  };

  /**
   * Handles the swipe down gesture.
   * @param {Object} event The event object.
   * @param {number} deltaX The change on the x axis.
   */
  handleSwiping = (event, deltaX) => {
    const { clientX } = event.nativeEvent.changedTouches[0];

    if (
      this.props.historyLength === 1 ||
      (!this.state.isSwipingBack && !this.isSwipeBack(clientX, deltaX))
    ) {
      return;
    }

    this.setState({
      isSwipingBack: true,
    });

    if (deltaX < 0) {
      this.setElementPosition(-deltaX);
    }
  };

  /**
   * Determines whether or not a swipe from the left qualifies as a 'swipe back'.
   * @param {number} startX The start position of the swipe.
   * @param {number} deltaX The horizontal delta of the swipe.
   * @returns {boolean}
   */
  isSwipeBack = (startX, deltaX) => (startX + deltaX) <= SWIPE_BACK_START;

  /**
   * @returns {JSX}
   */
  render() {
    console.warn(this.state.isSwipingBack);
    const inlineStyle = {
      ...!this.state.isSwipingBack && { transition: 'transform 275ms cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
    };

    return (
      <section className={styles} ref={this.setRef} style={inlineStyle}>
        <Swipeable
          onSwiped={this.handleSwipe}
          onSwiping={this.handleSwiping}
          flickThreshold={0.6}
          delta={10}
        >
          {this.props.children}
        </Swipeable>
      </section>
    );
  }
}

export default connect(SwipeableContainer);
