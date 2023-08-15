export const AuthorizationToLoginPayload = (
  authorization: string
) => {
  const authorizationSplited = authorization.split('.')

  if (authorization.length < 3 || !authorizationSplited[1]) {
    return undefined;
  }

  return JSON.parse(Buffer.from(authorizationSplited[1], 'base64').toString('ascii'));
}