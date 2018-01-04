[![CircleCI](https://circleci.com/gh/NYCPlanning/labs-nyc-factfinder/tree/develop.svg?style=svg)](https://circleci.com/gh/NYCPlanning/labs-nyc-factfinder/tree/develop)

# NYC Population Fact Finder

Population Fact Finder allows you to easily define study areas — by selecting Census Tracts, Census Blocks, Neighborhood Tabulation Areas (NTAs), or Public Use Microdata Areas (PUMAs) — and produce detailed population profiles.

<img width="1368" alt="pff" src="https://user-images.githubusercontent.com/1833820/34444527-c079d456-ec9c-11e7-805b-93b95dc1844a.png">

## How we work

[NYC Planning Labs](https://planninglabs.nyc) takes on a single project at a time, working closely with our customers from concept to delivery in a matter of weeks.  We conduct regular maintenance between larger projects.  

Take a look at our sprint planning board {link to waffle} to get an idea of our current priorities for this project.

## How you can help

In the spirit of free software, everyone is encouraged to help improve this project.  Here are some ways you can contribute.

- Comment on or clarify [issues](https://github.com/NYCPlanning/labs-nyc-factfinder/issues)
- Report [bugs](https://github.com/NYCPlanning/labs-nyc-factfinder/issues?q=is%3Aissue+is%3Aopen+label%3Abug)
- Suggest new features
- Write or edit documentation
- Write code (no patch is too small)
  - Fix typos
  - Add comments
  - Clean up code
  - Add new features

**[Read more about contributing.](CONTRIBUTING.md)**

## Requirements

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with NPM)
- [Ember CLI](https://ember-cli.com/)

## Local development

- Clone this repo `https://github.com/NYCPlanning/labs-nyc-factfinder.git`
- Install Dependencies `npm install`
- Start the server `ember s`

## Architecture
Primary views:
- Selection view - Allows the user to create a selection of geometries to view census/ACS data about.
- Profile view(s) - Shows census/ACS data tables and charts for the selected geometries.

The `profile` route contains 4 different ACS profiles (Demographic, Social, Economic, Housing) and the Decennial Census Profile.  Each fetches data independently when loaded.

## Backend services

- **Carto** - A carto instance serves as the primary datastore for census and ACS data, and a map tiler
- **[factfinder-api](https://github.com/NYCPlanning/labs-factfinder-api)** - An express api that handles search AND maps collections of selected geoids to an integer.  Useful for persisting selections across browser sessions (also makes reports shareable)


## Testing and checks

- **ESLint** - We use ESLint with Airbnb's rules for JavaScript projects
  - Add an ESLint plugin to your text editor to highlight broken rules while you code
  - You can also run `eslint` at the command line with the `--fix` flag to automatically fix some errors.

- **Testing**
  - run `ember test --serve`
  - Before creating a Pull Request, make sure your branch is updated with the latest `develop` and passes all tests

## Deployment

Deployment happens automatically via circleci when `master` is updated.  

To deploy manually:
Create dokku remote: `git remote add dokku dokku@{dokkudomain}:factfinder`
Deploy: `git push dokku master`

## Contact us

You can find us on Twitter at [@nycplanninglabs](https://twitter.com/nycplanninglabs), or comment on issues and we'll follow up as soon as we can. If you'd like to send an email, use [labs_dl@planning.nyc.gov](mailto:labs_dl@planning.nyc.gov)
