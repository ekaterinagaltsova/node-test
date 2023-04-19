const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

// Call this function to validate the JWT credential sent from client-side
async function verifyCredentials(credential) {
  const ticket = await client.verifyIdToken({
    idToken: credential,
  });
  const payload = ticket.getPayload();
  return payload;
}

module.exports = verifyCredentials;
