import React from "react"

import { useLocation, Link } from "react-router-dom"

import { Fab, Tooltip, Grow } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import FabIcon from "@material-ui/icons/History"

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        bottom: theme.spacing(3),
        right: theme.spacing(3)
    }
}))

const HomeFAB = () => {
    const { pathname } = useLocation()
    const classes = useStyles()

    return (
        <div>
            <Grow
                in={pathname !== "/"}
                className={classes.root}
            >
                <Tooltip title="History" placement="top">
                    <Fab
                        color="primary"
                        aria-label="History"
                        component={Link}
                        to="/"
                        className={classes.root}
                    >
                        <FabIcon />
                    </Fab>
                </Tooltip>
            </Grow>
        </div>
    )
}

export default HomeFAB
