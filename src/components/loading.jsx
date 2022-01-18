// Copyright (c) 2022 Codexpo Technologies.

import React from 'react';

import 'styles/loading.scss';

const Loading = (props) => (
  <div className="loading-container">
    {props.loaderComponent ? (
      props.loaderComponent
    ) : (
      <span className="loading" />
    )}
  </div>
);

export default Loading;
