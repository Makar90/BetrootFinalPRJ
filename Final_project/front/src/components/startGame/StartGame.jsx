import React, { useState/* , useEffect */ } from 'react'

import './index.css';

//let FieldsPlayersNames=[];


export default function StartGame(){
    const [PlayersSettingsFields, setPlayersSettingsFields] = useState();

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

                    <label className="set-player__player-color"
                            htmlFor={`player-color${i+1}`}>
                        Оберіть колір
                    </label>
                    <input className="set-player__player-color-label"
                            type="color" 
                            name={`player-color${i+1}`}
                            id={`player-color${i+1}`}
                            value="#e66465"/>
                    
                </div>)
        };   
    
        
        setPlayersSettingsFields(fieldsNames);
    };

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