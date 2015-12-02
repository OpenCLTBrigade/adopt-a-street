# Adopt A Street

- Catch up on the project here: [Project: Adopt-a-“Thing”](http://forum.codeforcharlotte.org/t/project-adopt-a-thing/212)
- View project todos here: [Waffle.io](https://waffle.io/codeforcharlotte/adopt-a-street).

## Getting Started With NodeJS and Sails

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

## Generating Street Data

### Requirements

- spatialite-tools: http://www.gaia-gis.it/gaia-sins/
- ogr2ogr: http://www.gdal.org/index.html

On Mac, install via [Homebrew](http://brew.sh/):

```
brew install gdal libspatialite spatialite-tools spatialite-gui
```

**Note**: `ogr2ogr` is part of the GDAL package.

### How to

- Download the "Street Adoption" Shapefile from: http://clt.charlotte.opendata.arcgis.com/datasets?q=neighborhoods
- Convert Shapefile to GeoJSON: `ogr2ogr -f geojson assets/data/Street_Adoption.json Street_Adoption.shp`
- Create sqlite database: `spatialite db/db.sqlite < db/schema.txt`
- Import Shapefile: `spatialite_tool -i -shp Street_Adoption -d db/db.sqlite -c UTF-8 -t streets_import`
