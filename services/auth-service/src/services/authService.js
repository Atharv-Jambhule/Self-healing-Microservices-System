const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const users = [];

const register = async ({ email, password }) => {
  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    email,
    password: hashedPassword,
  };

  users.push(user);

  return {
    id: user.id,
    email: user.email,
    token: generateToken(user),
  };
};

const login = async ({ email, password }) => {
  const user = users.find(user => user.email === email);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return {
    id: user.id,
    email: user.email,
    token: generateToken(user),
  };
};

module.exports = {
  register,
  login,
};

const pool = require("../config/db");

const createUser = async (email, password) => {
  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, password]
  );

  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};