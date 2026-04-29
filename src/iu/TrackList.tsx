import {type FC} from "react"
import type {Track} from "./types";
import TrackItem from "./TrackItem.tsx";
import {useTracks} from "../bll/useTracks.ts";

type TrackListProps = {
    isSelectedId: string | null;
    setIsSelectedId: (id: string | null) => void;
    setSelectedTrack: (track: Track | null) => void;
}



const TrackList: FC<TrackListProps> = (props: TrackListProps) => {

    const {isSelectedId, setIsSelectedId, setSelectedTrack} = props

    const {tracks} = useTracks()

    if (!tracks) {
        return <h2>"No Tracks"</h2>
    }
    const handleResetClick = () => {
        setIsSelectedId(null)
        setSelectedTrack(null)
    }
    return (
        
        <div>
            <button onClick={handleResetClick}>Reset
            </button>
            <ul>
                    {
                        tracks.map((track:Track) => {

                                return (
                                    <TrackItem track={track}
                                               key={track.id}
                                               isSelectedId={isSelectedId}
                                               setSelectedTrack={setSelectedTrack}
                                               setIsSelectedId={setIsSelectedId}/>
                                )
                            })}
                </ul>
        </div>
    )
}

export default TrackList

