import React, { useEffect, useState } from "react"

import { Snackbar, Button } from "@material-ui/core"
import * as serviceWorker from "../serviceWorker"

const ServiceWorker = () => {
    const [showReload, setShowReload] = useState(false)
    const [updatedWorker, setUpdatedWorker] = useState()

    const onServiceWorkerUpdated = ({ waiting: waitingWorker }) => {
        setUpdatedWorker(waitingWorker)
        setShowReload(true)
    }

    const onSnackbarButtonClick = evt => {
        evt.preventDefault()

        setShowReload(false)

        if (updatedWorker)
            updatedWorker.postMessage({ type: "SKIP_WAITING" })

        window.location.reload()
    }

    useEffect(() => {
        serviceWorker.register({ onUpdate: onServiceWorkerUpdated })
    }, [])

    return (
        <Snackbar
            open={showReload}
            onClick={() => setShowReload(false)}
            action={
                <Button
                    color="inherit"
                    size="small"
                    onClick={onSnackbarButtonClick}
                >
                    Update
                </Button>
            }
            message="Update available! Reload to see changes."
        />
    )
}

export default ServiceWorker
