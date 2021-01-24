This app allows teams to vote, online. It is written using Node, Express (backend) and React (frontend).

Before the backend application starts, add a file named `.env` in the `backend` folder, with the following env variables: 
 - CONNECTIONSTRING=<the MongoDB connection string>
 - PORT=<the backend app port>
 - JWTSECRET=<the chosen jwt secret>

To start the backend application: go into the backend folder and run `npm run dev`. The backend application will start on port 3001.

To start the frontend application: go into the frontend folder and run `npm run dev`. The frontend application will start on port 3000, and you can visit [it](http://localhost:3000) in your browser. 