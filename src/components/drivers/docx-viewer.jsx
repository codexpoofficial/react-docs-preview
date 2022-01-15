// Copyright (c) 2022 Codexpo Technologies.

import React, { Component } from 'react';
import mammoth from 'mammoth';

import 'styles/docx.scss';
import Loading from '../loading';
import Error from '../error';

export default class extends Component {

  constructor(props){
    super(props);
    this.state = {
      error: null,
      loading:true
    };
  }

  componentDidMount() {
    if (this.props.filePath === undefined || !this.props.filePath) {
      this.setState({ error: 'undefined', loading: false });
      return;
    }

    fetch(this.props.filePath)
      .then(function (response) {
        if (response.ok) {
          return response;
        } else {
          throw new Error(response);
        }
      })
      .then(async (blob) => {
        mammoth
          .convertToHtml(
            { arrayBuffer: await blob.arrayBuffer()},
            { includeDefaultStyleMap: true }
          )
          .then((result) => {
            this.setState({loading:false});
            const docEl = document.createElement("div");
            docEl.className = "document-container";
            docEl.innerHTML = result.value;
            document.getElementById("docx").innerHTML = docEl.outerHTML;
          })
          .catch((e) => {            
            this.setState({error:e, loading:false});
            this.props.onError(e);
          })
          .done();
      })
      .catch((e) => {
        this.setState({error:e, loading:false});
        this.props.onError(e);
      });
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
    return (
      <div id="docx">
        {this.renderLoading()}
      </div>);
  }
}
