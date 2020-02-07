## `Volkswagen - Pool Car Log Book App`

---

Wild Code School 3 days hackathon

### Group: `Tri-Roc`


#### *Objective:*

Digital “pool log book” for VW SDC:LX. 

Mobile-friendly app with the ability to schedule a car and see past trips.


### Setup

#### *On the front folder*

1. Create a .env file with the following environment variables:

    REACT_APP_SERVER_URL=http://localhost:5000

2. To run locally do: 

    yarn start

    Runs the app in the development mode.
    Open http://localhost:3000 to view it in the browser.


#### *On the back folder*

1. Create a .env file with the following environment variables:

     JAWSDB_URL=mysql://[YourUsername]:[YourPassword]@localhost/[DatabaseName]?multipleStatements=true

2. Setting up mysql on terminal:

    - create your database

    - yarn db:create

    - yarn db:seed

    - yarn db:drop (if you want to drop tables on database)

3. To run locally do: 

    yarn dev

    Runs the app in the development mode.
    Open http://localhost:5000 to view it in the browser.
