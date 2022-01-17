import router from "next/router";
import Container from "./Container";

const Footer = () => {
  return (
    <>
    <div className="py-2">
    <Container>
    <footer className="flex">
      <div className="flex items-baseline cursor-pointer" onClick={() => router.push('/polls')}>
      <div className="font-bold mr-1 text-lg">Polls</div>
      <div className="text-xs">投票アプリ</div>
      </div>
      </footer>
    </Container>
    </div>
    </>
  )
}

export default Footer;