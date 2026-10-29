// @ts-check

const PASSWORD = 'secret_sauce';

const STANDARD_USER = { username: 'standard_user', password: PASSWORD };
const LOCKED_OUT_USER = { username: 'locked_out_user', password: PASSWORD };

const INVALID_LOGINS = [
  { title: 'empty username and password', username: '', password: '', message: 'Epic sadface: Username is required' },
  { title: 'empty password', username: STANDARD_USER.username, password: '', message: 'Epic sadface: Password is required' },
  { title: 'wrong password', username: STANDARD_USER.username, password: 'wrong', message: 'Epic sadface: Username and password do not match any user in this service' },
];

module.exports = { STANDARD_USER, LOCKED_OUT_USER, INVALID_LOGINS };
