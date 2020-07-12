import React, { useEffect } from "react"

import { Link } from "react-router-dom"

import { view } from "@risingstack/react-easy-state"
import EphemeralStore from "../stores/ephemeralStore"

import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import HeartIcon from "@material-ui/icons/Favorite"

import HeaderSearchInput from "./header-search-input"

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    headerTitle: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.primary.main,
        fontSize: "1.71rem"
    },
    headerTitleLink: {
        textDecoration: "none"
    },
    headerStoreInfo: {
        textTransform: "uppercase",
        fontWeight: theme.typography.fontWeightBold,
        fontSize: "0.85rem",
        color: theme.palette.grey[600]
    }
}))

const Header = () => {
    const classes = useStyles()

    useEffect(() => {
        EphemeralStore.fetchNearestStore()
    }, [])

    return (
        <header className={classes.root}>
            <Link to="/" className={classes.headerTitleLink}>
                <Typography
                    variant="h4"
                    component="h1"
                    className={classes.headerTitle}
                >
                    we<HeartIcon />shoes
                </Typography>
            </Link>

            <Typography variant="body1" component="p" className={classes.headerStoreInfo}>
                {
                    EphemeralStore.store.error
                        ? ""
                        : EphemeralStore.store.name
                            ? `${EphemeralStore.store.name} - ${EphemeralStore.store.id}`
                            : "Determining Location..."
                }
            </Typography>

            {
                EphemeralStore.store.name
                ? <HeaderSearchInput />
                : ""
            }
        </header>
    )
}

export default view(Header)
