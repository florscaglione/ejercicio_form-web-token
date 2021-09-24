import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar sticky-top navbar-light bg-light mb-3">
			<div className="container d-flex justify-content-between">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Web Form</span>
				</Link>
				<div className="ml-auto">
					<Link to="/userInfo">
						<button className="btn btn-primary">User Info</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
