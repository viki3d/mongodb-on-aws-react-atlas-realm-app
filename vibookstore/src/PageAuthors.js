import { useEffect, useState, useRef } from "react";
import * as Realm from "realm-web";
import { REALM_APP } from './const';
import Author from './Author';

function PageAuthors() {
	const countries = useRef([]);
	const [countryFilter, setCountryFilter] = useState("");
	const [authors, setAuthors] = useState([]);

	useEffect( () => {
		async function  fetchData() {
			try {
				const credentials = await Realm.Credentials.anonymous();
				const user = await REALM_APP.logIn(credentials);
				let res = await user.functions.getAllCountries();
				countries.current = [""].concat(res);
				//console.log(countries.current);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	
	useEffect( () => {
		async function  fetchData() {
			try {
				const credentials = await Realm.Credentials.anonymous();
				const user = await REALM_APP.logIn(credentials);
				let res = await user.functions.getAuthorsByCountry(countryFilter);
				//console.log(res);
				setAuthors(res);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, [countryFilter]);
	
	return (
		<div className="PageAuthors">
			<h1>Authors</h1>

			<ul className="list-group">
				<li className="list-group-item C bg-success bg-opacity-50">
					<b>filters</b>
				</li>
				<li className="list-group-item bg-light">
					<span className="m-2">Country</span>
					<select value={countryFilter} onChange={ (event) => setCountryFilter(event.target.value) }>
					{ countries.current.map( (c) => <option key={c} value={c}>{c}</option>  ) }
					</select>
				</li>
			</ul>
			<br/>

			<table className="table table-success table-striped table-hover w-50">
				<thead>
					<tr>
						<th>First name</th>
						<th>Last name</th>
						<th>Author</th>
					</tr>
				</thead>
				<tbody>
					{ authors.map( (row) => <Author key={row.id} props={row} /> )  }
				</tbody>
			</table>
			<br/>
		</div>
	);
}

export default PageAuthors;




