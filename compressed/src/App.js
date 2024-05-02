import React from "react"
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from "./component/homepage/Homepage";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";

function App() {
  return (
    <>
    <Header/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
    </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
