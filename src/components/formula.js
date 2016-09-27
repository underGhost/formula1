import React, {Component} from 'react';
import 'styles/formula.scss';

export default class Formula extends Component {
  formatCaption() {
    return this.props.captionText ? this.props.captionText.text : '';
  }
  render () {
    return (
      <div className="formula">
        <img src={this.props.image}/>
        <div className="info">
          <h3>{this.props.filter}</h3>
          <p>{this.formatCaption()}</p>
        </div>
      </div>
    );
  }
}

Formula.propTypes = {
};
