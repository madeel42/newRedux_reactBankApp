import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MiddleWare from './../store/Middleware/MiddleWare';
class Child extends React.Component {
  state = {
    username: '',
    email: '',
    amount:'',
    dob: '',
    password: ''
  };
  handleValue = evt => {
    console.log(evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  submit_signup_user = evt => {
    evt.preventDefault();
    this.props.updatedData(this.state);
  };
  componentWillReceiveProps(updatedProps) {
    console.log('componentWillReceiveProps', updatedProps);
  }
  render() {
    console.log('redux updated state', this.state);
    return (
      <div className='signupFormstyle'>
        <Link to='/'>
          <h1>SignUp form</h1>
        </Link>
        <form onSubmit={this.submit_signup_user}>
          <input
            type='text'
            name='username'
            onChange={this.handleValue}
            placeholder='username'
          />
          <input
            type='email'
            name='email'
            onChange={this.handleValue}
            placeholder='email'
          />
          <input
            type='number'
            name='amount'
            onChange={this.handleValue}
            placeholder='initial amount'
          />
          <input
            type='date'
            name='dob'
            onChange={this.handleValue}
            placeholder='date of birth'
          />
          <input
            type='password'
            name='password'
            onChange={this.handleValue}
            placeholder='password'
          />
          <button>Signup</button>
        </form>
      </div>
    );
  }
}
function mapStatetoProps(state) {
  return {
    loginUser: state.login.loggedinUsers
  };
}
function mapDispatchtoProps(dispatch) {
  return {
    updatedData: data => {
      dispatch(MiddleWare.signupMiddleWare(data));
      // alert('user created');
    }
  };
}
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Child);
