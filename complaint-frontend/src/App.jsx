import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import AuthPage from "./components/AuthPage/AuthPage.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home.jsx";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;