import React from "react"

import { CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    margin: `${theme.spacing(3)}px auto`
  }
}))

const CentreSpinner = (...props) => {
  const classes = useStyles()
  return <CircularProgress className={classes.root} {...props} />
}

export default CentreSpinner
