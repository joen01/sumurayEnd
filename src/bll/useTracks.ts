import {useEffect, useState} from "react";
import type {Track} from "../iu/types.ts";
import {getTracks} from "../dal/api.ts";

export function useTracks () {
    const [tracks, setTracks] = useState<Track[] | null>(null)

    useEffect(() => {
        getTracks()
            .then((json) => setTracks(json.data))
            .catch((err: Error) => console.error(err))
    }, [])
    return {
        tracks
    }
}