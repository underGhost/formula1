import React, {Component} from 'react';
import 'styles/formula.scss';

export default class Formula extends Component {
  render () {
    return (
      <div className="formula">
        <img src="https://img.buzzfeed.com/buzzfeed-static/static/2015-04/7/11/enhanced/webdr02/enhanced-13471-1428419144-22.png"/>
        <div className="info">
          <h3>Simple Grey</h3>
          <p>A great formula to add to your collection.</p>
        </div>
      </div>
    );
  }
}

Formula.propTypes = {
};
