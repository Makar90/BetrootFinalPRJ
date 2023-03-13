

import React, { useState/* , useEffect */ } from 'react';

import './index.css';
import PlayerSettings from './playerSettings/PlayerSettings';
import OptionSettings from './optionSettings/OptionSettings';


export default function StartGame(){
    const [PlayersSettings, setPlayersSettings] = useState();
    function getPlayerSettings (numPlayers){
        if(!numPlayers)
            numPlayers=2;
        let fieldsNames=[]
        for (let i=0; i<numPlayers;i++){
            fieldsNames.push(
                <PlayerSettings index={i+1} color={getrandomColorHEX ()}/>
                )
        };     
        setPlayersSettings(fieldsNames);

        function getrandomColorHEX () {
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            return randomColor;
        }; 
    };    

    function updatePlayerSettings(event){
        console.log(event);
        let numPlayers=event.target.value;
        if (+numPlayers > 4 || +numPlayers<2){
            alert('Тільки від 2 до 4 гравців'); 
            numPlayers=2;
            event.target.value=numPlayers;
        } else{    
        getPlayerSettings (numPlayers);
        }
    };

    return(
        <div className="start-game">
            <h2 className='start-game__title'>Початок гри</h2>
            <OptionSettings
                CodeId='num-players' 
                OptionName='Кількість гравців'
                OptionValueType='number'
                OptionValue="0"
                OptionValueMin="2"
                OptionValueMax="4"
                OptionValueOnChange={updatePlayerSettings}
                />
            
            <div className="start-game__players-settings">
                {PlayersSettings}
            </div>

            <OptionSettings
                CodeId='total-money' 
                OptionName='Банк'
                OptionValueType='number'
                OptionValue="8000"
                OptionValueMin="8000"
                OptionValueMax="16000"
                />

            <button className='start-game__button-start'>Start</button>
        </div>
        
    );
}