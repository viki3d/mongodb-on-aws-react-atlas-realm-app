# mongodb-on-aws-react-atlas-realm-app
MongoDB, Atlas-on-AWS-Cloud, ReactJS, Bootstrap

[Live DEMO](http://viki3d.com/demos/vibookstore)

####  Overview  
This is a virtual bookstore, powered with the technologies, described above. Here is a general arcitectural view:

####  MongoDB Realm  
Realm is a mobile-first database designed for modern, data-driven applications. You can use Realm to build mobile, web, desktop, and IoT apps.  


#### Setup the RealmApp in MongoDB Atlas  
1. Create RealmApp from ...  
2. Check the RealmApp has been created
3. Create Access-Rule to access the needed collection
4. Check the created Rule
5. Set Authentication method

#### Use serverless connection from React by using REALM_APP_ID

```
function MyComponent() {

	const [books, setBooks] = useState([]);

	async function  fetchData() {
		const REALM_APP_ID = "vibookstoreappservice-shyqt";
		const app = new Realm.App( {id:REALM_APP_ID} );
		const credentials = await Realm.Credentials.anonymous();
		try {
			const user = await app.logIn(credentials);
			const allBooks = await user.functions.getAllBooks();
			setBooks(allBooks);
		} catch (error) {
			console.error(error);
		}
	}

	...
}
```
