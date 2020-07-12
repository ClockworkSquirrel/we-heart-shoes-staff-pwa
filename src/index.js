import React from "react"
import ReactDOM from "react-dom"

import * as serviceWorker from "./serviceWorker"

import App from "./components/app"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.querySelector("#app")
)

serviceWorker.register()
