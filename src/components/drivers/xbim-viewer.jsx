// Copyright (c) 2022 Codexpo Technologies.

import React, { Component } from 'react';
import XViewer from '../../utils/xbim-viewer.debug.bundle';

import Error from '../error';
import Loading from '../loading';

export default class XBimViewer extends Component {
  // TODO check for webgl compatibility
  constructor(props) {
    super(props);
    this.state = {loading:true, error: false };
  }

  componentDidMount() {
    try {
      const viewer = new XViewer('xbim-viewer');
      viewer.load(this.props.filePath);
      viewer.start();
      this.setState({loading:false });
    } catch (e) {
      if (this.props.onError) {
        this.props.onError(e);
      }
      this.setState({ error: e, loading:false });
    }
  }

  renderLoading() {
    if(this.state.error){
      return <Error errorComponent={this.props.errorComponent}/>;
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return null;
  }

  render() {    
    return (      
      <div className="pg-driver-view" >
        {this.renderLoading()}
        <canvas id="xbim-viewer" />
      </div>
    );
  }
}
