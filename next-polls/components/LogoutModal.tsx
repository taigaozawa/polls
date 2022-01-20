import { logout } from "../utils/auth";

interface Props {
  currentUserName: string;
}

const LogoutModal = (props:Props) => {
  return (
    <>
    <div className="flex text-sm w-auto flex-col px-2 shadow rounded-md bg-black py-2 text-white cursor-default">
      <div className="pb-1 whitespace-nowrap border-b border-white">{props.currentUserName} でログイン中</div>
      <div className="pt-2 cursor-pointer" onClick={() => logout()}>ログアウト →</div>
    </div>
    </>
  )
}

export default LogoutModal;