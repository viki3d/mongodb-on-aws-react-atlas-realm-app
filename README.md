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

#### Define RealmApp functions in MongoDB Atlas  
```
================================================================================
MongoDB ATLAS - RealmApp functions
================================================================================

--------------------------------------------------------------------------------
getAllAuthors()
--------------------------------------------------------------------------------
...

--------------------------------------------------------------------------------
getAllBooks()
--------------------------------------------------------------------------------
...
	
--------------------------------------------------------------------------------
getAllBooksByAuthor()
--------------------------------------------------------------------------------
exports = async function(fname, lname){

  // Find the name of the MongoDB service to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "vibookstore";
  var collName = "books";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  if (fname=="" && lname=="")
    return await collection.find({});
  else    
    return await collection.find({ $or : [ { "author.firstname" : fname }, { "author.lastname" : lname } ] });
};

--------------------------------------------------------------------------------
getAllCountries()
--------------------------------------------------------------------------------
...

--------------------------------------------------------------------------------
getAuthorsByCountry()
--------------------------------------------------------------------------------
...

--------------------------------------------------------------------------------
getCountOfBooksPerAuthor
--------------------------------------------------------------------------------
exports = async function(arg){

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "vibookstore";
  var collName = "books";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  return await collection.aggregate([
		{ $group : {_id:"$author", booksForThisAuthor:{ $sum:1 }, id : { $first:"$id"  } } },
		{ $sort : { _id : 1 } }
	]);
};


--------------------------------------------------------------------------------
getCountOfBooksPerYear
--------------------------------------------------------------------------------
exports = async function(arg){

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "vibookstore";
  var collName = "books";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  return await collection.aggregate([
		{ $match:{ year : { $gt : 0 } }},
		{ $group : {_id:"$year", booksForThisYear:{ $sum:1 }, id : { $first:"$id"  } } },
		{ $sort : { _id : 1 } }
  ]);

};
```


#### Use serverless connection with Realm React

##### Realm React
Realm React is an npm package that provides an easy-to-use API to perform common Realm operations, such as querying or writing to a realm and listening to realm objects.  

Realm React helps you avoid creating boilerplate code, such as creating your own listeners and state management. Realm React provides access to Realm database through a set of hooks that update React state when the Realm data changes. This means that components using these hooks will re-render on any changes to data in the realm.  

##### Setup Realm React
```
npm install realm-web
```

##### Use Realm React
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
We adopt serverless approach by using REALM_APP_ID, instead any connection strings.  



