import firebaseApp from './firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  signInWithCustomToken,
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const login = () => {
  const auth = getAuth(firebaseApp);
  signInWithRedirect(auth, provider);
}
export const logout: (() => Promise<void>) = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}