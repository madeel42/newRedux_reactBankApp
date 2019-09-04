import React from 'react';
import { connect } from 'react-redux';
import MiddleWare from './../store/Middleware/MiddleWare';
import { Link, Redirect } from 'react-router-dom';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleValue = evt => {
    console.log(evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  submit_login_user = evt => {
    evt.preventDefault();
    this.props.updatedDataLogin(this.state);
  };
  componentWillReceiveProps(updatedProps) {
    console.log('componentWillReceiveProps', updatedProps);
  }
  otherroutr = () => {
    if (this.props.loginUser) {
      return <Redirect to='/dashboard' />;
    }
  };
  render() {
    // console.log('logerinuser.user',this.props.loginUser.user)
    return (
      <div className='loginUserstyle'>
        {this.otherroutr()}
        <form onSubmit={this.submit_login_user}>
          <Link to='/'>
            <h1>Login User</h1>
          </Link>
          <input
            type='email'
            name='email'
            placeholder='email'
            onChange={this.handleValue}
          />
          <input
            type='password'
            name='password'
            onChange={this.handleValue}
            placeholder='password'
          />
          <button>login</button>
        </form>
      </div>
    );
  }
}
function mapStatetoProps(state) {
  console.log(state);
  return {
    loginUser: state.login.loggedinUsers
  };
}
function mapDispatchtoProps(dispatch) {
  return {
    updatedDataLogin: data => {
      dispatch(MiddleWare.loginMiddleware(data));
    }
  };
}
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Login);
