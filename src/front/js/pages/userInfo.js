import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const UserInfo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 container">
			<div className="row">
				<div className="col-0" />
				<div className="col-12">
					<div className="card">
						<div className="row p-5">
							<div className="col-4 p-1">
								<h1>User Info</h1>
							</div>
							<div className="col-8 pl-5">
								<div className="alert alert-info">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
								</div>
								<table className="table">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">User Info</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">Name</th>
											<td>Mark</td>
										</tr>
										<tr>
											<th scope="row">Email</th>
											<td>mark@gmail.com</td>
										</tr>
										<tr>
											<th scope="row">Password</th>
											<td>***********</td>
										</tr>
										<tr>
											<th scope="row">City</th>
											<td>Madrid</td>
										</tr>
										<tr>
											<th scope="row">Country</th>
											<td>Spain</td>
										</tr>
									</tbody>
								</table>
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
