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
        if (!loading && !err && info.Name)
            PersistentStore.pushHistory(info)
    })

    if (loading) {
        return (
            <>
                <Helmet title="Loading..." />
                <CentreSpinner />
            </>
        )
    } else if (err || !info.Name) {
        return (
            <>
                <Helmet title="Error" />

                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {
                        err
                        ? `${err}`
                        : !info.Name
                            ? <><strong>{style}</strong> could not be found</>
                            : "Failed to fetch data"
                    }
                </Alert>
            </>
        )
    } else {
        return (
            <div>
                <Helmet title={info.Name} />

                <Typography variant="h2" className={classes.prodTitle}>
                    {info.Name}
                </Typography>

                <div className={classes.categoriesContainer}>
                    <Breadcrumbs
                        separator={
                            <BreadcrumbSeparatorIcon className={classes.catCrumb} />
                        }
                        className={classes.catBreadcrumbs}
                    >
                        <Typography className={classes.catCrumb}>
                            { info.Category }
                        </Typography>

                        <Typography className={classes.catCrumb}>
                            { info.Subcategory }
                        </Typography>
                    </Breadcrumbs>

                    <Typography className={classes.catCrumb}>
                        { info.StyleCode }
                    </Typography>
                </div>

                <Typography variant="body2" className={classes.priceText}>
                        £{ info.Price }
                </Typography>

                <div className={classes.coverImage}>
                    <img
                        src={info.Thumbnail}
                        alt={info.Name}
                    />

                    <Tooltip title="View on Shoe Zone" placement="top">
                        <Fab
                            color="primary"
                            aria-label="View on Shoe Zone"
                            className={classes.fabCoverImage}
                            component="a"
                            target="_blank"
                            href={`https://www.shoezone.com/Products/--${info.StyleCode}`}
                        >
                            <ShopIcon />
                        </Fab>
                    </Tooltip>
                </div>

                <Alert severity="info">
                    Hold down an EU size to see the estimated UK equivalent.
                </Alert>

                <ProductStock
                    styleCode={info.StyleCode}
                    sizeRange={info.SizeRange}
                    className={classes.stockSizeContainer}
                />
            </div>
        )
    }
}

export default view(ProductView)
