import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';

export default class Dashboard extends Component {
	
	state={
		user: JSON.parse(window.localStorage.getItem('user')),
	}

    render() {
    	const { username, email } = this.state
        return (
            <div>
                <h3>Welcom Dashboard!</h3>

                <div className="form-group">
                    <label>Username</label>
					<div style={{ fontWeight: "bold", fontSize: "18px" }}>
						{this.state.user.username}
					</div>
                </div>

                <div className="form-group">
                    <label>Email</label>
					<div style={{ fontWeight: "bold", fontSize: "18px" }}>
						{this.state.user.email}
					</div>
                </div>

            </div>
        );
    }
}