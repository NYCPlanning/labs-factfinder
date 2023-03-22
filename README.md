# NYC Population FactFinder 2020

Population FactFinder allows you to easily define study areas — by selecting Census Tracts, Census Blocks, Neighborhood Tabulation Areas (NTAs), Community Districts, and more — to produce detailed population profiles.

## Requirements

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with NPM) **version ^12.18.4**
- [Yarn](https://yarnpkg.com/)
- [Ember CLI](https://ember-cli.com/)

(You can use [NVM](https://github.com/nvm-sh/nvm) to manage node versions on your computer)

## Local development

- Clone this repo `https://github.com/NYCPlanning/labs-nyc-factfinder.git`
- Install Dependencies `yarn`
- Start the server `yarn run start`
  - If running labs-factfinder-api and labs-layers-api locally, instead start the server with `yarn run local-api`
- Run tests: `yarn test`

## Architecture
Primary views:
- Selection - Allows the user to create a selection of geometries to view census/ACS data about.
- Explorer - Shows census/ACS data tables and charts for the selected geometries.

## Backend services

- **[factfinder-api](https://github.com/NYCPlanning/labs-factfinder-api)** - An express api that handles search AND maps collections of selected geoids to an integer.  Useful for persisting selections across browser sessions (also makes reports shareable)
- **[layers-api](https://github.com/NYCPlanning/labs-layers-api)** - A collection of feature layers to populate the map with data.

## Contact us

You can find us on Twitter at [@NYCPlanningTech](https://twitter.com/nycplanningtech), or comment on issues and we'll follow up as soon as we can. If you'd like to send an email, use [OpenSource_dl@planning.nyc.gov](mailto:opensource_dl@planning.nyc.gov)
