import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

import "../../styles/demo.scss";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { store, actions } = useContext(Context);
	const token = localStorage.getItem("token");

	function userLogin() {
		fetch("https://3001-olive-quelea-o5idiswd.ws-eu16.gitpod.io/api/login", {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (resp.status === 200) return resp.json();
				else alert("There has been some error");
			})
			.then(data => {
				console.log("This came from the backend", data);
				localStorage.setItem("token", data.access_token); //access_token es lo que me respondió el token en Postman
			})
			.catch(error => {
				console.error("There was an error!!", error);
			});
	}

	return (
		<div className="text-center mt-5 container">
			<div className="row">
				<div className="col-0" />
				<div className="col-12">
					<div className="card">
						<div className="row p-5">
							<div className="col-4 p-1">
								<h1>Login</h1>
							</div>
							<div className="col-8 pl-5">
								{token && token != "" && token != undefined ? ( //condición TERNARIA (es un if/else "simplificado")
									"You are logged in whit this token" + token
								) : (
									<div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Email address</label>
											<input
												className="form-control"
												type="text"
												placeholder="Email"
												value={email}
												onChange={e => {
													setEmail(e.target.value);
												}}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputPassword1">Password</label>
											<input
												className="form-control"
												type="password"
												placeholder="Password"
												value={password}
												onChange={e => {
													setPassword(e.target.value);
												}}
											/>
										</div>
										<button
											className="btn btn-primary btn-lg btn-block mb-3 mt-5"
											onClick={userLogin}>
											Access
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="col-0" />
			</div>

			<p />

			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
					Read documentation
				</a>
			</p>
		</div>
	);
};
