class Validations {
  constructor() {}

  //EmailValidation
  emailValidation(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  //PasswordValidation
  passwordValidation(password) {
    if (password != '') {
      return true;
    } else {
      return false;
    }
  }
}
export default Validations;
