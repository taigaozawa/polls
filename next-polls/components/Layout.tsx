import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = props => {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gray-100 pb-5">{props.children}</main>
      <Footer />
    </div>
  )
};

export default Layout;