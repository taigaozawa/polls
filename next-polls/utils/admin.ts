import admin from 'firebase-admin';

const serviceAccount = JSON.stringify({
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT, URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
});

const adminApp = admin.apps.length ?
  admin.app('admin')
  :
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount))
  }, 'admin')

export default adminApp;