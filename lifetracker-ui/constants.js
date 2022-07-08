// require("dotenv").configure()

// PRODUCTION_API_BASE_URL=""
// DEVELOPMENT_API_BASE_URL="http://localhost:3001"
// API_BASE_URL= process.env.NODE_ENV === "production" ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL
//
// SWITCH BELOW TWO IF ON LOCAL MACHINE OR HEROKU
//---------------------------------------------------------------
// const API_BASE_URL = "http://localhost:3001"
const API_BASE_URL = "https://lifetracker-my-project.herokuapp.com"
// ---------------------------------------------------------------

// `PRODUCTION_API_BASE_URL` - set to whatever url the production API is deployed at
//       - [x] `DEVELOPMENT_API_BASE_URL` - set to "http://localhost:3001" for development
//       - [x] `API_BASE_URL` - if `process.env.NODE_ENV` is `production`, set this to `PRODUCTION_API_BASE_URL`, otherwise set it to `DEVELOPMENT_API_BASE_URL`

export default API_BASE_URL

// to update heroku...
// REACT_APP_REMOTE_HOST_URL=https://lifetracker-my-project.herokuapp.com npm run build
// cp dist/index.html dist/200.html
// surge dist