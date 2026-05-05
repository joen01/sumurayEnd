import { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import PageTitle from './PageTitle'
import Sidebar from './Sidebar'
import TrackDetails from './TrackDetails'
import TrackList from './TrackList'
import type { Track } from './types'
import s from '../App.module.css'
import {Proba} from "../Proba.tsx";

const MainPage = () => {

    const [isSelectedId, setIsSelectedId] = useState<string | null>(null)
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

    return (
        <>
            <Header/>
            <Proba/>
            <Sidebar/>
            <PageTitle/>
            <div className={s.music_content}>
                <TrackList 
                    isSelectedId={isSelectedId}
                    setIsSelectedId={setIsSelectedId} 
                    setSelectedTrack={setSelectedTrack}
                />
                <TrackDetails
                    isSelectedId={isSelectedId}
                    selectedTrack={selectedTrack}
                    setSelectedTrack={setSelectedTrack}
                />
            </div>
            <Footer/>
        </>
    )
}

export default MainPage

