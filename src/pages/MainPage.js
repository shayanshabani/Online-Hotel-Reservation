
import React from 'react';
import Hero from "../components/Hero/heroComponent";
import Banner from "../components/banner/banner";
import Services from "../components/services/ServicesComponent";
import FeaturedRoom from "../components/FeaturedRoom/featuredRoom.component";
import {Link} from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <Hero>
        <Banner title="luxurious hotel" subtitle="luxurious rooms in available for customers from all around the world">
          <Link to="rooms" className="btn-primary">
            Rooms
          </Link>
        </Banner>
      </Hero>
      <Services></Services>
      <FeaturedRoom></FeaturedRoom>
    </>
  );
}

export default MainPage;
