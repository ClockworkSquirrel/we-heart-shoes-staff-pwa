import React from "react"

import { view } from "@risingstack/react-easy-state"
import EphemeralStore from "../stores/ephemeralStore"

import { Helmet } from "react-helmet"

import { HashRouter as Router, Switch, Route } from "react-router-dom"
import { CssBaseline } from "@material-ui/core"
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

import Header from "./header"
import ScannerModal from "./scanner-modal"
import CentreSpinner from "./centre-spinner"

import HomeView from "../views/index"
import ProductView from "../views/product"

const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: `Montserrat, Helvetica, Arial, sans-serif`,
  },
  palette: {
    primary: {
      main: "#002F87"
    }
  }
})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(2),
    maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`
  }
}))

const App = () => {
  const classes = useStyles()

  return (
    <div>
      <CssBaseline />

      <Helmet
        titleTemplate="%s - we♥shoes"
        defaultTitle="we♥shoes"
        title="Loading..."
      />

      <ThemeProvider theme={defaultTheme}>
        <div className={classes.root}>
          <Router basename={process.env.PUBLIC_URL}>
            <Header />

            {
              EphemeralStore.store.error
              ? `Error: ${EphemeralStore.store.error}`
              : EphemeralStore.store.name
                ? <Switch>
                    <Route path="/" exact component={HomeView} />
                    <Route path="/product/:style" component={ProductView} />
                  </Switch>
                : <CentreSpinner />
            }

            <ScannerModal />
          </Router>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default view(App)
