import React from 'react';
import Child from './component/signup';
import Login from './component/login';
import Dashboard from './component/dashboard';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import allAction from './store/Action/allAction';
import jwtDecode from 'jwt-decode';
export default class Parent extends React.Component {
  componentDidMount() {
    let token = localStorage.getItem('token');
    console.log(token);
    if (token === undefined) {
      console.log('i am');
      const user = jwtDecode(token);
      store.dispatch({
        type: allAction.login_User,
        data: user
      });
    }
    // esle{

    // }
    // console.log(user);
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route
              exact
              path='/'
              render={() => {
                return (
                  <div className='btnStyle'>
                    <Link to='/signup'>
                      <button>signup</button>
                    </Link>
                    <Link to='/login'>
                      <button>Login</button>
                    </Link>
                  </div>
                );
              }}
            />
            <Route path='/signup' component={Child} />
            <Route path='/login' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
