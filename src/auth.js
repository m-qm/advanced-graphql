const {AuthenticationError} = require ('apollo-server');

const jwt = require ('jsonwebtoken');
const {models} = require ('./db');
const secret = 'catpack';

const getUserFromToken = token => {
  try {
    const user = jwt.verify (token, secret);
    return models.User.findOne ({id: user.id});
  } catch (e) {
    return null;
  }
};

const authenticated = next => (root, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError ('must authenticate');
  }
  return root, args, context, info;
};

const authorized = (role, next) => (root, args, context, info) => {
  if (!context.user.role !== role) {
    throw new AuthenticationError (`you must have ${role} role`);
  }
  return root, args, context, info;
};

module.exports = {
  getUserFromToken,
  authenticated,
  authorized,
  createToken,
};
