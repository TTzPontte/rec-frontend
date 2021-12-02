import { Auth } from '@aws-amplify/auth';

export const logIn = () => {
  const config = Auth.configure();
  const { domain, redirectSignIn, responseType } = config.oauth;
  const clientId = config.userPoolWebClientId;

  const urlToGoogle = `https://${domain}/oauth2/authorize?redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}&identity_provider=Google`;
  window.location.assign(urlToGoogle);
};

export const logOut = async () => {
  await Auth.signOut();
};

export const getUserSession = async () => {
  try {
    const cognito = await Auth.currentSession();

    const idToken = cognito.getIdToken();

    const awsToken = idToken.getJwtToken();

    const { name, email, picture } = idToken.payload;

    return {
      user: {
        name,
        email,
        picture,
      },
      token: awsToken,
    };
  } catch (e) {
    throw new Error('Não foi possível localizar a sessão do usuário');
  }
};
