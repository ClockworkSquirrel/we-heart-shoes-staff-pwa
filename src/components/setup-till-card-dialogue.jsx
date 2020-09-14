import React, { useState } from "react"
import clsx from "clsx"

import { view } from "@risingstack/react-easy-state"
import EphemeralStore from "../stores/ephemeralStore"
import Store from "../stores/persistentStore"

import { useTheme, makeStyles } from "@material-ui/core/styles"
import { useMediaQuery, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, IconButton, Tooltip } from "@material-ui/core"

import BinIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles(theme => ({
    dimmedButton: {
        color: theme.palette.grey[500],
    },
    deleteIcon: {
        marginRight: "auto",
    },
    confirmButton: {
        fontWeight: theme.typography.fontWeightBold,
    }
}))

const SetupTillCardDialogue = () => {
    const [tillCardCode, setTillCardCode] = useState()

    const classes = useStyles()
    const theme = useTheme()
    const dialogueFullscreen = useMediaQuery(theme.breakpoints.only("xs"))

    const onDialogueDismissed = () => EphemeralStore.tillCardDialogueOpen = false

    const onSubmitChanges = () => {
        Store.setTillCard(tillCardCode)
        onDialogueDismissed()
    }

    const onDeleteCard = () => {
        Store.setTillCard(null)
        onDialogueDismissed()
    }

    const onInputKeyPressed = evt => {
        if (evt.key === "Enter") {
            evt.preventDefault()
            onSubmitChanges()
        }
    }

    return (
        <Dialog
            open={EphemeralStore.tillCardDialogueOpen}
            onClose={onDialogueDismissed}
            fullScreen={dialogueFullscreen}
        >
            <DialogTitle>
                Setup Till Card
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Setup your till card for easy access. Scan your phone with the barcode scanner to login. You can use this in both your store and other stores to receive staff discount too.
                </DialogContentText>

                <TextField
                    autoFocus
                    autoComplete="off"
                    margin="dense"
                    id="name"
                    label="Till Card Number"
                    helperText="This is the number you use to login on your till. It is also displayed below the barcode on your physical till card."
                    defaultValue={Store.data.tillCardId}
                    type="number"
                    min={10000}
                    max={99999}
                    fullWidth

                    onChange={evt => setTillCardCode(evt.target.value)}
                    onKeyPress={onInputKeyPressed}
                />
            </DialogContent>

            <DialogActions>
                <Tooltip
                    arrow
                    title="Remove Till Card"
                    placement="top-start"
                >
                    <IconButton
                        aria-label="delete"
                        className={
                            clsx(classes.dimmedButton, classes.deleteIcon)
                        }
                        onClick={onDeleteCard}
                    >
                        <BinIcon />
                    </IconButton>
                </Tooltip>

                <Button onClick={onDialogueDismissed} className={classes.dimmedButton}>
                    Cancel
                </Button>

                <Button onClick={onSubmitChanges} color="primary" className={classes.confirmButton}>
                    Finish
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default view(SetupTillCardDialogue)
