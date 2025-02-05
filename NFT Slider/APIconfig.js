const url = "https://api.opensea.io/api"

const endpoints = {
    nfts: {
        getCollection: (collection_slug) => `${url}/v2/collection/${collection_slug}/nfts`
    }
}