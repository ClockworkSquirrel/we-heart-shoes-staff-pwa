import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

import { view } from "@risingstack/react-easy-state"
import EphemeralStore from "../stores/ephemeralStore"

import { Modal, Paper, Backdrop, Grow } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import BarcodeScanner from "react-webcam-barcode-scanner"

const useStyles = makeStyles(theme => ({
    modalContainer: {
        padding: theme.spacing(2),
        margin: `${theme.spacing(4)}px auto`,
        maxWidth: 500
    },
    modalPaper: {
        outline: 0,
        flexGrow: 1,
        width: "100%",
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius * 2,

        "& video": {
            marginBottom: theme.spacing(-1) + 1,
            borderRadius: theme.shape.borderRadius
        }
    }
}))

const ScannerModal = () => {
    const classes = useStyles()
    const history = useHistory()

    const onModalCloseHandler = () => EphemeralStore.scanOpen = false

    let scanDebounce = false
    const onBarcodeScanned = (err, result) => {
        if (scanDebounce || err || !result) return
        scanDebounce = true
        
        const fullBarcode = (result.text ?? "").trim().replace(/[^\d]/g, "")
        const styleCode = fullBarcode.substr(0, 5)

        if (styleCode.length !== 5) {
            scanDebounce = false
            return
        }

        onModalCloseHandler()

        history.push(`/product/${styleCode}`)
        scanDebounce = false
    }

    useEffect(() => {
        const { search } = history.location

        if (search === "?scan" && !EphemeralStore.scanOpen)
            EphemeralStore.scanOpen = true
    })

    return (
        <Modal
            open={EphemeralStore.scanOpen}
            onClose={onModalCloseHandler}
            BackdropComponent={Backdrop}
            className={classes.modalContainer}
        >
            <Grow in={EphemeralStore.scanOpen}>
                <Paper className={classes.modalPaper}>
                    <BarcodeScanner
                        width="100%"
                        height="100%"
                        onUpdate={onBarcodeScanned}
                    />
                </Paper>
            </Grow>
        </Modal>
    )
}

export default view(ScannerModal)
