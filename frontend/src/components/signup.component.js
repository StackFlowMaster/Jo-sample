import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';  
import axios from "axios";

export default class SignUp extends Component {

	state={
		username:'',
		email: '',
		password:'',
		usernameError: '',
		emailError: '',
		passwordError: ''
	}

	inputChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value })

		if (name == 'username' && this.state.username.length > 0) {
			this.setState({usernameError: ""})
		}
		
		if (name == 'email' && this.state.email.length > 0) {
			this.setState({emailError: ""})
		}

		if (name == 'password' && this.state.password.length < 8) {
			this.setState({passwordError: "Password is long than 8 characters"})
		} else {
			this.setState({passwordError: ""})
		}

	}

	handleClick = (e) => {
    	let apiBaseUrl = "http://localhost:3000/";

		if (this.state.username.length == 0) {
			this.setState({usernameError: "Please input username"})
			return
		}

		if (this.state.email.length == 0) {
			this.setState({emailError: "Please input email address"})
			return
		}

		if (this.state.password.length == 0) {
			this.setState({passwordError: "Please input password"})
			return
		}

	    let payload={
		    "username": this.state.username,
		    "email":this.state.email,
		    "password":this.state.password
	    }


		let config = {
		    headers: {'Access-Control-Allow-Origin': '*'}
		}
		
	    axios.post(apiBaseUrl+'users', payload)
	    .then(function (response) {
	     	console.log(response);
	     	if(response.status == 200){
	       		alert("registration successfull");
	        	window.location.href = '/sign-in'
	     	} else {
	     		alert(response.data.error);
	     	}
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});

	}

    render() {
    	const { username, email, password, usernameError, emailError, passwordError } = this.state
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Enter username"
                     onChange = {this.inputChange} />

					<div style={{ color: "red", fontSize: "12px" }}>
						{this.state.usernameError}
					</div>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email"
                     onChange = {this.inputChange} />

					<div style={{ color: "red", fontSize: "12px" }}>
						{this.state.emailError}
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
                onClick={e => this.handleClick(e)}>Sign Up</button>

                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}