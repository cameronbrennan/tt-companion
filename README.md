## Table Top Companion 

1. Table Top Companion is a MERN-Stack, fully responsive web app designed to make it easy for Table Top RPG players to create and view potential character builds.
2. Currently, TTC is built using the Dungeons and Dragons, 5th Edition API (http://www.dnd5eapi.co/) to provide character Race and Class benefits and information, but long term is planned to have integration with Pathfinder and other community favorite Table Top RPG rule sets.
3. The application will allow a play to signup (or login if they have an account) and create/view/update their character builds through an intuitive and informative interface that provides immediate feedback on the results of these build decisions.
4. Currently, the only core component to the character create process that is absent from TTCompanion's creation process is the selection of skill proficiencies, although this feature will be added very soon!


#### Technologies Used:

1. MondoDB
2. Mongoose ODM
3. Express
4. React
5. Node.js
6. Javascript
7. Python
8. HTML
9. CSS
10. Deployed on Heroku (https://table-top-companion.herokuapp.com/)

##### Additional Notable Dependencies:

1. react-dom/react-router-dom/react-scripts
2. semantic-ui-react/semantic-ui-css
3. jsonwebtoken
4. bcrypt
5. aws-sdk
6. multer
7. python-dotenv
8. urllib3
9. pymongo


#### Application Screenshots


#### Application ERD
<img src = "readme-images/TableTop Companion ERD.png" alt = "ERD" width = "640" height = "360">

#### Instructions
1. When you reach landing page you will be redirected to login where you can signup for an account or login if you already have an account.
2. After your account has been created, you will be able to view your profile which will also show your created characters, as well as a character's index.
3. You can create a new character from several spots in the app, and that process will take you through a multi-step create process, which will end with a created character

#### Future Development Plans

1. Implement "Campaign" functionality and "Dungeon Master" account type for creating campaigns with some details and adding Player Characater's to the Campaign.
2. Add calendar system for planning Adventure meetups
3. Add additional methods of form control
4. Add multiple ways to get possible ability score values
5. (Long Term) - add web socket functionality so that DM's are able to update character sheet instances from an Adventure instance.