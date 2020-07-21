import { store, autoEffect } from "@risingstack/react-easy-state"

const storageKey = "_state"
const savedState = JSON.parse(localStorage.getItem(storageKey))

const PersistentStore = store({
    data: {
        history: [],
        ...savedState
    },

    pushHistory: async (productInfo) => {
        let matchedIndex = undefined
        for (let idx in PersistentStore.data.history) {
            if (PersistentStore.data.history[idx].StyleCode === productInfo.id) {
                matchedIndex = idx
                break
            }
        }

        const updatedProductInfo = {
            StyleCode: productInfo.id,
            Name: productInfo.name,
            Price: productInfo.price.current,
            Currency: productInfo.currency,
            Thumbnail: productInfo.thumbnail,
            Offers: productInfo.offers ?? []
        }

        if (matchedIndex === undefined) {
            PersistentStore.data.history.unshift(updatedProductInfo)
        } else {
            PersistentStore.data.history[matchedIndex] = {
                ...PersistentStore.data.history[matchedIndex],
                ...updatedProductInfo
            }

            PersistentStore.data.history.splice(
                0, 0, PersistentStore.data.history.splice(matchedIndex, 1)[0]
            )
        }

        while (PersistentStore.data.history.length > process.env.REACT_APP_MAX_HISTORY_ITEMS) {
            PersistentStore.data.history.pop()
        }
    },

    clearHistory: async () => PersistentStore.data.history = []
})

autoEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(PersistentStore.data))
})

export default PersistentStore
