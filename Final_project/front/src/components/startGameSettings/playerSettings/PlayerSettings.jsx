
import React, { useState/* , useEffect */ } from 'react'
import InputColor from 'react-input-color';

import './index.css';


export default function PlayerSettings(props){
    const [color, setColor] = useState({});
    console.log(color);
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

                    {/* <label className="set-player__player-color-label"
                            htmlFor={`player-color${i+1}`}>
                        Оберіть колір
                    </label> */}

                    <InputColor
                        className="set-player__player-color"
                        id={`player-color${props.index}`}
                        initialValue={props.color} /* "#5e72e4" */
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