import React from "react";
import Hero from "../components/Hero/heroComponent";
import Banner from "../components/banner/banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context/context";
import RoomsContainer from "../components/RoomsContainer/RoomsContainer.Component";

const Rooms = () => {
  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="Rooms">
          <Link to="/" className="btn-primary">
            Home Page
          </Link>
        </Banner>
      </Hero>
      <RoomsContainer />
    </>
  );
};

export default Rooms;