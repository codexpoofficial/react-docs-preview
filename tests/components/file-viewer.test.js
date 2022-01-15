// Copyright (c) 2022 Codexpo Technologies.

import React from 'react';
import { mount } from 'enzyme';
import FileViewer from 'components/file-viewer';

describe('file-viewer', () => {
  it('renders without crashing', () => {
    mount(
      <FileViewer fileType='fake' filePath='fake/path' />
    );
  });

  it('renders without crashing with visibility check disabled', () => {
    mount(
      <FileViewer fileType='fake' filePath='fake/path' disableVisibilityCheck />
    );
  });
});
