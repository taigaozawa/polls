import { login } from '../utils/auth';
import Container from './Container';
import { useAuthContext } from '../utils/AuthContext';
import { useState } from 'react';
import LogoutModal from './LogoutModal';
import router from 'next/router';

const Header = () => {
  const { currentUser } = useAuthContext();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  return (
    <>
      <header className="pt-2 pb-1">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex items-baseline cursor-pointer" onClick={() => router.push('/polls')}>
              <div className="font-bold text-2xl mr-1">Polls</div>
              <div className="text-sm">投票アプリ</div>
            </div>
            {currentUser ?
              <div
                className="relative"
              >
                <img
                  onClick={() => setShowLogoutModal(!showLogoutModal)}
                  className="cursor-pointer rounded-full border border-gray-100 shadow-sm w-8" src={currentUser.photoURL?.toString()} alt={currentUser.displayName?.toString()} />
                <div className="absolute right-0 z-20">
                  {showLogoutModal && <LogoutModal currentUserName={currentUser.displayName || ''} />}
                </div>
              </div>
              :
              <div
                onClick={() => login()}
                className="cursor-pointer bg-gray-700 rounded-full text-white py-1 px-2 text-sm">
                ログイン
        </div>
            }
          </div>
        </Container>
        {showLogoutModal &&
          <div
            onClick={() => { setShowLogoutModal(false) }}
            className="fixed top-0 left-0 w-screen h-screen z-10"></div>}
      </header>
    </>
  )
}

export default Header;