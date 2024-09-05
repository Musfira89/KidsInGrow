import React from "react";
import Navbar from "./Navigation/Navbar";
import Hero from "./Hero/Hero";
import Activity from "./Activity/Activity";
import Services from "./Services Cards/Services";
import ChooseUs from "./WhyChooseUs/ChooseUs";
import Faq from "./FAQ/Faq";
import Footer from "./Footer/Footer";
import Bot from "../components/dashboard/ChatBot/Bot";
import UniqueSection from "./UniqueSection/UniqueSection";
import Demo from "./ProjectDemo/Demo";

const Home = () => {
  return (
    <>
      <div>
        <Navbar/>
      <div id="home">
        <Hero />
      </div>
      <Demo/>
      <div id="Activity">
        <Activity />
      </div>
      <UniqueSection/>

      <div id="Services">
        <Services />
      </div>
      <div id="faq">
        <Faq />
      </div>
      <div id="about">
        <ChooseUs />
      </div>
      <Footer />
    </div>
    <Bot />
    </>
  );
};

export default Home;
