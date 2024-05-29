import { useEffect, useState } from 'react';

function Loading(){
    const [loaded, setLoaded] = useState(0);
    const [unloaded, setUnLoaded] = useState(100);

    let LoadBar = <div style={{'width': loaded + "%", 'background-color': "black",'height': "20px"}}></div>

    let UnLoadbar = <div style={{'width': unloaded + "%", 'background-color': "black",'height': "20px"}}></div>

    useEffect(() => {
        // console.log(loaded)
        if (loaded >= 100){
            setLoaded(0)
        }
    }, [loaded]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (unloaded > 0){
                // setUnLoaded(unloaded - 5)
            } else {
                setUnLoaded(100)
            }
        }, 500);

    }, [unloaded]);



    return(
        <>
            <button onClick={() =>{setLoaded(loaded + 5)}}>+</button>
            <button onClick={() =>{setLoaded(loaded - 5)}}>-</button>
            {LoadBar}
            <br></br>
            {/* <button onClick={() =>{setUnLoaded(unloaded + 5)}}>+</button> */}
            {UnLoadbar}

        </>

    )
}

export default Loading;