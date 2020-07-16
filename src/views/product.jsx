import React, { useLayoutEffect } from "react"
import { useParams } from "react-router-dom"

import { Helmet } from "react-helmet"

import { view } from "@risingstack/react-easy-state"
import PersistentStore from "../stores/persistentStore"

import { Typography, Breadcrumbs, Fab, Tooltip } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Alert, AlertTitle } from "@material-ui/lab"

import BreadcrumbSeparatorIcon from "@material-ui/icons/NavigateNext"
import ShopIcon from "@material-ui/icons/ShoppingCart"

import useAPI from "../hooks/useAPI"
import CentreSpinner from "../components/centre-spinner"
import ProductStock from "../components/product-stock"

const useStyles = makeStyles(theme => ({
    prodTitle: {
        fontSize: "1.71rem",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        display: "block"
    },
    categoriesContainer: {
        display: "flex"
    },
    catBreadcrumbs: {
        flexGrow: 1
    },
    catCrumb: {
        fontSize: "0.86rem",
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.text.disabled
    },
    priceText: {
        fontSize: "1.71rem",
        fontWeight: theme.typography.fontWeightRegular,
        marginTop: theme.spacing(1)
    },
    coverImage: {
        display: "flex",
        position: "relative",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: theme.shape.borderRadius,
        margin: theme.spacing(1, 0),
        border: `1px solid ${theme.palette.divider}`,

        "& img": {
            width: "100%"
        }
    },
    fabCoverImage: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    stockSizeContainer: {
        marginTop: theme.spacing(1)
    }
}))

const ProductView = () => {
    const classes = useStyles()
    const { style } = useParams()

    const [ info, loading, err ] = useAPI(`/product/${style}`)

    useLayoutEffect(() => {
        (() => {
            if (!loading && !err && info?.name)
                PersistentStore.pushHistory(info)
        })()
    })

    if (loading) {
        return (
            <>
                <Helmet title="Loading..." />
                <CentreSpinner />
            </>
        )
    } else if (err || !info?.name) {
        return (
            <>
                <Helmet title="Error" />

                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {
                        err
                        ? `${err}`
                        : !info?.name
                            ? <><strong>{style}</strong> could not be found</>
                            : "Failed to fetch data"
                    }
                </Alert>
            </>
        )
    } else {
        return (
            <div>
                <Helmet title={info?.name} />

                <Typography variant="h2" className={classes.prodTitle}>
                    {info?.name}
                </Typography>

                <div className={classes.categoriesContainer}>
                    <Breadcrumbs
                        separator={
                            <BreadcrumbSeparatorIcon className={classes.catCrumb} />
                        }
                        className={classes.catBreadcrumbs}
                    >
                        {
                            info?.categories?.map(category => (
                                <Typography className={classes.catCrumb}>
                                    {category}
                                </Typography>
                            ))
                        }
                    </Breadcrumbs>

                    <Typography className={classes.catCrumb}>
                        { info?.id }
                    </Typography>
                </div>

                <Typography variant="body2" className={classes.priceText}>
                    {info?.currency === "GBP" ? "\u00A3" : "\u20AC"}
                    {info?.price?.current}
                </Typography>

                <div className={classes.coverImage}>
                    <img
                        src={info?.thumbnail}
                        alt={info?.name}
                    />

                    <Tooltip title="View on Shoe Zone" placement="top">
                        <Fab
                            color="primary"
                            aria-label="View on Shoe Zone"
                            className={classes.fabCoverImage}
                            component="a"
                            target="_blank"
                            href={`https://www.shoezone.com/Products/--${info?.id}`}
                        >
                            <ShopIcon />
                        </Fab>
                    </Tooltip>
                </div>

                <Alert severity="info">
                    Hold down a size to see the estimated UK conversions and more information.
                </Alert>

                <ProductStock
                    styleCode={info?.id}
                    sizeRange={info?.sizeRange}
                    className={classes.stockSizeContainer}
                    category={info.categories?.[0]}
                />
            </div>
        )
    }
}

export default view(ProductView)
