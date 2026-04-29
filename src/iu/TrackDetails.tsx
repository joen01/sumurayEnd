import type {Track} from "./types";
import f from '../App.module.css'
import * as React from "react";
import {useTrackDetails} from "../bll/UseTrackDetails.tsx";


type TrackDetailsProps = {
    isSelectedId: string | null;
    selectedTrack: Track | null;
    setSelectedTrack: (track: Track | null) => void;
}

const TrackDetails: React.FC<TrackDetailsProps> = (props: TrackDetailsProps) => {
    const {isSelectedId, selectedTrack, setSelectedTrack} = props

useTrackDetails(isSelectedId,setSelectedTrack)

    return (
        <div className={f.detalis}>
            <h2>Details</h2>
            {!isSelectedId && !selectedTrack && "Track is not selected"}
            {isSelectedId && !selectedTrack && "Loading..."}
            {selectedTrack && <div>
                {selectedTrack.attributes.title}
                <h2> Lyrics: </h2>
                {selectedTrack.attributes.lyrics ?? "No lyrics"}
            </div>}
            {/*{
            !isSelectedId ?
                "Track is not selected" :
                !selectedTrack ?
                    "Loading..." :
                    <div>
                        {selectedTrack.attributes.title}
                        <h2> Lyrics: </h2>
                            {selectedTrack.attributes.lyrics ?? "No lyrics"}
                    </div>
        }*/}
        </div>

    )
}

export default TrackDetails
