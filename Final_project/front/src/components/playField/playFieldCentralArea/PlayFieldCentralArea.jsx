import './index.css';
//import CardCommon from '../playSteps/playFieldStepsCard/PlayFieldStepsCard'
import GameProcessInfo from './gameProcessInfo/GameProcessInfo';
import {TotalGameBudget} from '../../../data/GameProcessData';


export default function PlayFieldCentralArea(){
    return(
        <div className='inner-area'>
            {/* <CardCommon visibility={true}/>
            <CardCommon visibility={true}/> */}
            <GameProcessInfo hidden={false} gameBudget={TotalGameBudget[0]}/>
        </div>
    );
}