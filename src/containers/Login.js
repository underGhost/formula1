import React, {Component, PropTypes} from 'react';
if(process.env.BROWSER) {
  require('styles/Login.scss');
}

export default class Login extends Component {
  componentWillMount() {
    const {authToken} = this.props.store;
    if(authToken) {
      this.context.router.push('/formulas');
    }
  }
  render () {
    return (
      <div className='login_wrapper'>
        <section>
          <h1>Check out Formulashare!</h1>
          <a  className="button" href="https://api.instagram.com/oauth/authorize/?client_id=391741d96c7440aab019e10ce25519f0&redirect_uri=http://localhost:8000&scope=public_content&response_type=token">Login</a>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  store: PropTypes.shape({
    authToken: PropTypes.string
  })
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};
