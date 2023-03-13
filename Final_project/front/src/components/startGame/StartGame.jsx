import React, { useState/* , useEffect */ } from 'react'
import InputColor from 'react-input-color';

import './index.css';

//let FieldsPlayersNames=[];


export default function StartGame(){
    const [PlayersSettingsFields, setPlayersSettingsFields] = useState();
    const [color, setColor] = React.useState({});

    function getrandomColorHEX () {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return randomColor;
      }

    function createFieldsPlayersNames(event){
        let fieldsNames=[]
        console.log(event.target.value);
        for (let i=0; i<event.target.value;i++){
            fieldsNames.push(
                <div className='set-player'>
                    <label className="set-player__player-name-label"  
                            htmlFor={`player-name${i+1}`} >
                        Введіть і'мя гравця {i+1}
                    </label>
                    <input className="set-player__player-name" 
                            id={`player-name${i+1}`} 
                            type='text' 
                            placeholder="name">
                    </input>

                    {/* <label className="set-player__player-color"
                            htmlFor={`player-color${i+1}`}>
                        Оберіть колір
                    </label> */}

                    <InputColor
                        className="set-player__player-color-label"
                        id={`player-color${i+1}`}
                        initialValue={getrandomColorHEX()} /* "#5e72e4" */
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
                    
                </div>)
        };   
    
        
        setPlayersSettingsFields(fieldsNames);
    };

    console.log(color);

    console.log(PlayersSettingsFields);

    return(
        <div className="start-game">
            <h2>Початок гри</h2>
            <label className="start-game__num-players-label"  
                    for='num-players'>Кількість гравців</label>
            <input className="start-game__num-players" 
                    id='num-players' 
                    type='number' 
                    placeholder="0" 
                    min="2" 
                    max="4"
                    onChange={createFieldsPlayersNames}></input>
            <div>
                {PlayersSettingsFields}
            </div>
            
        </div>
        
    );
}