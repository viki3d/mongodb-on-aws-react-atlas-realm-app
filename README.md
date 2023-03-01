# mongodb-on-aws-react-atlas-realm-app
MongoDB, Atlas-on-AWS-Cloud, ReactJS, Bootstrap

[Live DEMO (click)](http://viki3d.com/demos/vibookstore)

### CONTENTS
## <a href="#c1"      >1. Overview</a>  
## <a href="#c2"      >2. MongoDB Realm</a>  
### <a href="#c2_1"   >2.1. Setup the RealmApp in MongoDB Atlas</a>  
### <a href="#c2_2"   >2.2. Define RealmApp functions in MongoDB Atlas</a>  
## <a href="#c3"      >3. Use serverless connection with Realm React</a>  
### <a href="#c3_1"   >3.1. Realm React</a>  
### <a href="#c3_2"   >3.2. Setup Realm React</a>  
### <a href="#c3_3"   >3.3. Use Realm React</a>  

####  <span id="c1">1. Overview</span>  
This is a virtual bookstore, powered with the technologies, described above. Here is a general arcitectural view:
![01](/mongodb-on-aws-react-atlas-realm-app-01.png?v=1 "Architectural Overview")


####  <span id="c2">2. MongoDB Realm</span>  
Realm is a mobile-first database designed for modern, data-driven applications. You can use Realm to build mobile, web, desktop, and IoT apps.  


#### <span id="c2_1">2.1. Setup the RealmApp in MongoDB Atlas</span>  
1. Create RealmApp  
![01](/setup-realm-app-01-create-realm-app.png?v=1 "Create RealmApp")

2. Check the RealmApp has been created  
![02](/setup-realm-app-02-realm-app-created.png?v=1 "Check the RealmApp")

3. Create Access-Rule to access the needed collection  
![03](/setup-realm-app-03-create-rule-for-db.png?v=1 "Create Access-Rule")

4. Check the created Rule  
![04](/setup-realm-app-04-see-rule.png?v=1 "Check the Rule")

5. Set Authentication method  
![05](/setup-realm-app-05-set-auth-method.png?v=1 "Set Authentication method")

#### <span id="c2_2">2.2. Define RealmApp functions in MongoDB Atlas</span>  
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

  // Find the name of the MongoDB service to use
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

  // Find the name of the MongoDB service you want to use
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


#### <span id="c3">3. Use serverless connection with Realm React</span>  

##### <span id="c3_1">3.1. Realm React</span>  
Realm React is an npm package that provides an easy-to-use API to perform common Realm operations, such as querying or writing to a realm and listening to realm objects.  

Realm React helps you avoid creating boilerplate code, such as creating your own listeners and state management. Realm React provides access to Realm database through a set of hooks that update React state when the Realm data changes. This means that components using these hooks will re-render on any changes to data in the realm.  

##### <span id="c3_2">3.2. Setup Realm React</span>  
```
npm install realm-web
```

##### <span id="c3_3">3.3. Use Realm React</span>  
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



