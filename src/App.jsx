import { Route, Routes } from "react-router-dom";
import HomeSection from "./home/HomeSection";
import Navbar from "./home/navBar";
import Whoarewe from "./whoarewe/Whoarewe";
import Whatwedo from "./whatwedo/Whatwedo";
import Contactus from "./contactus/contactUs";
import { Footer } from "./home/ctaandfooter";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/whoarewe" element={<Whoarewe />} />
        <Route path="/whatwedo" element={<Whatwedo />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;