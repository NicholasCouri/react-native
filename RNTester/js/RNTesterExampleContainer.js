/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

const React = require('react');
const {Platform} = require('react-native');
const RNTesterBlock = require('./RNTesterBlock');
const RNTesterExampleFilter = require('./RNTesterExampleFilter');
const RNTesterPage = require('./RNTesterPage');

class RNTesterExampleContainer extends React.Component {
  renderExample(example, i) {
    // Filter platform-specific examples
    const {description, platform} = example;
    let {title} = example;
    let platformSupported;
    if (platform) {
      if (Array.isArray(platform)) {
        if (!platform.includes(Platform.OS)) {
          return null;
        }
        platformSupported = platform.join(' & ');
      } else {
        if (Platform.OS !== platform) {
          return null;
        }
        platformSupported = platform;
      }

      title += ' (' + platformSupported + ' only)';
    }
    return (
      <RNTesterBlock key={i} title={title} description={description}>
        {example.render()}
      </RNTesterBlock>
    );
  }

  render(): React.Element<any> {
    if (!this.props.module.examples) {
      return <this.props.module />;
    }

    if (
      this.props.displayFilter === false ||
      this.props.module.examples.length === 1
    ) {
      return (
        <RNTesterPage title={this.props.title}>
          {this.props.module.examples.map(this.renderExample)}
        </RNTesterPage>
      );
    }

    const filter = ({example, filterRegex}) => filterRegex.test(example.title);

    const sections = [
      {
        data: this.props.module.examples,
        title: 'EXAMPLES',
        key: 'e',
      },
    ];

    return (
      <RNTesterPage title={this.props.title}>
        <RNTesterExampleFilter
          sections={sections}
          filter={filter}
          render={({filteredSections}) =>
            filteredSections[0].data.map(this.renderExample)
          }
        />
      </RNTesterPage>
    );
  }
}

module.exports = RNTesterExampleContainer;
