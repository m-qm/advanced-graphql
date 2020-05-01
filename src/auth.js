const {AuthenticationError} = require ('apollo-server');

const jwt = require ('jsonwebtoken');
const {models} = require ('./db');
const secret = 'catpack';

const authenticated = next => (root, args, context, info) => {
  if (!context.user) {
    throw new Error ('not authorized');
  }
  return root, args, context, info;
};

const authorized = (role, next) => (root, args, context, info) => {
  if (!context.user.role !== role) {
    throw new Error ('not authorized');
  }
  return root, args, context, info;
};
