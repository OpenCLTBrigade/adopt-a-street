# Adopt A Street

**Important:** The project repository has been renamed to "adopt-a-street". Be sure to update your local remote! See details here: https://github.com/CodeForCharlotte/adopt-a-street/issues/29#issuecomment-138721050

- Catch up on the project here: [Project: Adopt-a-“Thing”](http://forum.codeforcharlotte.org/t/project-adopt-a-thing/212)
- View project todos here: [Waffle.io](https://waffle.io/codeforcharlotte/adopt-a-street).

## Getting Started

- Install [NodeJS](https://nodejs.org/en/).
- Install [SailsJS](http://sailsjs.org/get-started) with `npm -g install sails`.
- Run `npm install` to install the rest of the project's dependencies.
- Run `sails lift` to start the server.
- View the site at `http://localhost:1337/`.

### In Windows

The same as above, but you may need to add NPM & NodeJS to your path

#### Adding NPM To your Path
**(Replace {username} with your computer username.)**
 1. Open "Control Panel" > Type "system" into the search > Click on "Edit the system environment variables"
 2. In the window that shows up click "Environment Variables..." (Towards the end of the window).
 3. Under "User variables for {username}" > Select the "Path" variable > Click "Edit...".
 4. At the end of the text add: `;C:\Users\{username}\AppData\Roaming\npm`

#### Creating NODE_PATH Variable
**(Replace {username} with your computer username.)**
 1. Open "Control Panel" > Type "system" into the search > Click on "Edit the system environment variables"
 2. In the window that shows up click "Environment Variables..." (Towards the end of the window).
 3. Under "User variables for {username}" > Click "new..."
 4. In Variable name, put "NODE_PATH" . in Variable value, put `"%USERPROFILE%\Application Data\npm\node_modules"` (Including the quotes)
