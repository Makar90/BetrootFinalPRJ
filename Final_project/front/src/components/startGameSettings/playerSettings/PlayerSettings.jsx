
import React, { useState/* , useEffect */ } from 'react'
import InputColor from 'react-input-color';

import './index.css';


export default function PlayerSettings(props){
    const [color, setColor] = useState({});
    //console.log(color);
    //console.log(color.initialValue);
    return(
        <div className='set-player'>
            <label className="set-player__player-name-label"                             
                    htmlFor={`player-name${props.index}`} >
                І'мя гравець-{props.index}
            </label>

            <input className="set-player__player-name" 
                    id={`player-name${props.index}`} 
                    type='text' 
                    placeholder="name">
            </input>

            <InputColor
                className="set-player__player-color"
                initialValue={props.color}
                onChange={setColor}
                placement="right"/>
            {/* <div
                style={{
                width: 50,
                height: 50,
                marginTop: 20,
                backgroundColor: color.rgba,
                }}>
                    54545
            </div> */}                    
        </div>
    )
}