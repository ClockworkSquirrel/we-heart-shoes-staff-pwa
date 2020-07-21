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
        border: `1px solid ${theme.palette.divider}`
    },
    productThumb: {
        width: "100%"
    },
    fabCoverImage: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    stockSizeContainer: {
        marginTop: theme.spacing(1)
    },
    offersContainer: {
        display: "flex",
        width: "100%",
        marginTop: theme.spacing(1),
        alignItems: "end",
        justifyContent: "flex-end",
        flexDirection: "row",
        position: "absolute",
        top: 0,
        left: 0,
        padding: theme.spacing(2, 3, 0, 2)
    },
    offerIcon: {
        width: 96,
        height: 96,
        flexGrow: 0,
        display: "inline-block"
    },
    productDescription: {
        margin: theme.spacing(1, 0, 3)
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
                    <div className={classes.offersContainer}>
                        {
                            info?.offers?.map(offer => (
                                <Tooltip title={`This item is in the ${offer?.abbr ?? offer?.name} offer`} placement="top">
                                    <img
                                        src={offer?.image}
                                        alt={offer?.name}
                                        className={classes.offerIcon}
                                        />
                                </Tooltip>
                            ))
                        }
                    </div>

                    <img
                        src={info?.thumbnail}
                        alt={info?.name}
                        className={classes.productThumb}
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

                <div className={classes.productDescription}>
                    <Typography variant="h4" className={classes.catCrumb}>
                        Description
                    </Typography>

                    <Typography variant="body2">
                        {info?.description}
                    </Typography>
                </div>

                <Alert severity="info">
                    Hold down a size to see the estimated size conversions for European sizes or S/M/L/XL sizing.
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
