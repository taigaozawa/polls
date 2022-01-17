import admin from 'firebase-admin';
import {cert} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
const serviceAccount = require('../serviceAccountKey.json');

const adminFirebaseApp = admin.initializeApp({
  credential: cert(serviceAccount),
}, 'admin');

export const db = getFirestore(adminFirebaseApp);