import axios from "axios";
import config from "@iso/config/aws/auth.config";

export const getAppToken = async () => {
  const { domain, region, clientId, clientSecret } = config;

  const url = `https://${domain}.${region}.amazoncognito.com/oauth2/token`;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const encodedData = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const request = {
    method: "POST",
    url,
    headers: {
      Authorization: `Basic ${encodedData}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params,
  };

  try {
    const { access_token, expires_in } = (await axios(request)).data;

    if (!access_token) throw new Error("Client not authenticated");

    return {
      access_token,
      expires_in,
    };
  } catch {
    return {};
  }
};
