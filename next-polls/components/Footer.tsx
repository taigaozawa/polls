import Router from "next/router";
import Container from "./Container";

const Footer = () => {
  return (
    <>
    <div className="pt-2 pb-4 bg-gray-200">
    <Container>
    <footer className="flex justify-between items-baseline">
      <div className="flex items-baseline cursor-pointer" onClick={() => Router.push('/polls')}>
        <div className="font-bold mr-1 text-lg">Polls</div>
        <div className="text-xs">投票アプリ</div>
      </div>
      <div 
      className="cursor-pointer text-sm"
      onClick={() => Router.push('https://github.com/taigaozawa/polls')}>GitHub</div>
      </footer>
    </Container>
    </div>
    </>
  )
}

export default Footer;