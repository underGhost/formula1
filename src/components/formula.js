import React, {Component, PropTypes} from 'react';
if(process.env.BROWSER) {
  require('styles/formula.scss');
}

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
  captionText: PropTypes.object,
  image: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired
};
