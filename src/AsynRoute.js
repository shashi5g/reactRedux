// @flow

import React from 'react';


class AsyncRoute extends React.Component {
  state = {
    loaded: false
  };
  componentDidMount() {
    this.props.loadingPromise.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }
  
  render() {
    if (this.state.loaded) {
      return <this.component {...this.props} />;
    }
return <h1>{'loader'}</h1>;
  }
}

export default AsyncRoute;
