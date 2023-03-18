import './index.css';

import GameProcessInfo from './gameProcessInfo/GameProcessInfo';
import GameControlPoints from './gameControlPoints/GameControlPoints';
import {bankSum} from '../../../data/GlobalData';


export default function PlayFieldCentralArea(){
    return(
        <div className='inner-area'>
            {/* <CardCommon visibility={true}/>
            <CardCommon visibility={true}/> */}
            <GameProcessInfo hidden={true} 
                            gameBudget={bankSum}/>
            <GameControlPoints hidden={true}/>
        </div>
    );
}