import React from "react"

import { view } from "@risingstack/react-easy-state"
import PersistentStore from "../stores/persistentStore"

import { Link } from "react-router-dom"

import { Grid, Typography, Card, CardContent, CardMedia, CardActionArea } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    productCard: {
        backgroundColor: theme.palette.grey[300],
        maxHeight: 72
    },
    cardRoot: {
        display: "flex",
        flexDirection: "row",
        alignItems: "start"
    },
    cardThumb: {
        height: 64,
        width: 64,
        margin: theme.spacing(.5),
        backgroundColor: "white",
        borderRadius: theme.shape.borderRadius * .5,
        flexShrink: 0,
        flexGrow: 0
    },
    cardContent: {
        flexGrow: 1,
        padding: theme.spacing(.5),
        overflow: "hidden"
    },
    cardTitle: {
        fontSize: "1rem",
        fontWeight: theme.typography.fontWeightBold,
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    cardStyleCode: {
        fontSize: "0.71rem",
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.grey[600],
        marginTop: "-0.29rem"
    },
    cardOffers: {
        fontSize: "0.71rem",
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.grey[600],
        marginTop: "-0.29rem"
    },
    cardPrice: {
        fontSize: "1rem",
        fontWeight: theme.typography.fontWeightRegular,
        marginTop: "auto"
    },
    miniInfo: {
        display: "flex",
        flexDirection: "row"
    },
    flexSpacer: {
        display: "block",
        flexGrow: 1
    }
}))

const HistoryList = () => {
    const classes = useStyles()

    return (
        <Grid container spacing={1}>
            {
                PersistentStore.data.history.map(
                    product => (
                        <Grid item xs={12} key={product.StyleCode}>
                            <Card elevation={0} className={classes.productCard}>
                                <CardActionArea
                                    component={Link}
                                    to={`/product/${product.StyleCode}`}
                                    className={classes.cardRoot}
                                >
                                    <CardMedia
                                        image={product.Thumbnail}
                                        title={product.Name}
                                        className={classes.cardThumb}
                                    />

                                    <CardContent className={classes.cardContent}>
                                        <Typography
                                            component="h5"
                                            className={classes.cardTitle}
                                        >
                                            { product.Name }
                                        </Typography>

                                        <div className={classes.miniInfo}>
                                            <Typography
                                                variant="subtitle1"
                                                className={classes.cardStyleCode}
                                            >
                                                { product.StyleCode }
                                            </Typography>

                                            <div className={classes.flexSpacer}></div>

                                            {
                                                product?.Offers?.map(offer => (
                                                    <Typography
                                                        variant="subtitle1"
                                                        className={classes.cardOffers}
                                                    >
                                                        { offer?.abbr ?? offer?.name }
                                                    </Typography>
                                                ))
                                            }
                                        </div>

                                        <Typography
                                            variant="body1"
                                            className={classes.cardPrice}
                                        >
                                            {product?.Currency === "EUR" ? "\u20AC" : "\u00A3"}{ product.Price }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                )
            }
        </Grid>
    )
}

export default view(HistoryList)
