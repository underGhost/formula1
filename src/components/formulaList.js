import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import Formula from 'components/formula';
if(process.env.BROWSER) {
  require('styles/formula.scss');
}

@observer
export default class FormulaList extends Component {
  getFormulas() {
    const {productsCount, products} = this.props.store;
    const formulas = [];
    for(let i = 0; i < productsCount; i++) {
      formulas.push(<Formula key={i} image={products.data[i].images['standard_resolution'].url} filter={products.data[i].filter} captionText={products.data[i].caption} />);
    }
    return formulas;
  }

  render () {
    return (
      <div className="formulaList">
        <span>Formulas: {this.props.store.productsCount}</span>
        {this.getFormulas()}
      </div>
    );
  }
}

FormulaList.propTypes = {
  store: PropTypes.shape({
    products: PropTypes.object.isRequired,
    productsCount: PropTypes.number.isRequired
  })
};
