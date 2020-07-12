import React, { useState } from "react"
import clsx from "clsx"

import { view } from "@risingstack/react-easy-state"
import EphemeralStore from "../stores/ephemeralStore"

import { Card, CardActionArea, Typography, CardContent, Tooltip } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { RestAPI } from "../hooks/useAPI"
import CentreSpinner from "./centre-spinner"

const useStyles = makeStyles(theme => ({
    sizeCard: {
        padding: 0,
        backgroundColor: theme.palette.background.default
    },
    cardMain: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start"
    },
    cardSize: {
        width: 55,
        height: 55,
        display: "flex",
        flexShrink: 0,
        flexGrow: 0,
        backgroundColor: theme.palette.grey[300],
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.shape.borderRadius,
        marginLeft: theme.spacing(1.5)
    },
    cardSizePrimary: {
        backgroundColor: theme.palette.primary.main
    },
    cardSizeText: {
        color: theme.palette.getContrastText(theme.palette.grey[300]),
        fontSize: "1.71rem",
        verticalAlign: "middle",
        fontWeight: theme.typography.fontWeightBold
    },
    cardSizeTextPrimary: {
        color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    cardContent: {
        flexGrow: 1,
        overflow: "hidden"
    },
    storeStockText: {
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightBold
    },
    onlineStockText: {
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightRegular
    }
}))

const ProductStockSize = ({
    styleCode = "",
    size = {}
}) => {
    const classes = useStyles()

    const {
        store: {
            id: storeId,
            name: storeName
        }
    } = EphemeralStore

    const [ inStock, setInStock ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)
    const [ stockRequested, setRequested ] = useState(false)
    const [ hasError, setError ] = useState(false)

    const onCardClicked = evt => {
        evt.preventDefault()

        setRequested(true)
        setLoading(true)

        fetch(`${RestAPI}/stock/${storeId}/${styleCode}${size.SizeCode}`)
            .then(res => res.json()).then(({ result }) => {
                setInStock(result?.InStock)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }

    return (
        <Card elevation={0} className={classes.sizeCard} key={size.SizeCode}>
            <Tooltip
                title={
                    size.SizeUK
                        ? `UK Size ${size.SizeUK} (est.)`
                        : size.SizeIsNumeric
                            ? undefined
                            : `Size Code: ${size.SizeCode}`
                }
                placement="top"
            >
                <CardActionArea
                    className={classes.cardMain}
                    onClick={onCardClicked}
                >
                    <div className={
                        clsx(classes.cardSize, {
                            [classes.cardSizePrimary]: inStock
                        })
                    }>
                        <Typography variant="h6" className={
                            clsx(classes.cardSizeText, {
                                [classes.cardSizeTextPrimary]: inStock
                            })
                        }>
                            {
                                isLoading
                                    ? <CentreSpinner size="1.71rem" />
                                    : size.Size
                            }
                        </Typography>
                    </div>

                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6" className={classes.storeStockText}>
                            {
                                hasError
                                    ? "An error ocurred"
                                    : inStock
                                        ? `In stock in ${storeName}`
                                        : isLoading
                                            ? "Checking the stock room..."
                                            : stockRequested
                                                ? `Out of stock in ${storeName}`
                                                : `Tap to check stock in ${storeName}`
                            }
                        </Typography>

                        <Typography variant="h6" className={classes.onlineStockText}>
                            {
                                (size.Stock > 0)
                                    ? `x${size.Stock?.toLocaleString()} in stock online`
                                    : "Out of stock online"
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Tooltip>
        </Card>
    )
}

export default view(ProductStockSize)
