import React, { Component } from "react";
import Hero from "../components/Hero/heroComponent";
import Banner from "../components/banner/banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context/context";
import StyledeHero from "../components/StyledHero/styledHero";
import Image from "../components/ImageComponent/Image";
import {addDays, format} from 'date-fns';
import DateCell from "../components/DateCell/DateCell";

function setUserInCookie(user) {
  const expirationDate = new Date();
  // expire after 7 days
  expirationDate.setDate(expirationDate.getDate() + 7);
  const cookieValue = encodeURIComponent(user);
  const cookieName = "user";
  const cookieOptions = {
      expires: expirationDate.toUTCString(),
      path: "/"
  };
  document.cookie = `${cookieName}=${cookieValue}; ${Object.entries(cookieOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ")}`;
}

function getUserCookie() {

  const cookieName = "user=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  // find the value with key: "user"
  for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.startsWith(cookieName)) {
          return cookie.substring(cookieName.length);
      }
  }
  return null;
}
// get the id of a room based on its name
function getRoomId(slug) {
  switch(slug) {
    case "single-economy":
      return 1;
    case "single-basic":
      return 2;
    case "single-standard":
      return 3;
    case "single-deluxe":
      return 4;
    case "double-economy":
      return 5;
    case "double-basic":
      return 6;
    case "double-standard":
      return 7;
    case "double-deluxe":
      return 8;
    case "family-economy":
      return 9;
    case "family-basic":
      return 10;
    case "family-standard":
      return 11;
    case "family-deluxe":
      return 12;
    case "presidential-room":
      return 13;
  }
}

function getUnavailable(slug) {
  let data = {
    roomId: getRoomId(slug),
  }
  // send a request to back-end to get the already reserved times of this room
  fetch('http://localhost:8000/unavailable-dates/', {
      method: 'POST',
      body: JSON.stringify(data),
  })
  .then(response => {
      if (response != null) {
          console.log(response)
          return response.json(); // Extract the response body as JSON
      } else {
          throw new Error('Failed to receive response from Go server');
      }
  })
  .then(data => {
      return data.dates;
  })
  .catch(error => {
      console.error('An error occurred while sending form data:', error);
  });
  return null;
}

class SingleRoom extends Component {
  static contextType = RoomContext;
  
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: "",
      showTable: false,
      selectedPlaces: new Set(),
      unavailablePlaces: new Set(getUnavailable(this.props.match.params.slug)),
      user: getUserCookie(),
    };
  }

  toggle = (src) => {
    this.setState({ defaultBcg: src });
  };

  handleReserveClick = () => {
    this.setState({ showTable: true });
  };
  // if press on a date, add it, if press one more time, remove it
  handlePlaceClick = (place) => {
    const { selectedPlaces, unavailablePlaces } = this.state;
    const updatedSelectedPlaces = new Set(selectedPlaces);

    if (unavailablePlaces.has(place)) {
      return;
    }

    if (updatedSelectedPlaces.has(place)) {
      updatedSelectedPlaces.delete(place);
    } 
    else {
      updatedSelectedPlaces.add(place);
    }

    this.setState({ selectedPlaces: updatedSelectedPlaces });
  };

  handleBuyClick = () => {
    // Convert the set of selected places to the next 30 days from now
    const startDate = new Date();
    const selectedDates = Array.from(this.state.selectedPlaces).map((place) =>
      format(addDays(startDate, place), 'MMMM d, yyyy')
    );
    if (this.state.user != null) {

      let data = {
        roomId: getRoomId(this.slug),
        username: this.state.user.username,
        dates: Array.from(this.state.selectedPlaces),
      };
      // send a request to the back-end to reserve this times for this user
      fetch('http://localhost:8000/reserve/', {
          method: 'POST',
          body: JSON.stringify(data),
      })
      .then(response => {
          if (response != null) {
              console.log(response)
              return response.json(); // Extract the response body as JSON
          } else {
              throw new Error('Failed to receive response from Go server');
          }
      })
      .then(data => {
          alert(data.message);
          if (data.success) {
              let credits = this.state.selectedPlaces.size * this.context.getRoom(this.state.slug).price;
              let user = {
                username: this.state.user.username,
                password: this.state.user.password,
                credit: this.state.user.credit - credits,
              }
              setUserInCookie(user);
          }
      })
      .catch(error => {
          console.error('An error occurred while sending form data:', error);
      });

      console.log('Selected Dates:', selectedDates);
      
      this.setState({unavailablePlaces: new Set(getUnavailable(this.slug))});

      this.setState({showTable: false});
      this.setState({selectedPlaces: new Set()});
    }
    else {
      alert('Create an account or login to an existing one first!');
    }
  };
  // just quit the reservation process
  handleCancelClick = () => {
    this.setState({showTable: false});
    this.setState({selectedPlaces: new Set()});
  }

  render() {
    console.log("slug", this.state.slug);
    const room = this.context.getRoom(this.state.slug);
    const { showTable, selectedPlaces, unavailablePlaces } = this.state;

    if (!room) {
      return (
        <div className="error">
          <h3>no such room could be found....</h3>
          <Link to="/rooms" className="btn-primary">
            Rooms Page
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images,
      
    } = room;
    const [mainImg, ...defaultImg] = images;
    return (
      <>
        <StyledeHero img={this.state.defaultBcg} hero="roomsHero">
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              Rooms Page
            </Link>
          </Banner>
        </StyledeHero>
        
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index) => (
              <Image toggle={this.toggle} item={item} key={index} name={name} />
            ))}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>detais</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3> info</h3>
              <h6> price : ${price}</h6>
              <h6> size : {size}</h6>
              <h6> max capacity :{capacity} person</h6>
              <h6> {pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6> {breakfast && "free breackfast"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6> extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>-{item}</li>;
            })}
          </ul>
        </section>
        <div className="flex items-center justify-center mb-10 ">
        {!showTable ? (
          <button
            onClick={this.handleReserveClick}
            className="btn-primary"
          >
            Reserve
          </button>
        ) : (
          <div>
            <table className="border-separate border-spacing-y-1 border-spacing-x-2 rounded-lg bg-stone-200" >
              
                {[...Array(30)].map((_, myindex) => {
                if (myindex%7 != 0){
                return(
                  <DateCell index={myindex} selectedPlaces={selectedPlaces} unavailablePlaces={unavailablePlaces} handlePlaceClick={this.handlePlaceClick} />
                  )
                }
                else{
                return(
                  <>
                  <tr></tr>
                  <DateCell index={myindex} selectedPlaces={selectedPlaces} unavailablePlaces={unavailablePlaces} handlePlaceClick={this.handlePlaceClick} />
                  </>
                )
                }

              }
                )
              }
              
            </table>

            <div className="space-x-4 flex justify-center items-center mt-5">
                <button
                  onClick={this.handleBuyClick}
                  className="btn-primary"
                  disabled={selectedPlaces.size === 0}
                >
                  Buy
                </button>
                <button
                  onClick={this.handleCancelClick}
                  className="btn-primary"
                >
                  Cancel
                </button>
            </div>

          </div>
        )}
        </div>
      </>
    );
  }
}

export default SingleRoom;
