import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import home from "../../img/home.png";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 container">
			<div className="row">
				<div className="col-0" />
				<div className="col-12">
					<div className="card">
						<div className="row p-5">
							<div className="col-sm">
								<h1>Welcome</h1>
								<img src={home} />
							</div>
							<div className="col-sm">
								<div className="alert alert-info">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
								</div>
								<div className="d-flex flex-column bd-highlight mb-3">
									<Link to="/register">
										<button type="button" className="btn btn-primary btn-lg btn-block mb-3 mt-5">
											Create Account
										</button>
									</Link>
									<Link to="/login">
										<button type="button" className="btn btn-outline-primary btn-lg btn-block">
											Login
										</button>
									</Link>
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
