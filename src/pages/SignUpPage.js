import React, { useState } from 'react';
//import {useNavigate} from 'react-router-dom';
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

function SignUpPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatePassword, setRepeatPassword] = useState('');
    let history = useHistory();
    //const navigate = useNavigate();

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

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        // todo: check if username already exists in database
        // todo: save user's information in database
        // Perform authentication logic here
        console.log('Username:', username);
        
        console.log('Password:', password);

        console.log('Repeated Password:', repeatePassword);

        let data = {
            username: username,
            password: password,
        };
        // send a request to the back-end to save this user's information in database
        fetch('http://localhost:8000/sign-up', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response != null) {
                    console.log(response)
                    return response.json()
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
                        credit: 10000,
                    }
                    setUserInCookie(user);
                }
            })
            .catch(error => {
                console.error('An error occurred while sending form data:', error);
            });

        // Redirect to authenticated page or perform further actions
        history.push('/');
    };

    return (
        <div className="login font-serif">
        <div style={containerStyle}>
        <h2 className='text-center'>SignUp</h2>
        <form onSubmit={handleSignUp}>
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
            <label>
                Repeat Password:
                <input
                    type="password"
                    value={repeatePassword}
                    onChange={handleRepeatPasswordChange}
                    style={inputStyle}
                    className="rounded-lg"
                />
            </label>
            <br />
            <button type="submit" className='btn-primary' style={buttonStyle}>Sign Up</button>
        </form>
        <br />
        <button onClick={handleBackClick} className='btn-primary' type="submit" style={buttonStyle}>Back</button>
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
export default SignUpPage;
