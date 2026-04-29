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

    useEffect(() => {
        if (!isSelectedId) {
            return
        }
        fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks/`+ isSelectedId , {
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
    }, [isSelectedId]);

    if (!tracks) {
        return <h2>"No Tracks"</h2>
    }

    return (
        <div className={f.container}>
            <div className={f.header}>
                <div> Musicfun Player </div>
                <img src='https://avatars.mds.yandex.net/i?id=f73b461568aba1ae27b2a204795c9407e4f65df9-4820979-images-thumbs&n=13'/>
            </div>
            <Increment/>
            <button onClick={() => {
                setIsSelectedId(null)
                setSelectedTrack(null)
            }}>Reset
            </button>
            <div className={f.music_content}>
                <ul>
                    {
                        tracks.map((track) => {
                                return (
                                    <li key={track.id}
                                        className={track.id === isSelectedId ? f.track : ''}>
                                        <div onClick={() => {
                                            setIsSelectedId(track.id)
                                            setSelectedTrack(null)
                                        }}> {track.attributes.title} </div>
                                        <audio src={track.attributes.attachments[0].url} controls/>
                                    </li>
                                )
                            })}
                </ul>
                <div className={f.detalis}>
                    <h2>Details</h2>
                    {!isSelectedId && !selectedTrack && "Track is not selected"}
                    {isSelectedId && !selectedTrack &&   "Loading..."}
                    {selectedTrack &&  <div>
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
            </div>
            <footer>
                                It Samurai
            </footer>
        </div>
    )
}

export default App

function Increment (){
    const [counter,setCounter]= useState(1)
    useEffect(() => {
        document.title = "Counter"+ counter
    }, [counter]);
    return(
        <div>
            <button style={{borderRadius: "10px"}} onClick={()=>{setCounter(counter+1)}}>
                increment {counter}
            </button>
        </div>
    )
}

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
//
//  import {useState} from "react";
//
// function App (){
//     const [tracks,setTracks] = useState([{id: 1}, {id: 2}, {id: 3}])
//     const [selectedTrack,setSelectedTrack] = useState( 1)
//     const [selectedTrackId,setSelectedTrackId] = useState(null)
//
//      return (
//         <div>
//          <h3>detalis</h3>
//             {selectedTrack && !selectedTrackId && <span>...Loading</span>}
//             {selectedTrack && selectedTrackId && <div>{selectedTrackId}</div>}
//          <h3>
//              Track:
//              {!tracks.length && <span>...Loading</span>}
//              {
//                  tracks.map((track)=> {
//                      return(
//                          <div key={track.id} style={track.id === selectedTrack? {color: "red"}:undefined}> {track.id} </div>
//                      )
//                  })
//              }
//          </h3>
//         </div>
//      )
// }
// export default App