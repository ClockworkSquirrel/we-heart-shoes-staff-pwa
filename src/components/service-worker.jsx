import { useEffect } from "react"

import * as serviceWorker from "../serviceWorker"

const ServiceWorker = () => {
    const onServiceWorkerUpdated = ({ waiting: waitingWorker }) => {
        waitingWorker.postMessage({ type: "SKIP_WAITING" })
        window.location.reload()
    }

    useEffect(() => {
        serviceWorker.register({ onUpdate: onServiceWorkerUpdated })
    }, [])

    /*
        I figured this app would work best if it just auto-reloaded
        when an update was detected, but really you could render
        a snackbar or some form of notification to prompt the user
        to manually update (or inform them that it'll update next time
        they reopen the app).
    */

    /*
        return (
            <div>

            </div>
        )
    */
}

export default ServiceWorker
