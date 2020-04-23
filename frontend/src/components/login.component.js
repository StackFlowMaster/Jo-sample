import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';  
import axios from "axios";

export default class Login extends Component {
	state={
		username:'',
		password:'',
		usernameError: '',
		passwordError: ''
	}

	inputChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value })

		if (name == 'username' && this.state.username.length > 0) {
			this.setState({usernameError: ""})
		}
		
		if (name == 'password' && this.state.password.length > 8) {
			this.setState({passwordError: ""})
		}
	}

	handleClick = (e) => {
    	let apiBaseUrl = "http://localhost:3000/";

		if (this.state.username.length == 0) {
			this.setState({usernameError: "Please input username"})
			return
		}

		if (this.state.password.length == 0) {
			this.setState({passwordError: "Please input password"})
			return
		}

	    let payload={
		    "username": this.state.username,
		    "password":this.state.password
	    }

		let config = {
		    headers: {'Access-Control-Allow-Origin': '*'}
		}
		
	    axios.post(apiBaseUrl+'login', payload)
	    .then(function (response) {
	     	console.log(response);
	     	if(response.status == 200){
	            // store user details and jwt token in local storage to keep user logged in between page refreshes
	            localStorage.setItem('user', JSON.stringify(response.data));

	        	window.location.href = '/dashboard'
	     	} else {
	     		alert(response.data.error);
	     	}
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});

	}


    render() {
    	const { username, password, usernameError, passwordError } = this.state
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>

                    <input type="text" name="username" className="form-control" placeholder="Enter username"
                     onChange = {this.inputChange} />

					<div style={{ color: "red", fontSize: "12px" }}>
						{this.state.usernameError}
					</div>
                </div>

                <div className="form-group">
                    <label>Password</label>

                    <input type="password" name="password" className="form-control" placeholder="Enter password" 
                     onChange = {this.inputChange} />

					<div style={{ color: "red", fontSize: "12px" }}>
						{this.state.passwordError}
					</div>
                </div>

                <button type="button" className="btn btn-primary btn-block" 
                onClick={e => this.handleClick(e)}>Sign In</button>

            </form>
        );
    }
}