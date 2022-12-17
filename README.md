# Requirements
TODO: make less dumb
- event full
- plugin based (any one can create)

## COMPONENT DESIGN
- components have many children
- child components can only have one component
- must pass automated tests (this is an external library that can be updated using versioning)

## COMPONENT LIFETIME
- all componentes are created during initial  startup where we enumerate the layout tree and genrate states for each "component"
- visual components "hook" in to the state manager fetching the state for visual display (showing content) when mounting and unmounting

# Create library
https://hinammehra.medium.com/build-a-private-react-component-library-cra-rollup-material-ui-github-package-registry-1e14da93e790

## Process
- Create protocol
- Create base examples

### what to simplyfy and optimize

### Accelerate cycle time? 

### Automation

# Implementation

# TO-DO
- Transform
  - DONE - code editor "transform from event" not firing
  - DONE - transform executes on client
  - transform naming
  - transform validation (running tests between schemas)
  - code should be plugged in to the transform (so all code is 3rd citizen)
  - external code functions and classes

## Next steps
##### 1 MISSING FEATURES (1 week)
- transform (may 18)
- multi page (juni 25)

##### 2 PROOF OF CONCEPT (2 months)
- web solution
- SSR solution
- desktop solution (electron)
- browser extension solution
- mobile (simple) solution

##### 3 REASONS NOT USABLE AS IS (1 month)
- need projects
- deployment (stand alone solution)
- versioning
- clear instructions on creating more compontents
- component plugins in separate repo
- easy usability of external components

##### 4 REASONS NOT SELLABLE AS IS
- Editor UI is not good
- Workflow linking components
- Workflow deployment
- Services for deployment
- BPMN.io logo
- Project configuration and management
- Users and teams management
- Replay events
- Component store


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Features
  - Implementation language, library, platform, and device agnostic
  - 4th or 5th generation programming
  - Track user stories as oposite as tracking user interaction
  - Event sourcing enabled from the start

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


´´´

{
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "title": "Title"
    },
    "description": {
      "type": "string",
      "title": "Description"
    },    
    "type": {
      "type": "string",
      "title": "Type",
      "enum": [
        "object"
      ]
    },        
    "properties": {
      "type": "array",
      "items": {
        "type": "object",
        "anyOf": [
          {
            "title":"string",
            "description": "The string properties",
            "properties": {
              "Title": {
                "type": "string"
              },
              "Description": {
                "type": "string"
              }
            }
          },
          {
            "title":"number",
            "properties": {
              "bar": {
                "type": "string"
              }
            }
          }
        ]
      }
    }
  },
  "anyOf": [
    {
      "title": "First method of identification",
      "properties": {
        "firstName": {
          "type": "string",
          "title": "First name",
          "default": "Chuck"
        },
        "lastName": {
          "type": "string",
          "title": "Last name"
        }
      }
    },
    {
      "title": "Second method of identification",
      "properties": {
        "idCode": {
          "type": "string",
          "title": "ID code"
        }
      }
    }
  ]
}

´´´