import React, { Component } from 'react'

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

export default class ProfilePage extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user : JSON.parse(getUserCookie()),
            name  : this.user.username,
            money : this.user.credit,
            newcharge : 10000,
            useotherval : false,
            userinput : ""
        }
        
    }

    
    handleCharge = (event) => {
        
        this.setState({newcharge : event.target.value})

        if (event.target.value == 0) {
            this.setState({useotherval : true})

        } else{
            this.setState({useotherval : false})
        }
    }

    handleinput = event => {
        this.setState({userinput : event.target.value})
    }

    charge = () =>{
        //send to back
        console.log("clicked");
        let data = {
            username: this.state.name,
            credit: parseInt(this.state.userinput),
        };
        let response = sendRequestToServer(data, 'add-credit/');
        alert(response.message);
        if (response.credit > 0) {
            let user = {
                username: user.username,
                password: user.password,
                credit: user.credit + response.credit,
            };
            setUserInCookie(user);
            this.setState({user: user});
        }
    }

  render() {

    return (
       
      <div  className = "profile content-around">
        <h1 className='bg-gray-300 bg-opacity-50  rounded-lg pt-5'>
            welcome {this.state.name} have a nice trip!
        </h1>
        <p className='bg-gray-300 bg-opacity-50  rounded-lg pt-5'>
            your money is  {this.state.money}
        </p>

        <label> charge your account</label>
        <br></br>
        <label className='bg-gray-300 bg-opacity-50  rounded-lg pt-5'> amount to charge</label>

        <select onChange={this.handleCharge} value={this.state.newcharge} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value='10000'>1 000 000</option>
            <option value='50000'>5 000 000</option>
            <option value='100000'>10 000 000</option>
            <option value='0'>other amount</option>
        </select>

        { this.state.useotherval &&
        <>
        <label>
         how much you want to charge:
        </label>

        <input type="text" value={this.state.userinput} onChange={this.handleinput} className= "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">

        </input>
        </>
        }   

        

        <button class="btn-primary" onClick={this.charge}>
        charge
        </button>

  
      </div>
    )
  }
}
