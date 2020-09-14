import React from "react"

import { view } from "@risingstack/react-easy-state"
import Store from "../stores/persistentStore"
import EphemeralStore from "../stores/ephemeralStore"

import { makeStyles } from "@material-ui/core/styles"
import { Typography, IconButton, Button, Tooltip } from "@material-ui/core"
import { QRCode } from "react-qr-svg"

import EditIcon from "@material-ui/icons/Edit"
import CreditCardIcon from "@material-ui/icons/CreditCard"

import SetupTillCardDialogue from "./setup-till-card-dialogue"

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        width: "100%",
        flexDirection: "column"
    },
    sectionHeader: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    tillCardHeader: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: "1rem",
        flexGrow: 1,
    },
    sectionMainContent: {
        display: "flex",
        width: "100vw",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.background.paper,
        margin: theme.spacing(1, 0, 2),
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        alignSelf: "center",
    },
    contentContainer: {
        display: "flex",
        padding: theme.spacing(3, 3, 2),
        width: "100%",
        maxWidth: 500,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    typography: {
        fontWeight: theme.typography.fontWeightBold,
    },
    setupButton: {
        margin: theme.spacing(2, 0),
    },
    tillCardCode: {
        width: "50%",
        color: theme.palette.primary.main,

        "& *.tcqr-cell-filled": {
            fill: "currentColor",
        },

        "& *.tcqr-cell-empty": {
            fill: "transparent",
        }

        [theme.breakpoints.only("xs")]: {
            width: "80%",
        },
    },
    tillCardCodeText: {
        fontWeight: theme.typography.fontWeightBold,
        marginTop: theme.spacing(1),
    }
}))

const TillCard = () => {
    const classes = useStyles()

    const onSetupButtonClicked = evt => {
        evt.preventDefault()
        EphemeralStore.tillCardDialogueOpen = true
    }

    return (
        <section className={classes.root}>
            <div className={classes.sectionHeader}>
                <Typography variant="h2" className={classes.tillCardHeader}>
                    Till Card
                </Typography>

                <Tooltip title="Edit Till Card" arrow placement="left">
                    <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={onSetupButtonClicked}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <div className={classes.sectionMainContent}>
                <div className={classes.contentContainer}>
                    {
                        Store.data.tillCardId
                            ? (
                                <>
                                    <QRCode
                                        value={Store.data.tillCardId}
                                        className={classes.tillCardCode}
                                        cellClassPrefix="tcqr"
                                    />

                                    <Typography
                                        variant="body1"
                                        className={classes.tillCardCodeText}
                                        color="primary"
                                    >
                                        {Store.data.tillCardId}
                                    </Typography>
                                </>
                            )
                            : (
                                <>
                                    <Typography variant="h1" color="primary" className={classes.typography}>
                                        <CreditCardIcon fontSize="inherit" />
                                    </Typography>

                                    <Typography variant="h4" color="primary" className={classes.typography}>
                                        Till Card
                                    </Typography>

                                    <Typography variant="body1" color="primary">
                                        Setup your till card for convenient access.
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.setupButton}
                                        onClick={onSetupButtonClicked}
                                    >
                                        Setup Card
                                    </Button>
                                </>
                            )
                    }
                </div>
            </div>

            <SetupTillCardDialogue />
        </section>
    )
}

export default view(TillCard)
