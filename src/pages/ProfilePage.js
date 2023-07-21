import React, { useState, useEffect } from 'react'

// save the object of user in cookie
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
// get the object of user from cookie
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


const ProfilePage = () => {
  const cookie = getUserCookie();
  const [user, setUser] = useState(cookie);
  const [name, setName] = useState(cookie.username);
  const [money, setMoney] = useState(cookie.credit);
  const [newcharge, setNewCharge] = useState(10000);
  const [useOtherVal, setUseOtherVal] = useState(false);
  const [userInput, setUserInput] = useState('');

  // Fetch data when the component mounts
  useEffect(() => {
    const cookie = getUserCookie();
    setUser(cookie);
    setName(cookie.username);
    setMoney(cookie.credit);
  }, []);

  const handleCharge = (event) => {
    setNewCharge(event.target.value);
    setUseOtherVal(event.target.value === '0');
  };

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  const charge = () => {
    //send to back
    console.log('clicked');
    let credit = useOtherVal ? parseInt(userInput) : newcharge;
    let data = {
      username: name,
      credit: credit,
    };

    // send a request to the back-end to increase the user's charge
    fetch('http://localhost:8000/add-credit/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response != null) {
          console.log(response);
          return response.json(); // Extract the response body as JSON
        } else {
          throw new Error('Failed to receive response from the server');
        }
      })
      .then((data) => {
        alert(data.message);
        if (data.credit > 0) {
          let updatedUser = {
            ...user,
            credit: user.credit + data.credit,
          };
          setUserInCookie(updatedUser);
          setUser(updatedUser);
        }
      });
  };

  return (
    <div className="profile font-serif">
      <div style={containerStyle}>
        <h2 className="text-center">Welcome {name}! Have a nice trip!</h2>
        <h4 className="text-center">Your money is {money} $</h4>

        <label className="rounded-lg pt-5">Amount to charge</label>
        <select
          onChange={handleCharge}
          value={newcharge}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="10000">1,000,000</option>
          <option value="50000">5,000,000</option>
          <option value="100000">10,000,000</option>
          <option value="0">Other amount</option>
        </select>

        {useOtherVal && (
          <>
            <label>How much do you want to charge?</label>
            <input
              type="text"
              value={userInput}
              onChange={handleInput}
              style={inputStyle}
              className="rounded-lg"
            />
          </>
        )}

        <br />
        <button onClick={charge} className="btn-primary" type="submit" style={buttonStyle}>
          Charge
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;


// CSS styles
const containerStyle = {
    width: '300px',
    margin: 'auto',
    marginTop: '0px',
    padding: '20px',
    
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f2f2f299',
  };
  
  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
  };
  
  const buttonStyle = {
    
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

