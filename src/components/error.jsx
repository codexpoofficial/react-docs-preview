// Copyright (c) 2022 Codexpo Technologies.

import React from 'react';

import 'styles/error.scss';
import ErrorIcon from '../assets/file-error.png'

const Error = (props) => (
  <div className="error-message">
    {props.errorComponent ? (
      props.errorComponent
    ) : (
      <div>
        <img src={ErrorIcon} />
      </div>
    )}
  </div>
);

export default Error;
