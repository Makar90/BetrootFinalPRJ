import './index.css';

import InnerArea from '../playField/innerArea/InnerArea';
import CardCommon from '../playSteps/_cardCommon/CardCommon';
import {CardsData} from '../../data/CardsData';
console.log(CardsData[0]);

export default function PlayField(){
    let cards=[];
    for(let i=1; i<=39; i++){
        cards.push(<CardCommon cardName={i} cardImage='#1' cardPrice='2500' cardOwner="Igor"/>)
    }

    return(
        <div className='play-field'>
            
            <CardCommon key={CardsData[0].id} 
                        cardType={CardsData[0].type} 
                        cardName={CardsData[0].name} 
                        cardImage='#1' 
                        cardPrice={CardsData[0].price}  
                        cardOwner="Igor"/>
            {cards}
            <InnerArea/>
        </div>
    );
}