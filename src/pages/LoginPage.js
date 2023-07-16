import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const URL = "http://localhost:8000/"

async function sendRequestToServer(data, header) {
    try {
        const response = await fetch(URL + header, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            // Handle server errors
            throw new Error(`Request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        
        // Handle the response data from the server
        console.log(responseData);
        // Perform further operations with the response data
        return responseData;
    } 
    catch (error) {
    // Handle any errors during the request
    console.error('Error:', error);
    }
    return null;
}

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

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //const navigate = useNavigate();
    let history = useHistory();

    const handleBackClick = () => {
        //navigate('/');
        history.push('/');
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        // Perform authentication logic here

        let data = {
            username: username,
            password: password,
        };

        let response = sendRequestToServer(data, 'login/');
        if (response.success) {
            // profile successfully created.
            // save it in cookie
            let user = {
                username: username,
                password: password,
                credit: response.credit,
            }
            setUserInCookie(user);
        }
        else {
            alert(response.message);
        }

        console.log('Username:', username);
        console.log('Password:', password);
        // Redirect to authenticated page or perform further actions
        //navigate('/');
        history.push('/');
    };

    return (
        <div style={containerStyle}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <label>
            Username:
            <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                style={inputStyle}
            />
            </label>
            <br />
            <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                style={inputStyle}
            />
            </label>
            <br />
            <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <br />
        <button onClick={handleBackClick} type="submit" style={buttonStyle}>Back</button>
        </div>
    );
}

// CSS styles
const containerStyle = {
  width: '300px',
  margin: 'auto',
  marginTop: '100px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f2f2f2',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
};

const buttonStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default LoginPage;
