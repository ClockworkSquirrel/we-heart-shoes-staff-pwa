import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import { view } from "@risingstack/react-easy-state"
import EphemeralStore from "../stores/ephemeralStore"

import { FormControl, InputLabel, FilledInput, InputAdornment, IconButton, Tooltip } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import ScanCodeIcon from "@material-ui/icons/FilterCenterFocus"

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        margin: theme.spacing(3, 0)
    },
    codeInputBox: {
        borderRadius: theme.shape.borderRadius,

        "& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
            WebkitAppearance: "none"
        }
    }
}))

const HeaderSearchInput = () => {
    const [ styleCode, setStyleCode ] = useState()
    const classes = useStyles()
    const history = useHistory()

    const onSearchSubmit = evt => {
        evt.preventDefault()

        let style = styleCode.trim().replace(/[^\d]/g, "")

        if (!(style.length - 3 < 5))
            style = style.substr(0, style.length - 3)

        history.push(`/product/${style}`)
    }

    const onScanButtonClick = evt => {
        evt.preventDefault()
        EphemeralStore.scanOpen = true
    }

    return (
        <div className={classes.root}>
            <form onSubmit={onSearchSubmit}>
                <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="product-code-search">
                        Product code
                    </InputLabel>

                    <FilledInput
                        id="product-code-search"
                        type="number"
                        min={process.env.REACT_APP_MIN_PRODUCT_CODE}
                        max={process.env.REACT_APP_MAX_PRODUCT_CODE}

                        endAdornment={
                            <InputAdornment position="end">
                                <Tooltip title="Scan a barcode" arrow>
                                    <IconButton
                                        aria-label="Scan a barcode"
                                        edge="end"
                                        onClick={onScanButtonClick}
                                    >
                                        <ScanCodeIcon />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        }

                        disableUnderline
                        autoComplete="off"
                        className={classes.codeInputBox}

                        onInput={
                            ({ target: { value } }) => setStyleCode(value)
                        }
                    />
                </FormControl>
            </form>
        </div>
    )
}

export default view(HeaderSearchInput)
