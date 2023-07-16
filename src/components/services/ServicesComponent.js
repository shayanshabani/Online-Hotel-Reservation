import React, { Component } from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

import Title from "../Title/title";
export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free coctails",
        info: "various jucy coctails are served 24 hours a day",
      },
      {
        icon: <FaHiking />,
        title: "endless hiking",
        info: "Having a great time hiking and enjoying the beautiful view",
      },
      {
        icon: <FaShuttleVan />,
        title: "free shuttleVan",
        info: "Travel all around the city with free shuttleVan",
      },
      {
        icon: <FaBeer />,
        title: "free Beer",
        info: "Can't say no to magic beer here, strongly recommend to drink free beer here",
      },
    ],
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((service, index) => {
            return (
              <article key={index} className="service">
                <span>{service.icon}</span>
                <h6>{service.title}</h6>
                <p>{service.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
