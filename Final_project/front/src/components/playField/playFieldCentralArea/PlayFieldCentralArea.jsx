import './index.css';
//import { useState } from 'react';
import GameProcessInfo from './gameProcessInfo/GameProcessInfo';
import GameControlPoints from './gameControlPoints/GameControlPoints';
import {bankSum} from '../../../data/GlobalData';
import {getCurrentPlayer,setCurrentPlayer} from '../../../data/PlayersData';


export default function PlayFieldCentralArea(props){
/*     const [ElementGameProcessInfo, setElementGameProcessInfo] = useState(getGameProcessInfo());

    function getGameProcessInfo(){
        return (
            <GameProcessInfo 
                hidden={true} 
                gameBudget={bankSum}
                сurrentPlayer={getCurrentPlayer()}
            />);
    }

    function renderGameProcessInfo(){
        setElementGameProcessInfo(getGameProcessInfo());
    }; */

    

    setCurrentPlayer(1);
    let renderPlayerFunctionName = ()=>function renderPlayerFunction(){};


    return(
        <div className='inner-area'>
            <GameProcessInfo 
                hidden={true} 
                gameBudget={bankSum}
                сurrentPlayer={getCurrentPlayer()}
                renderPlayerFunction={renderPlayerFunctionName}
                />

        {/* ElementGameProcessInfo */}

        <GameControlPoints 
            hidden={true}
            reRenderPlayFieldSteps={props.reRenderPlayFieldSteps}
            reRenderGameProcessInfo={renderPlayerFunctionName}
            />
        </div>
    );
}