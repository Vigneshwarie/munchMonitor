# munchMonitor

## Description

munchMonitor is a full-stack application that allows users to track and monitor their pets' daily intake. This application allows user to create an account in the portal and create, edit, or delete profiles for their pets. The food scheduler allows the user to keep track of the food. The application handles all the user requests as API requests. The application was developed using server-side technologies like Node.js and Express.js and deployed on the Heroku platform. The application also uses sessions and cookies to store necessary user information.

## Installation

To run or execute the application locally, one must have node installed in the system and other supporting packages like express.js, mysql, etc as mentioned in the package.json file.

To individually install the packages, use the below links,

Follow the guidelines using the link to install Node.js: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs, 

Follow the guidelines using the link to install Express.js: https://www.npmjs.com/package/express

Follow the guidelines using the link to install mysql: https://www.npmjs.com/package/mysql

## Usage

The deployed application can be accessed using the link https://munchmonitor-641029a8a248.herokuapp.com/

The application source code can be accessed using the link https://github.com/Vigneshwarie/munchMonitor

One can download the code from the above link. And to use the application, one must install all node.js, express.js, MySQL and other packages, as mentioned in the installation section or can follow the package.json file. Then, navigate to the db folder and execute the schema and seeds SQL file to create the base database structure for the application to run. Also, before running the application, please ensure that you update your MySQL database credentials for the database in the .env file.

Once completed, navigate to the application folder and run the server.js file in the integrated terminal of vscode. Use the command below to the file,

application-folder> node server.js

On successful installation and execution, the application will run successfully and starts listening to the port. One can navigate to the browser and type localhost for the mentioned port. The application will display as below.

![Alt text](public/images/LoginScreen.png)

![Alt text](public/images/SignUpScreen.png)

![Alt text](public/images/CreatePetProfile.png)

![Alt text](public/images/ProfileDetails.png)

## Credits

The below links were useful in understanding the packages that we used in the application

https://handlebarsjs.com/guide/builtin-helpers.html

https://sequelize.org/docs/v6/advanced-association-concepts/creating-with-associations/

https://bulma.io/documentation/form/

## Contributors

Francisco Contreras - https://github.com/frankieee324
  
Ricardo Torres - https://github.com/rtocastro

Vigneswari Sambandam - https://github.com/Vigneshwarie

## License

Please refer to the LICENSE in the repo.
