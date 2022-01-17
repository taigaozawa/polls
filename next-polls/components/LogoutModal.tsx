import { logout } from "../utils/auth";

interface Props {
  currentUserName: string;
}

const LogoutModal = (props:Props) => {
  return (
    <>
    <div className="flex w-48 flex-col px-2 shadow rounded-md bg-gray-800 py-2 text-white cursor-default">
      <div className="pb-1 border-b border-white">{props.currentUserName} でログイン中</div>
      <div className="pt-2 cursor-pointer" onClick={() => logout()}>ログアウト</div>
    </div>
    </>
  )
}

export default LogoutModal;