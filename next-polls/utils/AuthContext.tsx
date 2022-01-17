import { User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { FC, createContext, useEffect, useState, useContext } from 'react';
import firebaseApp from './firebase';

type AuthContextProps = {
  currentUser: User | null | undefined
}
interface Props {}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider:FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User|null>();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    })
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider }
