class allAction {
  static signup_User = 'signup_User';
  static login_User = 'login_User';
  static dashboard_Action = 'dashboard_Action';
  static DELL_TRANSACTION = 'DELL_TRANSACTION';
  static UPDATED_AMOUNT = 'UPDATED_AMOUNT';
  static loginUser1time="login_User1time"
  static updatedAmount(data) {
    return {
      type: this.UPDATED_AMOUNT,
      data
    };
  }
  static dellTransaction(data) {
    return {
      type: this.DELL_TRANSACTION,
      data
    };
  }
  static dashboardAction(data) {
    return {
      type: this.dashboard_Action,
      data
    };
  }
  static signupUser(data) {
    return {
      type: this.signup_User,
      data
    };
  }
  // login_User1time
  static loginUser(data) {
    debugger
    return {
      type: this.login_User,
      data
    };
  }
  static login_User1time(data) {
    return {
      type: this.loginUser1time,
      data
    };
  }
}
export default allAction;
