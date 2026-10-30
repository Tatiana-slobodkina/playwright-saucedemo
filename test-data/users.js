// @ts-check
const { LOGIN_ERRORS } = require('./texts');

const PASSWORD = 'secret_sauce';

const STANDARD_USER = { username: 'standard_user', password: PASSWORD };
const LOCKED_OUT_USER = { username: 'locked_out_user', password: PASSWORD };

const INVALID_LOGINS = [
  { title: 'empty username and password', username: '', password: '', message: LOGIN_ERRORS.USERNAME_REQUIRED },
  { title: 'empty password', username: STANDARD_USER.username, password: '', message: LOGIN_ERRORS.PASSWORD_REQUIRED },
  { title: 'wrong password', username: STANDARD_USER.username, password: 'wrong', message: LOGIN_ERRORS.WRONG_CREDENTIALS },
];

module.exports = { STANDARD_USER, LOCKED_OUT_USER, INVALID_LOGINS };
