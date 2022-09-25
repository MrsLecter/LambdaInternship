### JSON storage
 A server application that will STORAGE, DELETE and SEND JSON on demand.
1) install dependencies: npm install
2) build: npm build
3) run : npm start

## Endpoints
**GET** ".../custom/[your_rout]" - get your object;
**POST** ".../custom/[your_rout]" -/{rout:your_rout, object: your_object}/ - post your object on your new rout or update object on existing rout;
**DELETE** ".../custom/[your_rout]"-/{rout: your_rout}/ - delete your rout