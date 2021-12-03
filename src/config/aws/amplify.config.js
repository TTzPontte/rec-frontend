const {
  REACT_APP_USER_POOL_ID,
  REACT_APP_USER_POOL_WEB_CLIENT_ID,
  REACT_APP_USER_POOL_DOMAIN,
  REACT_APP_USER_POOL_REDIRECT_SIGN_IN,
  REACT_APP_USER_POOL_REDIRECT_SIGN_OUT,
} = process.env;

const config = {
  region: "us-east-1",
  userPoolId: REACT_APP_USER_POOL_ID,
  userPoolWebClientId: REACT_APP_USER_POOL_WEB_CLIENT_ID,
  oauth: {
    domain: `${REACT_APP_USER_POOL_DOMAIN}.auth.us-east-1.amazoncognito.com`,
    scope: [
      "phone",
      "email",
      "profile",
      "openid",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: REACT_APP_USER_POOL_REDIRECT_SIGN_IN,
    redirectSignOut: REACT_APP_USER_POOL_REDIRECT_SIGN_OUT,
    responseType: "code",
  },
};

export default config;
