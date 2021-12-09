import { Auth } from "@aws-amplify/auth";

export const logInGoogle = () => {
  const config = Auth.configure();
  const { domain, redirectSignIn, responseType } = config.oauth;
  const clientId = config.userPoolWebClientId;

  const urlToGoogle = `https://${domain}/oauth2/authorize?redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}&identity_provider=Google`;
  window.location.assign(urlToGoogle);
};

export const logOutGoogle = async () => Auth.signOut();

export const getUserSession = async () => {
  try {
    const cognito = await Auth.currentSession();

    const identityToken = cognito.getIdToken()

    const { name, email, picture } = identityToken.payload;

    const tokenId = identityToken.payload;
    const accessToken = cognito.getAccessToken().getJwtToken();

    return {
      user: {
        name,
        email,
        picture,
      },
      tokenId,
      accessToken,
    };
  } catch {
    return {};
  }
};
