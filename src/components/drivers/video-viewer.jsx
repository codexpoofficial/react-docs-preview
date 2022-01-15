// Copyright (c) 2022 Codexpo Technologies.

import React, { Component } from 'react';

import 'styles/video.scss';
import Error from '../error';
import Loading from '../loading';

class VideoViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false
    };
  }

  componentDidMount(){
    this.setState({loading:false})
  }

  onCanPlay() {
    this.setState({ loading: false });
  }

  onError = e =>{
    this.props.onError(e);
    this.setState({error:true, loading:false});
  }

  renderLoading() {
    const visibility = this.state.loading ? "hidden" : "visible";
    if(this.state.error){
      return <Error errorComponent={this.props.errorComponent}/>
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return (      
      <div className="pg-driver-view">
          <div className="video-container">
            <video
              style={{ visibility }}
              muted={true}
              loop={true}
              autoPlay={true}
              controls
              type={`video/${this.props.fileType}`}
              onCanPlay={(e) => this.onCanPlay(e)}
              src={this.props.filePath}
              onError={(e) => this.onError(e)}
            >
              Video playback is not supported by your browser.
            </video>
          </div>
        </div>
    );
  }

  render() {    
    return (
        this.renderLoading()
    );
  }
}

export default VideoViewer;
