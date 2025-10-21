import f from './App.module.css'
import {useEffect, useState} from "react";

// Типы для треков
interface TrackAttributes {
    title: string;
    lyrics?: string;
    attachments: Array<{
        url: string;
    }>;
}

interface Track {
    id: string;
    attributes: TrackAttributes;
}

interface ApiResponse<T> {
    data: T;
}

// const instance = fetch({
//     withCredentials: true,
//     baseURL: 'https://musicfun.it-incubator.app/api/1.0',
//     headers: {
//         "API-KEY": "07da914e-4e2a-471d-8a65-c920077ef9cb"
//     }
// })

function App() {

    const [isSelectedId, setIsSelectedId] = useState<string | null>(null)
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
    const [tracks, setTracks] = useState<Track[] | null>(null)

    // useEffect(() => {
    //     const fetchTracks = async () => {
    //         try {
    //             const response = await instance.get('/playlists/tracks');
    //             setTracks(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //
    //     fetchTracks();
    // }, []);

// useEffect(()=>{
//     instance.get('/playlists/tracks')
//         .then(res=>res.json())
//         .then(json=> setTracks(json.data) )
//         .catch(err=>console.error(err))
//
// },[])

    useEffect(() => {
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                "API-KEY": "07da914e-4e2a-471d-8a65-c920077ef9cb"
            }
        })
            .then((res: Response) => res.json())
            .then((json: ApiResponse<Track[]>) => setTracks(json.data))
            .catch((err: Error) => console.error(err))
    }, [])

    if (!tracks) {
        return <h2>"No Tracks"</h2>
    }

    return (
        <div>
            <h1>Musicfun Player</h1>
            <button onClick={() => {
                setIsSelectedId(null)
                setSelectedTrack(null)
            }}>reset
            </button>
            <div style={{display: "flex", gap: "50px"}}>
                <ul>
                    {
                        tracks.map((track) => {
                                return (
                                    <li key={track.id}
                                        className={track.id === isSelectedId ? f.track : ''}>
                                        <div onClick={() => {
                                            setIsSelectedId(track.id)
                                            setSelectedTrack(null)
                                            fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks/`+ track.id , {
                                                headers: {
                                                    "API-KEY": "07da914e-4e2a-471d-8a65-c920077ef9cb"
                                                }
                                            })
                                                .then((res: Response) => res.json())
                                                .then((json: ApiResponse<Track>) => {
                                                    setSelectedTrack(json.data)
                                                })
                                                .catch((err: Error) => {
                                                    console.error(err)
                                                })
                                        }}> {track.attributes.title} </div>
                                        <audio src={track.attributes.attachments[0].url} controls/>
                                    </li>
                                )
                            })}
                </ul>
                <div>
                    <h2>Details</h2>
                    {
                        isSelectedId === null ?
                            "Track is not selected" :
                            selectedTrack === null ?
                                "Loading..." :
                                <div>
                                    {selectedTrack.attributes.title}
                                    <h2> Lyrics: </h2>
                                        {selectedTrack.attributes.lyrics ?? "No lyrics"}
                                </div>
                    }
                 </div>
            </div>
        </div>
    )
}

export default App

//  Сделай функцию, которая выбрасывает ошибку, если переданный параметр не число. 
// Оберни вызов этой функции в try/catch и обработай ошибку, 
// вернув строку "Ошибочный параметр". 
// В блоке finally выведи "Выполнено
//
// function checkNum(element) {
//     if (typeof element !== "number" || Number.isNaN(element))
//         throw new Error("not a number");
//     return element
// }
//
// try {
//     const result = checkNum("123456")
// } catch {
//     console.log("Ошибочный параметр");
// } finally {
//     console.log("Выполнено")
// }