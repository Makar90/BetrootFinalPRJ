import './index.css';
import { useState} from 'react';
import GameProcessInfo from './gameProcessInfo/GameProcessInfo';
import GameControlPoints from './gameControlPoints/GameControlPoints';
import {bankSum} from '../../../data/GlobalData';
import {getCurrentPlayerNum/* ,setCurrentPlayer */} from '../../../data/PlayersData';



export default function PlayFieldCentralArea(props){
const [ElementGameProcessInfo, setElementGameProcessInfo] = useState(getGameProcessInfo());

    /* useEffect(() => {
        getGameProcessInfo()
    }, [PlayersData?.[0]]) */

    function getGameProcessInfo(){
        return (<GameProcessInfo 
            hidden={true} 
            gameBudget={bankSum}
            сurrentPlayer={getCurrentPlayerNum()}
        />)
    }

/*     console.log('ElementGameProcessInfo');*/
    console.log(ElementGameProcessInfo);


    function renderGameProcessInfo(){
        setElementGameProcessInfo(getGameProcessInfo());
    };    

    //setCurrentPlayer(1);   

    return(
        <div className='inner-area'>
            <GameProcessInfo 
                hidden={true} 
                gameBudget={bankSum}
                сurrentPlayer={getCurrentPlayerNum()}
                />
        {/* {renderGameProcessInfo} */}
        {/* {ElementGameProcessInfo} */}
        {/* {i} */}
        

        <GameControlPoints 
            hidden={true}
            reRenderPlayFieldSteps={props.reRenderPlayFieldSteps}
            reRenderGameProcessInfo_Players={renderGameProcessInfo}
            />
        </div>
    );
}