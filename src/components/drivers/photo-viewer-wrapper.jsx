// Copyright (c) 2022 Codexpo Technologies.

import React, { Component } from 'react';

import * as THREE from 'three';
import PhotoViewer from './photo-viewer';
import Photo360Viewer from './photo360-viewer';
import Loading from '../loading';
import Error from '../error';

function getPhotoDriver(width, height, fileType) {
  if (fileType === 'jpg' && window.Math.abs((width / height) - 2) <= 0.01) {
    return Photo360Viewer;
  }
  return PhotoViewer;
}

export default class PhotoViewerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalWidth: 0,
      originalHeight: 0,
      imageLoaded: false,
      error: false
    };
  }

  componentDidMount() {
    if (this.props.filePath === undefined || !this.props.filePath) {
      this.setState({ error: 'undefined', loading: false });
      return;
    }
    // spike on using promises and a different loader or adding three js loading manager
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = '';
    // load a resource
    loader.load(
      // resource URL
      this.props.filePath,
      // Function when resource is   loaded
      (texture) => {
        this.setState({
          originalWidth: texture.image.width,
          originalHeight: texture.image.height,
          imageLoaded: true,
          texture,
        });
      },
      (xhr) => {
        console.log(`${xhr.loaded / xhr.total * 100}% loaded`);
      },
      (xhr) => {
        this.setState({error:true});
        this.props.onError(xhr);
        console.log('An error happened', xhr);
      },
    );
  }

  render() {
    if(this.state.error){
      return <Error errorComponent={this.props.errorComponent}/>
    }
    if (!this.state.imageLoaded) {
      return <Loading />;
    }    

    const { originalWidth, originalHeight } = this.state;
    const PhotoDriver = getPhotoDriver(originalWidth, originalHeight, this.props.fileType);

    return (
      <PhotoDriver {...this.state} {...this.props} />
    );
  }
}
