
class UsersLoginAction extends baseAction {

  async executeMethod() {
    
    try {
      this.setResponse('SUCCESS');
      return {};
    } catch (e) {
      console.log(`Error: API: UsersLogin`, e);
      throw e;
    }
  };

}
module.exports = UsersLoginAction;