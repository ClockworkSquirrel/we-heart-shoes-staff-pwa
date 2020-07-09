import React from "react"

import { view } from "@risingstack/react-easy-state"
import PersistentStore from "../stores/persistentStore"

import { Typography, ButtonBase } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import HistoryList from "../components/history-list"
import { Helmet } from "react-helmet"

const useStyles = makeStyles(theme => ({
    historyHeader: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: "1rem"
    },
    historyClearText: {
        textTransform: "uppercase",
        fontWeight: theme.typography.fontWeightBold,
        fontSize: "0.75rem",
        color: theme.palette.grey[600]
    },
    historyClearButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        clear: "both",
        marginBottom: theme.spacing(1)
    }
}))

const HomeView = () => {
    const classes = useStyles()

    const onClearHistoryClicked = evt => {
        evt.preventDefault()
        PersistentStore.clearHistory()
    }

    return (
        <div>
            <Helmet title="Home" />

            <ButtonBase
                className={classes.historyClearButton}
                onClick={onClearHistoryClicked}
            >
                <Typography variant="h2" className={classes.historyHeader}>
                    History
                </Typography>

                <Typography variant="body1" className={classes.historyClearText}>
                    Clear
                </Typography>
            </ButtonBase>

            <HistoryList />
        </div>
    )
}

export default view(HomeView)
