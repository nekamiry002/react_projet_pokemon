import './ColorPicker.css';
import { useEffect, useState } from 'react';







function ColorPicker(){

    const colors = [
        "001f3f",
        "0074D9",
        "7FDBFF",
        "39CCCC",
        "3D9970",
        "2ECC40",
        "01FF70",
        "FFDC00",
        "FF851B",
        "FF4136",
        "85144B",
        "F012BE",
        "B10DC9",
        "111111",
        "AAAAAA",
        "DDDDDD",
        "FFFFFF"
        ]

    const [textColor, setTextColor] = useState("000000");

    let colorButtons = colors.map(element => <li style={{'background-color': "#" + element}}><button onClick={() =>{setTextColor(element)}}>{element}</button></li>)

    

    /*useEffect(() => {

    }, [color]);*/

    return(
        <>
            <ul>
                {colorButtons}
            </ul>
            <div style={{'color': "#" + textColor}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum et temporibus dicta non dolores pariatur? 
                Voluptatum hic facere nam velit quibusdam vitae ullam esse id error atque. 
                Pariatur, ad officiis?
            </div>
        </>
    );
}

export default ColorPicker;