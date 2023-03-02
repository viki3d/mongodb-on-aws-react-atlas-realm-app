import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import { REALM_APP } from './const';
import BooksPerAuthor from './BooksPerAuthor';
import BooksPerYear from './BooksPerYear';
 
function PageStats() {
	const [countOfBooksPerAuthor, setCountOfBooksPerAuthor] = useState([]);
	const [countOfBooksPerYear, setCountOfBooksPerYear] = useState([]);
	
	useEffect( () => {
		async function  fetchData() {
			try {
				const credentials = await Realm.Credentials.anonymous();
				const user = await REALM_APP.logIn(credentials);
				let res = await user.functions.getCountOfBooksPerAuthor();
				setCountOfBooksPerAuthor(res);
				res = await user.functions.getCountOfBooksPerYear();
				setCountOfBooksPerYear(res);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);	
	
	return (
		<div>
			<h1>Statistics</h1>
			
			<ul className="list-group w-50 mb-1">
				<li className="list-group-item C bg-success bg-opacity-50">
					<b>Count Of Books per Author</b>
				</li>
			</ul>
			<table className="table table-success table-striped table-hover w-50">
				<thead>
					<tr>
						<th>First name</th>
						<th>Last name</th>
						<th>Country</th>
						<th>Books</th>
					</tr>
				</thead>
				<tbody>
					{ countOfBooksPerAuthor.map( (row) => <BooksPerAuthor key={row.id} props={row} /> )  }
				</tbody>
			</table>
			<br/>
			
			<ul className="list-group w-50 mb-1">
				<li className="list-group-item C bg-success bg-opacity-50">
					<b>Count Of Books per Year</b>
				</li>
			</ul>
			<table className="table table-success table-striped table-hover w-50">
				<thead>
					<tr>
						<th>Year</th>
						<th>Books issued this year</th>
					</tr>
				</thead>
				<tbody>
					{ countOfBooksPerYear.map( (row) => <BooksPerYear key={row.id} props={row} /> )  }
				</tbody>
			</table>
			
		</div>
	);
}

export default PageStats;
