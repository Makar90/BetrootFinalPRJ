

import React, { useState/* , useEffect */ } from 'react';

import './index.css';
import PlayerSettings from './playerSettings/PlayerSettings';
import OptionSettings from './optionSettings/OptionSettings';
import {PlayersData} from '../../data/PlayersData';


export default function StartGame(){
    const [PlayersSettings, setPlayersSettings] = useState();
    
    function getPlayerSettings (numPlayers){
        if(!numPlayers)
            numPlayers=2;
        let fieldsNames=[]
        for (let i=0; i<numPlayers;i++){
            fieldsNames.push(
                <PlayerSettings key={i+1} index={i+1} color={getrandomColorHEX ()}/>
                )
        };     
        setPlayersSettings(fieldsNames);

        function getrandomColorHEX () {
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            return randomColor;
        }; 
    };    

    function updatePlayerSettings(event){
        //console.log(event);
        let numPlayers=event.target.value;
        if (+numPlayers > 4 || +numPlayers<2){
            alert('Тільки від 2 до 4 гравців'); 
            numPlayers=2;
            event.target.value=numPlayers;
        } else{    
        getPlayerSettings (numPlayers);
        }
    };

    function Start(){
        let elementStartGameSettings = document.querySelector('.start-game');
        //elementStartGameSettings.style.visibility='hidden';

        //let playersSettings=[];
        //PlayersData=[];
        let elementsPlayers= elementStartGameSettings.querySelectorAll('.set-player');
        elementsPlayers.forEach((elementPlayer)=>{
            let playerName = elementPlayer.querySelector('.set-player__player-name').value;
            let elementPlayerColor = elementPlayer.querySelector('.set-player__player-color');
            let playerColor = elementPlayerColor.querySelector('span').style.backgroundColor;
            //console.log(playerName+ ' '+ playerColor);
            let dataPlayer={
                playerName:playerName,
                playerColor:playerColor
            };
            //playersSettings.push(dataPlayer);  
            PlayersData.push(dataPlayer);            
            });  
                  
        console.log('---Start---PlayersData');
        //console.log(playersSettings);
        console.log(PlayersData);
    }

    return(
        <div className="start-game">
            <h2 className='start-game__title'>Початок гри</h2>

            <OptionSettings
                OptionClassName='start-game__option'
                CodeId='num-players' 
                OptionName='Кількість гравців (max-4)'
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
                OptionClassName='start-game__option'
                CodeId='total-money' 
                OptionName='Банк'
                OptionValueType='number'
                OptionValue="8000"
                OptionValueMin="8000"
                OptionValueMax="16000"
                OptionValueOnChange=''
                />

            <button className='start-game__button-start'
                    onClick={Start}>
                Start
            </button>
        </div>
        
    );
}