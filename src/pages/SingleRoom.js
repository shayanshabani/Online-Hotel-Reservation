//import Hero from "../components/Hero/heroComponent";
import Banner from "../components/banner/banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context/context";
import StyledeHero from "../components/StyledHero/styledHero";
import Image from "../components/ImageComponent/Image";
import {addDays, format} from 'date-fns';
import DateCell from "../components/DateCell/DateCell";
import React, { useState, useEffect, useContext } from 'react';


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
        let userString = cookie.substring(cookieName.length);
        if (userString == '') {
            removeUserCookie();
            break;
        }
        else {
            return userString;
        }
      }
  }
  return null;
}

function removeUserCookie() {
  // set the expiration time to a past date and then it will be deleted automatically
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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


const SingleRoom = (props) => {
  const { getRoom } = useContext(RoomContext);
  const [slug, setSlug] = useState(props.match.params.slug);
  const [defaultBcg, setDefaultBcg] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState(new Set());
  const [unavailablePlaces, setUnavailablePlaces] = useState(new Set(getUnavailable(props.match.params.slug)));
  const [user, setUser] = useState(getUserCookie());

  useEffect(() => {
    setSlug(props.match.params.slug);
    setUnavailablePlaces(new Set(getUnavailable(props.match.params.slug)));
    setUser(getUserCookie());
  }, [props.match.params.slug]);

  const toggle = (src) => {
    setDefaultBcg(src);
  };

  const handleReserveClick = () => {
    setShowTable(true);
  };

  const handlePlaceClick = (place) => {
    if (unavailablePlaces.has(place)) {
      return;
    }

    const updatedSelectedPlaces = new Set(selectedPlaces);

    if (updatedSelectedPlaces.has(place)) {
      updatedSelectedPlaces.delete(place);
    } else {
      updatedSelectedPlaces.add(place);
    }

    setSelectedPlaces(updatedSelectedPlaces);
  };

  const handleBuyClick = () => {
    const startDate = new Date();
    const selectedDates = Array.from(selectedPlaces).map((place) =>
      format(addDays(startDate, place), 'MMMM d, yyyy')
    );

    if (user != null) {
      let data = {
        roomId: getRoomId(slug),
        username: user.username,
        dates: Array.from(selectedPlaces),
      };

      fetch('http://localhost:8000/reserve/', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response != null) {
            console.log(response);
            return response.json(); // Extract the response body as JSON
          } else {
            throw new Error('Failed to receive response from Go server');
          }
        })
        .then((data) => {
          alert(data.message);
          if (data.success) {
            let credits = selectedPlaces.size * getRoom(slug).price;
            let updatedUser = {
              username: user.username,
              password: user.password,
              credit: user.credit - credits,
            };
            setUserInCookie(updatedUser);
            setUser(updatedUser);
          }
        })
        .catch((error) => {
          console.error('An error occurred while sending form data:', error);
        });

      console.log('Selected Dates:', selectedDates);

      setUnavailablePlaces(new Set(getUnavailable(slug)));
      setShowTable(false);
      setSelectedPlaces(new Set());
    } else {
      alert('Create an account or login to an existing one first!');
    }
  };

  const handleCancelClick = () => {
    setShowTable(false);
    setSelectedPlaces(new Set());
  };

  const room = getRoom(slug);
  const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
  const [mainImg, ...defaultImg] = images;

  if (!room) {
    return (
      <div className="error">
        <h3>No such room could be found....</h3>
        <Link to="/rooms" className="btn-primary">
          Rooms Page
        </Link>
      </div>
    );
  }

  return (
    <>
      <StyledeHero img={defaultBcg} hero="roomsHero">
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            Rooms Page
          </Link>
        </Banner>
      </StyledeHero>

      <section className="single-room">
        <div className="single-room-images">
          {defaultImg.map((item, index) => (
            <Image toggle={toggle} item={item} key={index} name={name} />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>Details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>Info</h3>
            <h6>Price: ${price}</h6>
            <h6>Size: {size}</h6>
            <h6>Max Capacity: {capacity} person</h6>
            <h6>{pets ? 'Pets Allowed' : 'No Pets Allowed'}</h6>
            <h6>{breakfast && 'Free Breakfast'}</h6>
          </article>
        </div>
      </section>

      <section className="room-extras">
        <h6>Extras</h6>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>-{item}</li>
          ))}
        </ul>
      </section>

      <div className="flex items-center justify-center mb-10 ">
        {!showTable ? (
          <button onClick={handleReserveClick} className="btn-primary">
            Reserve
          </button>
        ) : (
          <div>
            <table className="border-separate border-spacing-y-1 border-spacing-x-2 rounded-lg bg-stone-200">
              {[...Array(30)].map((_, myindex) => {
                if (myindex % 7 !== 0) {
                  return (
                    <DateCell
                      key={myindex}
                      index={myindex}
                      selectedPlaces={selectedPlaces}
                      unavailablePlaces={unavailablePlaces}
                      handlePlaceClick={handlePlaceClick}
                    />
                  );
                } else {
                  return (
                    <>
                      <tr></tr>
                      <DateCell
                        key={myindex}
                        index={myindex}
                        selectedPlaces={selectedPlaces}
                        unavailablePlaces={unavailablePlaces}
                        handlePlaceClick={handlePlaceClick}
                      />
                    </>
                  );
                }
              })}
            </table>

            <div className="space-x-4 flex justify-center items-center mt-5">
              <button
                onClick={handleBuyClick}
                className="btn-primary"
                disabled={selectedPlaces.size === 0}
              >
                Buy
              </button>
              <button onClick={handleCancelClick} className="btn-primary">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};



export default SingleRoom;
