// Copyright (c) 2022 Codexpo Technologies.

import React, { Component } from 'react';

import 'styles/video.scss';
import Error from '../error';
import Loading from '../loading';

class AudioViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error:false
    };
  }

  onCanPlay() {
    this.setState({ loading: false });
  }

  onError = e =>{
    this.props.onError(e);
    this.setState({error:true});
  }

  renderLoading() {
    if(this.state.error){
      return <Error errorComponent={this.props.errorComponent}/>
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return null;
  }

  render() {
    const visibility = this.state.loading ? 'hidden' : 'visible';
    return (
      <div className="pg-driver-view">
        <div className="video-container">
          {this.renderLoading()}
          <audio
            style={{ visibility }}
            controls
            onCanPlay={e => this.onCanPlay(e)}
            src={this.props.filePath}
            onError={e=>this.onError(e)}
          >
            Video playback is not supported by your browser.
          </audio>
        </div>
      </div>
    );
  }
}

export default AudioViewer;
