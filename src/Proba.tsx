// import p from './proba.module.css'
//
//
// function Proba () {
//     return (
//     <div className={p.conteiner}>
//         <div className={p.content}>
//             Привет я пакман
//         </div>
//         <div className={p.center}>
//
//         </div>
//         <div className={p.pacman}>
//             <div className={p.head}>
//                 <div className={p.mouth}> </div>
//                 <div className={p.eye}> </div>
//                 <div className={p.zrachek}> </div>
//             </div>
//         </div>
//     </div>)
// }
//
// export default Proba

import {useEffect, useState} from "react";

export function Proba() {

    return <div>
        <Counter/>

    </div>
}


function Counter() {
    const {value, inc, isDisabled} = useCounter(5, 5000)

    return <div>
        <button disabled={isDisabled} onClick={inc}>{value}</button>
    </div>
}


function useCounter(initValue: number, ms: number) {
    const [value, setValue] = useState(initValue)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        if (value === 15) {
            setIsDisabled(true)
        }
    }, [value])

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(initValue)
            setIsDisabled(false)
        }, ms);
        return () => {
            clearInterval(interval)
        };
    }, [initValue, ms])


    return {
        value,
        inc: () => setValue(value + 1),
        isDisabled
    }

}
