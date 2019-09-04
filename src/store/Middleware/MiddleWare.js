import allAction from '../Action/allAction';
// import Dashboard from './../../component/dashboard';
// import { createBrowserHistory } from 'history';
// import { push } from 'connected-react-router'
// const history = createBrowserHistory();

class Middleware {
  // static  dashboard(data){
  //   return dispatch => {
  //     dispatch(allAction.dashboardAction(data));
  //   }
  // }
  static signupMiddleWare(data) {
    return dispatch => {
      // dispatch(allAction.signupUser(data));
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(resp => {
          console.log(resp.token);
          dispatch(allAction.signupUser(resp));
          if (resp.success) {
            alert('user created');
          } else if (!resp.success) {
            alert(resp.msg);
          }
        });
    };
  }
  static loginMiddleware(data) {
    return dispatch => {
      // dispatch(allAction.loginUser(data));
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(resp => {
          console.log(resp);
          localStorage.setItem('token', resp.token);
          // localStorage.setItem('key', 'value');
          dispatch(allAction.login_User1time(resp));
          if (resp.success) {
            alert('user found');
            // history.push('/dashboard')
            // dispatch(push('/dashboard'));
          } else if (!resp.success) {
            alert(resp.msg);
          }
        });
    };
  }
}
export default Middleware;
