import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import store from './../store/store';
import { connect } from 'react-redux';
import Middleware from '../store/Middleware/MiddleWare';
import allAction from './../store/Action/allAction';
import uuid from 'uuid';
class Dashboard extends React.Component {
  // state = {
  //   editing : false
  // }
  // withdraw = () => {
  //   let trans = {
  //     //   transaction : [],
  //     editing: false,
  //     type: 'cash',
  //     // User: this.props.data.loggedInUser.name+"'s",
  //     nature: 'withdraw',
  //     // transactionAmount: this.refs.withdrawamount.value,
  //     Id: Math.floor(Math.random() * 1000 + 1),
  //     date: new Date().toLocaleDateString(),
  //     amount: ''
  //     // remainingBalance: this.props.data.loggedInUser.amount - -this.refs.withdrawamount.value,
  //   };
  //   store.dispatch({
  //     type: 'trans',
  //     data: trans
  //   });
  // };
  handleValue = evt => {
    console.log(evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value
    });
    // this.setState({});
  };
  state = {
    //   transaction : [],
    editing: false,
    type: 'cash',
    // User: this.props.data.loggedInUser.name+"'s",
    // nature: 'withdraw',
    // nature: 'deposite',
    // transactionAmount: this.refs.withdrawamount.value,

    date: new Date().toLocaleDateString(),
    amount: ''
    // remainingBalance: this.props.data.loggedInUser.amount - -this.refs.withdrawamount.value,
  };
  // store.dispatch({
  //   type: 'trans',
  //     data: this.state.trans
  //   })
  // }
  // state = {
  //   editing : false
  // }
  deposite = () => {
    const nature = 'deposite';
    const Id = Math.floor(Math.random() * 1000 + 1);
    this.props.updatedData({ ...this.state, Id, nature });
  };
  withdraw = () => {
    console.log(this.state.Id);
    const nature = 'withdraw';
    const Id = Math.floor(Math.random() * 1000 + 1);
    this.props.updatedData({ ...this.state, Id, nature });
  };
  componentWillReceiveProps(nextprops) {
    console.log('dashboardprops', nextprops);
  }
  otherroutr = () => {
    if (!this.props.usersData) {
      return <Redirect to='/login' />;
    }
  };
  logout = () => {
    localStorage.removeItem('token');
    // return <Redirect to='/' />;
    store.dispatch({
      type: allAction.login_User,
      data: null
    });
    return <Redirect to='/login' />;
  };
  render() {
    // console.log('initial state', this.props);
    // console.log('dasbord updated transaction', this.props.amount);
    const { transactions } = this.props.transactions;
    console.log('dasboard updated user', this.props.usersData);
    const { user } = this.props.usersData || false;
    // {this.props.amount.map((item)=>{
    //   return console.log(item.amount);
    // })}
    return (
      <div>
        <div className='infostyl'>
          <nav>
            <div class='nav-wrapper'>
              <a href='#' class='brand-logo'>
                CITI BANK
              </a>
              <ul id='nav-mobile' class='right hide-on-med-and-down'>
                {/* <li>
                  <a href='badges.html'>Welcome {user.username}</a>
                </li> */}
                <li>{/* <a href='collapsible.html'>{user.email}</a> */}</li>
                <li>
                  <button onClick={this.logout}>logout</button>
                </li>
              </ul>
            </div>
          </nav>
          <table>
            <tr>
              <td>NAME</td>
              <td></td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>
                {user && <p>{user.amount * 1}</p>}
                {/* {!transactions ? user.amount : transactions.map((transaction)=>{
                  return <tr>
                    <td>{transaction.amount}</td>
                  </tr>
                })} */}
                {/* {transactions
                  ? transactions.map(transaction => {
                      return transaction.amount;
                    })
                  : ''}{' '} */}
              </td>
            </tr>
            <tr>
              <td>
                <input type='text' name='amount' onChange={this.handleValue} />
              </td>
              <td>
                <button
                  onClick={() => this.withdraw()}
                  class='waves-effect waves-light btn'
                >
                  WITHDRAW
                </button>
                <button
                  onClick={this.deposite}
                  class='waves-effect waves-light btn'
                >
                  DEPOSIT
                </button>
              </td>
            </tr>
          </table>
          <table>
            <thead>
              <th>transaction ID</th>
              <th>date</th>
              <th>nature</th>
              <th>type</th>
              <th>amount</th>
              <th>Dell transaction</th>
              <th>EDIT transaction</th>
            </thead>
            <tbody>
              {!transactions ? (
                <h2> ....</h2>
              ) : (
                transactions.map((transaction, index) => {
                  return (
                    <tr key={index}>
                      <td>{transaction.Id}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.nature}</td>
                      <td>{transaction.type}</td>
                      <td>
                        {this.state.editing ? (
                          <input
                            onChange={evt => {
                              console.log(evt.target.value);
                              this.setState({
                                editValue: evt.target.value
                              });
                            }}
                            defaultValue={transaction.amount}
                          />
                        ) : (
                          transaction.amount
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            this.props.dellData({ target: index, ctx: this });
                          }}
                        >
                          dell
                        </button>
                      </td>
                      <td>
                        {!this.state.editing && (
                          <button
                            onClick={() => {
                              this.setState({
                                editing: true
                              });
                            }}
                          >
                            updated
                          </button>
                        )}
                        {this.state.editing && (
                          <button
                            onClick={() => {
                              this.props.updateData({
                                updateAmount: this.state.editValue,
                                index: index
                              });
                              this.setState({ editing: false });
                            }}
                          >
                            done
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
              {/* {this.props.transactions.transactions.map(transaction => {
                return <tr>
                    <td>{transaction.Id}</td>
                  </tr>
                
              })} */}
            </tbody>
          </table>
        </div>
        {this.otherroutr()}
      </div>
    );
  }
}
const mapStatetoProps = state => {
  // console.log('dashboard state', state);
  return {
    usersData: state.login.loggedinUsers,
    // amount: state.login.transactions.amount,
    transactions: state.login
  };
};
function mapDispatchtoProps(dispatch) {
  return {
    updatedData: data => {
      dispatch(allAction.dashboardAction(data));
    },
    dellData: data => {
      dispatch(allAction.dellTransaction(data));
    },
    updateData: data => {
      dispatch(allAction.updatedAmount(data));
    }
  };
}
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Dashboard);
