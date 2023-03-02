import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import { REALM_APP } from './const';
import Book from './Book';
import CardBook from './CardBook';
 
function PageBooks() {
	const [books, setBooks] = useState([]);
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	
	useEffect( () => {
		async function  fetchData() {
			try {
				const credentials = await Realm.Credentials.anonymous();
				const user = await REALM_APP.logIn(credentials);
				let res = await user.functions.getAllBooksByAuthor(firstname, lastname);
				setBooks(res);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, [firstname, lastname]);		
	
	return (
		<div className="PageBooks">
			<h1>Books</h1>
			
			<ul className="list-group">
				<li className="list-group-item C bg-success bg-opacity-50">
					<b className="m-2">filters</b>
					<button type="button" 
						className="btn btn-outline-success btn-sm"
						onClick={ () => { setFirstname(""); setLastname(""); } }>
								Clear
					</button>
				</li>
				<li className="list-group-item bg-light">
					<table>
						<tr>
							<td className="m-2">
								<i>Author</i>
							</td>
							<td >
							</td>
						</tr>
					
						<tr>
							<td className="m-3">
								first name &nbsp;
							</td>
							<td >
<input type="text" value={firstname} onChange={ (e) => { setFirstname(e.target.value); } } />
							</td>
						</tr>
						<tr>
							<td className="m-3">
								last name &nbsp;
							</td>
							<td >
<input type="text" value={lastname} onChange={ (e) => { setLastname(e.target.value); } } />
							</td>
						</tr>
					</table>
				</li>
			</ul>
			<br/>
			
			<table className="table table-success table-striped table-hover w-50">
				<thead>
					<tr>
						<th>Title</th>
						<th>Year</th>
						<th>Author</th>
					</tr>
				</thead>
				<tbody>
					{ books.map( (row) => <Book key={row.id} props={row} /> )  }
				</tbody>
			</table>

			<div className="books">
				{ books.map( (book) => <CardBook key={book.id} props={book} /> )  }
			</div>

		</div>
	);
}

export default PageBooks;
