// Copyright (c) 2022 Codexpo Technologies.

import React, { Component } from 'react';

import Error from './error';
import Loading from './loading';

function withFetching(WrappedComponent, props) {
  return class extends Component {
    constructor(props) { // eslint-disable-line no-shadow
      super(props);
      this.state = {};
      this.xhr = this.createRequest(props.filePath);
    }

    componentDidMount() {
      try {
        this.fetch();
      } catch (e) {
        if (this.props.onError) {
          this.props.onError(e);
        }
        this.setState({ error: 'fetch error' });
      }
    }

    componentWillUnmount() {
      this.abort();
    }

    createRequest(path) {
      let xhr = new XMLHttpRequest();

      if ('withCredentials' in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open('GET', path, true);
      } else if (typeof XDomainRequest !== 'undefined') {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open('GET', path);
      } else {
        // CORS not supported.
        xhr = null;
        return null;
      }
      if (props.responseType) {
        xhr.responseType = props.responseType;
      }

      xhr.onload = () => {
        if (xhr.status >= 400) {
          this.setState({ error: `fetch error with status ${xhr.status}` });
          return;
        }
        const resp = props.responseType ? xhr.response : xhr.responseText;

        if(props.fileType === 'xlsx' && resp.byteLength) this.setState({ data: resp });
        else if(resp !== '') this.setState({ data: resp });
        else {
          this.props.onError("file is not valid");
          this.setState({error:"file is not valid"});
        }        
      };

      return xhr;
    }

    fetch() {
      this.xhr.send();
    }

    abort() {
      if (this.xhr) {
        this.xhr.abort();
      }
    }

    render() {
      if (!this.xhr) {
        return <h1>CORS not supported..</h1>;
      }

      if (this.state.error) {
        return <Error errorComponent={this.props.errorComponent} />;
      }

      if (this.state.data) {
        return <WrappedComponent data={this.state.data} {...this.props} />;
      }
      return (
        <Loading />
      );
    }
  };
}

export default withFetching;
