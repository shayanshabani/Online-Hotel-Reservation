import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
        // send a request to back-end to authenticate this user
        fetch('http://localhost:8000/login', {
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
            const message = data.message; // Extract the message text from the response JSON
            alert(message); // Display the message text in an alert dialog
            if (data.success) {
                let user = {
                    username: username,
                    password: password,
                    credit: data.credit,
                }
                setUserInCookie(user);
            }
        })
        .catch(error => {
            console.error('An error occurred while sending form data:', error);
        });
        //navigate('/');
        history.push('/');
    };

    return (
        <div className="login font-serif">
        <div style={containerStyle} >
        <h2 className='text-center'>Login</h2>
        <form onSubmit={handleLogin}>
            <label>
            Username:
            <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                style={inputStyle}
                className="rounded-lg"
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
                className="rounded-lg"
            />
            </label>
            <br />
            <button type="submit" className='btn-primary' style={buttonStyle}>Login</button>
        </form>
        <br />
        <button onClick={handleBackClick} type="submit" className='btn-primary' style={buttonStyle}>Back</button>
        </div>
        </div>
    );
}

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

export default LoginPage;
