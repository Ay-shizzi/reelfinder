import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./components/MovieDetail";
import SearchResults from "./components/SearchResults";
import MovieInfo from "./components/MovieInfo";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieName" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:movieName" element={<MovieInfo />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
