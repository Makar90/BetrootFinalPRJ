

import React, { useState} from 'react';

import './index.css';
import PlayerSettingsCard from './playerSettingsCard/PlayerSettingsCard';
import OptionSettings from './optionSettings/OptionSettings';
import {playersMinNum,playersMaxNum,bankMinSum,bankMaxSum, getrandomColorHEX, checkMinMaxPlayers} from '../../data/GlobalData'
import {PlayersData} from '../../data/PlayersData';
//import PlayField from '../playField/PlayField';

function getPlayerSettingsCards (numPlayers){
    let fieldsNames=[]
    for (let i=0; i<numPlayers;i++){
        fieldsNames.push(
            <PlayerSettingsCard key={i+1} index={i+1} color={getrandomColorHEX ()}/>
            )
    };     
    return fieldsNames;        
}; 

export default function StartGame(props){
    const [PlayersSettingsCards, setPlayersSettingsCards] = useState(getPlayerSettingsCards(playersMinNum));

    function updatePlayerSettingsCards(event){
        let numPlayers=event.target.value;
        if (!checkMinMaxPlayers(numPlayers)){ 
            numPlayers=playersMinNum;
            event.target.value=PlayersSettingsCards.length;
        } else{    
            setPlayersSettingsCards(getPlayerSettingsCards (numPlayers));
        }
    };

    function pressStartButton(){
        let elementStartGameSettings = document.querySelector('.start-game');
        elementStartGameSettings.style.visibility='hidden';      
        setPlayersData();
        props.showPlayFieldSteps();

        function setPlayersData(){   
            let elementsPlayersCards= elementStartGameSettings.querySelectorAll('.set-player');          
            elementsPlayersCards.forEach((elementPlayer)=>{
                let playerName = elementPlayer.querySelector('.set-player__player-name').value;
                let elementPlayerColor = elementPlayer.querySelector('.set-player__player-color');
                let playerColor = elementPlayerColor.querySelector('span').style.backgroundColor;
                //console.log(playerName+ ' '+ playerColor);
                let dataPlayer={
                    playerName:playerName,
                    playerColor:playerColor
                }; 
                PlayersData.push(dataPlayer);            
                }); 
            console.log('---Start---PlayersData');
            console.log(PlayersData);            
        }

    }

    return(
        <div className="start-game">
            <h2 className='start-game__title'>Початок гри</h2>

            <OptionSettings
                OptionClassName='start-game__option'
                CodeId='num-players' 
                OptionName={`Кількість гравців (max-${playersMaxNum})`}
                OptionValueType='number'
                OptionValue={playersMinNum}
                OptionValueMin={playersMinNum}
                OptionValueMax={playersMaxNum}
                OptionValueOnChange={updatePlayerSettingsCards}
                />
            
            <div className="start-game__players-settings">
                {PlayersSettingsCards}
            </div>

            <OptionSettings
                OptionClassName='start-game__option'
                CodeId='total-money' 
                OptionName='Банк'
                OptionValueType='number'
                OptionValue={bankMinSum}
                OptionValueMin={bankMinSum}
                OptionValueMax={bankMaxSum}
                OptionValueOnChange=''
                />

            <button className='start-game__button-start'
                    onClick={pressStartButton}>
                Розпочати гру
            </button>
        </div>
        
    );
}