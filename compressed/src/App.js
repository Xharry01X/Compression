import React from "react"
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from "./component/homepage/Homepage";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import CompressFile from "./component/compress/Compress";
import Download from "./component/download/Download";

function App() {
  return (
    <>
    <Header/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/compress_file" element={<CompressFile/>}/>
      <Route path="/download" element={<Download/>}/>
    </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
