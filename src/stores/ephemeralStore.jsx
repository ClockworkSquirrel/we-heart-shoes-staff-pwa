import { store } from "@risingstack/react-easy-state"

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
    fflags: {},

    fetchNearestStore: async () => getGeoCoords().then(
        ({ lat, lon }) => fetch(`${process.env.REACT_APP_API_URL}/api/locate/?lat=${lat}&lon=${lon}`)
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
