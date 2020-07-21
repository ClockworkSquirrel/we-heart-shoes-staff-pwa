import React, { useState } from "react"
import clsx from "clsx"

import { view } from "@risingstack/react-easy-state"
import EphemeralStore from "../stores/ephemeralStore"

import { Card, CardActionArea, Typography, CardContent, Tooltip } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import CentreSpinner from "./centre-spinner"
import { useLayoutEffect } from "react"

import StockNoneIcon from "@material-ui/icons/Close"
import StockUnknownIcon from "@material-ui/icons/Help"
import StockFoundIcon from "@material-ui/icons/Done"

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

// array of conversion values
const SizeGuide = {
    letter: [
        { size: "S", equiv: "3-4", gender: "W" },
        { size: "M", equiv: "5-6", gender: "W" },
        { size: "L", equiv: "7-8", gender: "W" },
        { size: "XL", equiv: "9-10", gender: "W" },
        { size: "S", equiv: "7-8", gender: "M" },
        { size: "M", equiv: "9-10", gender: "M" },
        { size: "L", equiv: "11-12", gender: "M" },
        { size: "XL", equiv: "13-14", gender: "M" }
    ],
    eu: [
        { uk: 1, eu: 21 },
        { uk: 2, eu: 22 },
        { uk: 3, eu: 23 },
        { uk: 4, eu: 24 },
        { uk: 5, eu: 25 },
        { uk: 6, eu: 26 },
        { uk: 7, eu: 27 },
        { uk: 8, eu: 28 },
        { uk: 9, eu: 29 },
        { uk: 10, eu: 30 },
        { uk: 11, eu: 31 },
        { uk: 12, eu: 32 },
        { uk: 13, eu: 33 },
        { uk: 1, eu: 34 },
        { uk: 2, eu: 35 },
        { uk: 3, eu: 36 },
        { uk: 4, eu: 37 },
        { uk: 5, eu: 38 },
        { uk: 6, eu: 39 },
        { uk: 7, eu: 40 },
        { uk: 8, eu: 41 },
        { uk: 9, eu: 42 },
        { uk: 10, eu: 43 },
        { uk: 11, eu: 44 },
        { uk: 12, eu: 45 },
        { uk: 13, eu: 46 },
        { uk: 14, eu: 47 },
        { uk: 15, eu: 48 }
    ]
}

// maps letter sizes to a size range as detailed above in "SizeGuide"
// e.g. "S" is equivalent to sizes 3-4 in ladies and 7-8 in mens.
const letterSizeToRange = (size = "", gender = "W") =>
    SizeGuide.letter.filter(
        ({ size: valSize, gender: valGend }) => valSize === size.toUpperCase() && valGend === gender.toUpperCase()
    )?.[0]?.equiv ?? "unavailable"

// determine sizing type - will return a string containing one of:
// "EU" for European sizing, "UK" for UK sizing or "SML" for letter
// sizing (S, M, L, XL)
const determineSizeType = (size = "") => {
    if (size.replace(/[A-Z]/gi, "").length)
        return Number(size) > 15 ? "EU" : "UK"

    return "SML"
}

// maps EU sizes to a best-guess UK equivalent
const euSizeToUK = (size = "", gender = "W") => {
    const euSize = Math.floor(Number(size) + .5)
    const matchedSize = SizeGuide.eu.filter(({ eu }) => eu === euSize)

    return matchedSize?.[0]?.uk - (gender === "W" ? 0 : 1) ?? "unavailable"
}

const ProductStockSize = ({
    styleCode = "",
    size = {},
    category = "",
    autoCheck = false,
    useIcon = false
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

    const checkForStock = () => {
        setRequested(true)
        setLoading(true)

        return fetch(`${process.env.REACT_APP_API_URL}/api/stock/${storeId}/${styleCode}${size.code}`)
            .then(res => res.json()).then(({ result }) => {
                setInStock(result?.inStock)
            })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }

    const onCardClicked = evt => {
        evt.preventDefault()
        checkForStock()
    }

    const sizeType = determineSizeType(size.size)
    const sizeTooltipContent = sizeType === "EU"
                        ? `UK Size ${euSizeToUK(size.size, category?.[0]?.[0]?.toUpperCase())} (est.)`
                        : sizeType === "UK"
                            ? ""
                            : `UK Size ${letterSizeToRange(size.size, category?.[0]?.[0]?.toUpperCase())} (est.)`

    useLayoutEffect(() => {
        if (autoCheck) checkForStock()
        // eslint-disable-next-line
    }, [])

    return (
        <Card elevation={0} className={classes.sizeCard} key={size.code}>
            <Tooltip title={sizeTooltipContent} placement="top">
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
                                    : useIcon
                                        ? stockRequested
                                            ? inStock
                                                ? <StockFoundIcon />
                                                : <StockNoneIcon />
                                            : <StockUnknownIcon />
                                        : size.size
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
                                (size.stock.warehouse > 0)
                                    ? `x${size.stock.warehouse?.toLocaleString()} in stock online`
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
