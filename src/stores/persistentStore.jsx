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
            if (PersistentStore.data.history[idx].StyleCode === productInfo.StyleCode) {
                matchedIndex = idx
                break
            }
        }

        if (matchedIndex === undefined) {
            PersistentStore.data.history.unshift({
                StyleCode: productInfo.StyleCode,
                Name: productInfo.Name,
                Price: productInfo.Price,
                Thumbnail: productInfo.Thumbnail
            })
        } else {
            PersistentStore.data.history.splice(
                0, 0, PersistentStore.data.history.splice(matchedIndex, 1)[0]
            )
        }

        while (PersistentStore.data.history.length > 8) {
            PersistentStore.data.history.pop()
        }
    },

    clearHistory: async () => PersistentStore.data.history = []
})

autoEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(PersistentStore.data))
})

export default PersistentStore
