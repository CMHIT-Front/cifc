import React, { Component } from "react";
import PropTypes from "prop-types";
import Viewer from "react-viewer";
import "./ImageViewer.less";

class ImageViewer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    style: PropTypes.object,
    previewSrcList: PropTypes.array,
    previewOption: PropTypes.object
  };

  static defaultProps = {
    style: {},
    previewSrcList: [],
    previewOption: {}
  };

  state = {
    isVisible: false
  };

  setVisible = isVisible => {
    this.setState({
      isVisible
    });
  };

  handlePreviewOnClose = () => {
    this.setVisible(false);
  };

  handleImgOnClick = () => {
    this.setVisible(true);
  };

  render() {
    const { src, alt, style, previewSrcList, previewOption } = this.props;
    const images = previewSrcList.length > 0 ? previewSrcList : [{ src, alt }];
    const visible = this.state.isVisible;
    const onClose = () => {
      this.handlePreviewOnClose();
      previewOption.onClose && previewOption.onClose();
    };
    // 需要覆盖在antd的控件只上，至少要大于1050
    const zIndex = 1100;

    let jsxViewer = (
      <Viewer
        {...previewOption}
        images={images}
        zIndex={zIndex}
        visible={visible}
        onClose={onClose}
      />
    );

    return (
      <>
        <img
          className="cifc-image-viewer"
          src={src}
          alt={alt}
          style={style}
          onClick={this.handleImgOnClick}
        />
        {jsxViewer}
      </>
    );
  }
}

export default ImageViewer;
