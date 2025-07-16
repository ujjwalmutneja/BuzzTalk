// Import necessary components
import Navbar from './components/Home/Navbar.jsx';
import Header from './components/Home/Header.jsx';
import Team from './components/Home/Team.jsx';
import Cta from './components/Home/Cta.jsx';
import Footer from './components/Home/Footer.jsx';
import Service from "./components/Home/Service.jsx";

export default function HomePag() {
  return (
    <div className="HomePage">
      <Navbar />
      <Header />
      <Cta />
      <Service />
      <Team />
      <Footer />
    </div>
  );
}
