import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "font-awesome/css/font-awesome.min.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
// import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.Fragment>
)
