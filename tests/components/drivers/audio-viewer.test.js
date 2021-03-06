// Copyright (c) 2022 Codexpo Technologies.

import React from 'react';
import renderer from 'react-test-renderer';

import { AudioViewer } from 'components/drivers';

describe('AudioViewer', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <AudioViewer filePath='fake/path' />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
