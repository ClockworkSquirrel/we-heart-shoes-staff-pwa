import { store } from "@risingstack/react-easy-state"
import config from "../config.json"

const getGeoCoords = () => new Promise((resolve, reject) => {
    if (!navigator.geolocation)
        return reject("Geolocation API is not supported")

    navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false
    })
}).then(({ coords: { latitude, longitude } }) => ({
    lat: latitude,
    lon: longitude
}))

const EphemeralStore = store({
    store: {},
    fflags: {},

    scanOpen: false,
    tillCardDialogueOpen: false,

    fetchNearestStore: async () => getGeoCoords().then(
        ({ lat, lon }) => fetch(`${config.endpoints.api}/api/locate/?lat=${lat}&lon=${lon}`)
    ).then(res => res.json()).then(({ result }) => {
        EphemeralStore.store = {
            name: result.storeName,
            id: result.storeId
        }
    }).catch(err => {
        EphemeralStore.store.error = err.message
    })
})

export default EphemeralStore
