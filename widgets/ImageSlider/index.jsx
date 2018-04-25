import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import Image from '@shopgate/pwa-common/components/Image';
import ImageSlider from 'Components/ImageSlider';
import styles from './style';

/**
 * Core image slider widget.
 * @param {Object} props The widget properties
 * @returns {JSX}
 */
class ImageSliderWidget extends Component {
  static propTypes = {
    // The settings as received by the pipeline request
    settings: PropTypes.shape({
      autostart: PropTypes.bool.isRequired, // Should the slider start automatically?
      delay: PropTypes.number.isRequired, // The delay between the automatic slides
      pagination: PropTypes.bool.isRequired, // Show the pagination (dots)?
      loop: PropTypes.bool.isRequired, // Wrap the slider content when it reached the last image?
      images: PropTypes.arrayOf(( // An array of images to display
        PropTypes.shape({
          image: PropTypes.string.isRequired, // The image URL
          link: PropTypes.string, // The link to the image
          alt: PropTypes.string, // The alternative title for images that could not be loaded.
        })
      )).isRequired,
    }).isRequired,
    className: PropTypes.string, // Additional styles to append to the image slider.
  };

  static defaultProps = {
    className: '',
  };

  /**
   * Render Component
   * @returns {JSX}
   */
  render() {
    const { settings, className } = this.props;

    return (
      <ImageSlider
        className={className}
        autoPlay={settings.autostart}
        indicators={settings.pagination}
        interval={settings.delay}
        loop={settings.loop}
      >
        {settings.images.map((image, index) => {
          /**
           * Create an array of images, each one with a unique key
           * (to prevent conflicts when using the exact same image).
           */
          const key = `si${index}`;
          let imageComponent = (<Image key={key} src={image.image} alt={image.alt} />);

          if (image.link) {
            imageComponent = (
              <Link key={key} href={image.link} className={styles.link}>
                {imageComponent}
              </Link>
            );
          }

          return imageComponent;
        })}
      </ImageSlider>
    );
  }
}

export default ImageSliderWidget;
