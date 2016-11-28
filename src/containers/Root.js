import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
@observer(['state'])
class Root extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <span>
       {this.props.children}
      </span>
    );
  }
}

Root.propTypes = {
  children: PropTypes.object.isRequired
};

export default Root;
