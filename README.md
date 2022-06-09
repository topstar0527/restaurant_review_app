## Available Scripts

In the project directory, you can run:
### `yarn install`

Before run `yarn start`, import src/uploads/reviewrestaurantapp.sql to your local database

### `yarn server`

Run the backend api - localhost:4000

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## project description
Please create a website which displays a list of assets (whatever you want, it can be a list of NFTs, a list of books, a list of spoons, … anything, be creative). 
- Each item must have an image, a title and a description. 
- A user must be able to create, edit or delete an item 
Requirements: 
- You must use a database to store / fetch the items data 
- You must use a server in NodeJS to create an api (or other JS framework) - You must use a JS frontend framework (next, react,...) 
Bonus points: 
- Use Typescript 
- Integrate a wallet connection (Metamask/Polkadot.js extension) 
- Beautiful design / demonstration of your design integration skills 
- Deploy your dapp using serverless providers 
- More features to showcase your motivation 
Make your code public so that we can review it and give us an url to see it (or instructions / readme to run it locally).

## what done?
I have finished all above requirements, add some other functions.

User must be able to create an account and log in. (If a mobile application, this means that more users can use the app from the same phone).

Implement 3 roles with different permission levels
* Regular User: Can rate and leave a comment for a restaurant
* Owner: Can create restaurants and reply to comments about owned restaurants
* Admin: Can edit/delete all users, restaurants, comments, and reviews
    
Reviews should have:
* A 5 star based rating
* Date of the visit
* Comment 
    
When a Regular User logs in, they will see a Restaurant List ordered by Average Rating

When an Owner logs in, they will see a Restaurant List - only the ones owned by them, and the reviews pending reply

Owners can reply to each review once

Restaurants detailed view should have:
* The overall average rating
* The highest rated review
* The lowest rated review
* Last reviews with rate, comment, and reply
    
Restaurant List can be filtered by Rating

## Usage
you have to create owner account to update and delete restaurant infos.
