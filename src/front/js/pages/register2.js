import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Register = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 container">
			<div className="row">
				<div className="col-0" />
				<div className="col-12">
					<div className="card">
						<div className="row p-5">
							<div className="col-4 p-1">
								<h1>Register</h1>
							</div>
							<div className="col-8 pl-5">
								<div>
									<div className="form-group">
										<label htmlFor="inputAddress">Name</label>
										<input type="text" className="form-control" id="inputName" placeholder="John" />
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="inputEmail4">Email</label>
											<input type="email" className="form-control" id="inputEmail4" />
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputPassword4">Password</label>
											<input type="password" className="form-control" id="inputPassword4" />
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="inputCountry">Country</label>
											<select id="inputCountry" className="form-control">
												<option selected>Choose...</option>
												<option>...</option>
											</select>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputCity">City</label>
											<select id="inputCity" className="form-control">
												<option selected>Choose...</option>
												<option>...</option>
											</select>
										</div>
									</div>

									<button type="submit" className="btn btn-primary btn-lg btn-block mb-3 mt-5">
										Register
									</button>
								</div>
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
