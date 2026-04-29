import type {Track} from "../iu/types.ts";
import {useEffect} from "react";
import {getTrack} from "../dal/api.ts";

export const useTrackDetails = (isSelectedId: string | null, setSelectedTrack: (track: Track | null) => void) => {

    useEffect(() => {
        if (!isSelectedId) {
            return
        }
        getTrack(isSelectedId)
            .then((json) => {
                setSelectedTrack(json.data)
            })
            .catch((err: Error) => {
                console.error(err)
            })
    }, [isSelectedId]);

    return {
        setSelectedTrack
    }
}