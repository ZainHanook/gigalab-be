const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");
const { User } = require("../models");

/**
 * Registration Module
 */
const register = catchAsync(async (req, res) => {
  let createUserBody = req.body;
  const user = await authService.createUser(createUserBody);
  res.status(httpStatus.CREATED).send(user);
});

/**
 * Login Module
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  let tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

/**
 * Logout Module
 */
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
};
