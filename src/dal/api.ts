import type {Track} from "../iu/types.ts";

const prepareHeaders = () => {
    const apiKey = import.meta.env.VITE_API_KEY
    if (!apiKey) return undefined
    return {
        "API-KEY": apiKey
    }
}

export const getTrack = (isSelectedId: string):Promise<{ data: Track }> => {
    return (
        fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks/` + isSelectedId, {
            headers: prepareHeaders()
        })
            .then((res: Response) => res.json()))
}
export const getTracks = ():Promise<{ data: Track[]|null }>=> {
   return  fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
       headers: prepareHeaders()
    })
        .then((res: Response) => res.json())
}