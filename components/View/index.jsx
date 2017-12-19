/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { shopName } from 'Config/app.json';
import SwipeableContainer from './components/SwipeableContainer';
import connect from './connector';
import styles from './style';

/**
 * The view component.
 */
class View extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    setTitle: PropTypes.func.isRequired,
    hasNavigator: PropTypes.bool,
    hasTabBar: PropTypes.bool,
    head: PropTypes.shape({
      meta: PropTypes.array,
      link: PropTypes.array,
      script: PropTypes.array,
      style: PropTypes.array,
    }),
    style: PropTypes.shape(),
    title: PropTypes.string,
  };

  static defaultProps = {
    hasNavigator: true,
    hasTabBar: true,
    head: {
      meta: [],
      link: [],
      script: [],
      style: [],
    },
    style: null,
    title: null,
    viewTop: true,
  };

  /**
   * The component constructor
   * @param {Object} props The component props
   */
  constructor(props) {
    super(props);

    this.element = null;
  }

  /**
   * Sets the navigator title when the component mounts.
   */
  componentDidMount() {
    // If we already know the page title then we can set it immediately.
    if (this.props.title !== null) {
      this.props.setTitle(this.props.title);
    }
  }

  /**
   * Sets the new navigator title if it has changed.
   * @param {Object} nextProps The new component props.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      this.props.setTitle(nextProps.title || this.props.title);
    }
  }

  /**
   * Creates an internal reference to an element.
   * @param {Object} ref The reference to an element.
   */
  setRef = (ref) => {
    this.element = ref;
  }

  /**
   * Sets the navigator title when the component mounts.
   */
  routeWillEnter() {
    this.props.setTitle(this.props.title);
  }

  /**
   * Renders the HTML meta tags.
   * @returns {JSX}
   */
  renderMetaTags() {
    const { meta, link, script, style } = this.props.head;

    return (
      <Helmet
        title={this.props.title ? `${this.props.title} - ${shopName}` : shopName}
        meta={meta}
        link={link}
        script={script}
        style={style}
      />
    );
  }
  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const { children } = this.props;
    const contentStyle = styles.content(this.props.hasNavigator, this.props.hasTabBar);

    return (
      <SwipeableContainer>
        <article
          className={contentStyle}
          ref={this.setRef}
        >
          {this.renderMetaTags()}
          {React.Children.map(children, (child) => {
            /**
             * Inject a viewRef prop into all of the children
             * to give them access to the <article> ref.
             */
            if (!child) {
              return null;
            }

            // Just return the child if it is not a React component.
            if (typeof child.type === 'string') {
              return child;
            }

            return React.cloneElement(child, {
              ...this.element && { viewRef: this.element },
            });
          })}
        </article>
      </SwipeableContainer>
    );
  }
}

export default connect(View);
