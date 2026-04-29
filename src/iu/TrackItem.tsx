import type {FC} from "react";
import f from "../App.module.css";
import type {Track} from "./types.ts";

type TrackItemProps = {
    track: Track
    isSelectedId: string | null;
    setIsSelectedId: (id: string | null) => void;
    setSelectedTrack: (track: Track | null) => void;
}
const TrackItem: FC<TrackItemProps> = ({track,isSelectedId,setIsSelectedId,setSelectedTrack}: TrackItemProps) => {
   const onSelected = () => {
        setIsSelectedId(track.id)
        setSelectedTrack(null)
    }
    return (
        <li key={track.id}
            className={track.id === isSelectedId ? f.track : ''}>
            <div onClick={onSelected}> {track.attributes.title} </div>
            <audio src={track.attributes.attachments[0].url} controls/>
        </li>
    )
}
export default TrackItem