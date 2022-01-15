// Copyright (c) 2022 Codexpo Technologies.

import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import FileViewer from './components/file-viewer';
import sampleHouse from '../sample_docs/SampleHouse.wexbim';
import solarImage from '../sample_docs/02-USVI-Solar.jpg';
import docx from '../sample_docs/SampleSpec.docx';
import doc from '../sample_docs/test.doc';
import csv from '../sample_docs/Total_Crime.csv';
import mp4 from '../sample_docs/small.mp4';
import xlsx from '../sample_docs/SimpleSpreadsheet.xlsx';
import photo360 from '../sample_docs/360photo.jpg';
import avi from '../sample_docs/drop.avi';
import webm from '../sample_docs/small.webm'
import mov from '../sample_docs/step.mov'
import mp3 from '../sample_docs/sample.mp3'
import rtf from '../sample_docs/sample.rtf';
import pdf from '../sample_docs/sample.pdf';
import ErrorIcon from './assets/file-error.png'

//Example

const ErrorComponent = () => (
  <React.Fragment>
    <div>
    <img src={ErrorIcon} />
    </div>
  </React.Fragment>
);

const onError =(e) =>{
  console.log(e);
}

ReactDOM.render(
  <FileViewer
    fileType="web"
    filePath={sampleHouse}
    errorComponent={<ErrorComponent/>}
    onError={e => onError(e)}
  />,
  window.document.getElementById('app')
);
