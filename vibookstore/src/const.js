import * as Realm from "realm-web";

//POST https://eu-west-1.aws.realm.mongodb.com/api/client/v2.0/app/vibookstoreappservice-shyqt/functions/call
const REALM_APP_ID = "vibookstoreappservice-shyqt";
const REALM_APP = new Realm.App( {id:REALM_APP_ID} );
const HOSTING_URL_PREFIX = "/demos/vibookstore";

export { REALM_APP, HOSTING_URL_PREFIX }
