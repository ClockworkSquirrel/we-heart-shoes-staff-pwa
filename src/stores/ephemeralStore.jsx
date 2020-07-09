import { store } from "@risingstack/react-easy-state"

const RestAPI = `https://untitled-bzxwlvj4h4dk.runkit.sh`

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
    scanOpen: false,

    fetchNearestStore: async () => getGeoCoords().then(
        ({ lat, lon }) => fetch(`${RestAPI}/locate/coords/${lat}/${lon}`, {
            cache: "force-cache"
        })
    ).then(res => res.json()).then(({ result }) => {
        EphemeralStore.store = {
            name: result.StoreName,
            id: result.StoreId
        }
    }).catch(err => {
        console.error(`Geolocation: ${err.message}`)
        EphemeralStore.store.error = err.message
    })
})

export default EphemeralStore
