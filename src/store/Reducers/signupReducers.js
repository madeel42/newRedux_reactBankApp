import allAction from '../Action/allAction';
let initialData = {
  loggedinUsers: {},
  transactions: [],
  users: []
};
let array = [];
export function login(state = initialData, action) {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case allAction.UPDATED_AMOUNT:
      newState.transactions[action.data.index].amount =
        action.data.updateAmount;
      return newState;
    case allAction.DELL_TRANSACTION:
      if (newState.transactions[action.data.target].nature == 'withdraw') {
        newState.loggedinUsers.user.amount -= -newState.transactions[
          action.data.target
        ].amount;
      } else {
        newState.loggedinUsers.user.amount += -newState.transactions[
          action.data.target
        ].amount;
      }
      const transactions = newState.transactions.filter(
        (value, key) => key != action.data.target
      );
      array = array.filter((value, key) => key != action.data.target);
      return { ...newState, transactions };
    // case allAction.dashboard_Action:
    case allAction.dashboard_Action:
      // console.log('ali', state);
      array.push(action.data);
      console.log(action.data);
      console.log(newState.loggedinUsers.user.amount);
      const userAmount = newState.loggedinUsers.user.amount * 1;
      const addedAmount = action.data.amount * 1;
      if(action.data.nature == 'withdraw'){
      newState.loggedinUsers.user.amount = userAmount - addedAmount;
      }else{
        newState.loggedinUsers.user.amount = userAmount + addedAmount;
      }
      return {
        ...newState,
        transactions: [...array]
        // loggedinUsers.user.amount
        // transactions: [...state.transactions, action.data]
        // transactions: state.transactions, action.data]
      };
    case allAction.signup_User:
      return {
        users: action.data
      };
    // newState.users.push(action.data)transactions
    // return newState;
    case allAction.loginUser1time:
      return {
        ...state,
        loggedinUsers: action.data
      };
    case allAction.login_User:
      state.loggedinUsers.user = action.data;
      return {
        ...state,
        loggedinUsers: action.data
      };
    // let userFound = newState.users.find(user => {
    //   return user.username == action.data.username;
    // });
    // if (userFound) {
    //   newState.loggedinUsers = userFound;
    //   alert('user found');
    //   return newState;
    // } else {
    //   alert('not found');
    // }
  }
  return newState;
}
