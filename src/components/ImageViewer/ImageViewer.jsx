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

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };

    this.handleImgOnClick = this.handleImgOnClick.bind(this);
    this.handlePreviewOnClose = this.handlePreviewOnClose.bind(this);
  }

  setVisible(isVisible) {
    this.setState({
      isVisible
    });
  }

  handlePreviewOnClose() {
    this.setVisible(false);
  }

  handleImgOnClick() {
    this.setVisible(true);
  }

  render() {
    const { src, alt, style, previewSrcList } = this.props;
    const previewImgCount = previewSrcList ? previewSrcList.length : 0;
    let jsxViewer = <></>;

    if (previewImgCount === 0) {
      // 未传入 preview的图片，则默认preview当前图片
      jsxViewer = (
        <Viewer
          visible={this.state.isVisible}
          onClose={this.handlePreviewOnClose}
          images={[{ src, alt }]}
        />
      );
    } else {
      // 传入preview图片后，则preview传入的图片数组
      const previewOption = { ...this.props.previewOption };
      delete previewOption.images;
      jsxViewer = (
        <Viewer
          visible={this.state.isVisible}
          onClose={this.handlePreviewOnClose}
          images={this.props.previewSrcList}
          {...previewOption}
        />
      );
    }

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
