import type {Track} from "../iu/types.ts";

export const getTrack = (isSelectedId: string):Promise<{ data: Track }> => {
    return (
        fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks/` + isSelectedId, {
            headers: {
                "API-KEY": "21c3bf07-86cb-4588-84b9-7e8261ec3eed"
            }
        })
            .then((res: Response) => res.json()))
}
export const getTracks = ():Promise<{ data: Track[]|null }>=> {
   return  fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
        headers: {
            "API-KEY": "21c3bf07-86cb-4588-84b9-7e8261ec3eed"
        }
    })
        .then((res: Response) => res.json())
}