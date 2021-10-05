import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Register = () => {
	const { store, actions } = useContext(Context);

	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [cityIdSelected, setCityIdSelected] = useState(0);

	const [newCountry, setNewCountry] = useState("");
	const [newCity, setNewCity] = useState("");

	useEffect(() => {
		loadCountries();
	}, []);

	async function loadCountries() {
		const countries = await fetch("https://3001-blue-crab-x7645bs6.ws-eu18.gitpod.io/api/countries").then(
			response => response.json()
		);

		setCountries(countries);
	}

	async function countryChanged(event) {
		const countryIdSelected = event.target.value;

		const cities = await fetch(
			`https://3001-blue-crab-x7645bs6.ws-eu18.gitpod.io/api/countries/${countryIdSelected}/cities`
		).then(response => response.json());

		setCities(cities);
	}

	async function cityChanged(event) {
		const cityIdSelected = event.target.value;

		setCityIdSelected(cityIdSelected);
	}

	async function createCity(countryId, cityName) {
		return await fetch(
			"https://3001-blue-crab-x7645bs6.ws-eu18.gitpod.io/api/countries/${countryId}/cities/create",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: cityName
				})
			}
		).then(response => response.json());
	}

	async function createCountry(countryName) {
		return await fetch("https://3001-blue-crab-x7645bs6.ws-eu18.gitpod.io/api/countries/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: countryName
			})
		}).then(response => response.json());
	}

	async function createUser() {
		let cityCreated = null;
		if (newCountry !== "" && newCity !== "") {
			const country = await createCountry(newCountry);
			cityCreated = await createCity(country.id, newCity);
		}

		let userCityId = cityIdSelected;
		if (!cityIdSelected && cityCreated) {
			userCityId = cityCreated.id;
		}

		const user = await fetch("https://3001-blue-crab-x7645bs6.ws-eu18.gitpod.io/api/users/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password,
				city_id: userCityId
			})
		}).then(response => response.json());
	}

	/* return (
		<div className="text-center mt-5">
			<button onClick={createUser}>Save</button>

			<input
				type="text"
				onChange={event => {
					setEmail(event.target.value);
				}}
			/>

			<input
				type="password"
				onChange={event => {
					setPassword(event.target.value);
				}}
			/>

			<select onChange={countryChanged}>
				<option>Sin País</option>
				{countries.map(country => {
					return (
						<option key={country.id} value={country.id}>
							{country.name}
						</option>
					);
				})}
			</select>

			<select onChange={cityChanged}>
				<option>Sin Ciudad</option>
				{cities.map(city => {
					return (
						<option key={city.id} value={city.id}>
							{city.name}
						</option>
					);
				})}
			</select>
		</div>
	); */

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
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="inputEmail4">Email</label>
											<input
												type="email"
												onChange={event => {
													setEmail(event.target.value);
												}}
												className="form-control"
												id="inputEmail4"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputPassword4">Password</label>
											<input
												type="password"
												onChange={event => {
													setPassword(event.target.value);
												}}
												className="form-control"
												id="inputPassword4"
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="inputCountry">Country</label>
											<select
												onChange={countryChanged}
												id="inputCountry"
												className="form-control">
												<option selected>Choose...</option>
												{countries.map(country => {
													return (
														<option key={country.id} value={country.id}>
															{country.name}
														</option>
													);
												})}
											</select>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputCity">City</label>
											<select onChange={cityChanged} id="inputCity" className="form-control">
												<option selected>Choose...</option>
												{cities.map(city => {
													return (
														<option key={city.id} value={city.id}>
															{city.name}
														</option>
													);
												})}
											</select>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="inputNewCountry">Add Country</label>
											<input type="text" className="form-control" id="inputNewCountry" />
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputNewCity">Add City</label>
											<input type="text" className="form-control" id="inputNewCity" />
										</div>
									</div>

									<button
										onClick={createUser}
										type="submit"
										className="btn btn-primary btn-lg btn-block mb-3 mt-5">
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
