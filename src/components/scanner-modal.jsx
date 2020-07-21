import React, { useEffect, useState } from "react"
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

    const [ lastScannedCode, setLastScannedCode ] = useState()
    const onBarcodeScanned = (err, result) => {
        if (err || !result) return

        const fullBarcode = (result.text ?? "").trim().replace(/[^\d]/g, "")
        const styleCode = !(fullBarcode.length - 3 < 5) ? fullBarcode.substr(0, fullBarcode.length - 3) : fullBarcode

        if (lastScannedCode === styleCode)
            return onModalCloseHandler()

        setLastScannedCode(styleCode)
        onModalCloseHandler()

        history.push(`/product/${styleCode}`)
    }

    /*
        React will warn that EphemeralStore isn't a valid dependency, as outer-scope
        values don't affect the re-rendering of a component; however, EphemeralStore
        is part of the react-easy-state package, and stores a value which determines
        whether the scanner modal is open or closed. Therefore, changes in
        EphemeralStore *will* affect re-rendering of the comonent.
    */

    // eslint-disable-next-line
    useEffect(() => setLastScannedCode(null), [ EphemeralStore.scanOpen ])

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
