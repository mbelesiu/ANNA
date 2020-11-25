// auth router attaches /login, /logout, and /callback routes to the baseURL

const configAuthO = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env and you should probably change me :)',
  baseURL: 'FILL_ME_IN',
  clientID: 'FILL_ME_IN',
  issuerBaseURL: 'FILL_ME_IN'
};

module.exports = configAuthO;