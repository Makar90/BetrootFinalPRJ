import './index.css';

import InnerArea from '../playField/innerArea/InnerArea';
import CardCommon from '../playSteps/_cardCommon/CardCommon';
import {CardsData} from '../../data/CardsData';


//import imaga from '../../img/cards/front-media.jpg';

console.log(CardsData[0].faceBackground);

export default function PlayField(){
    let cards=[];
    for(let i=12; i<=40; i++){
        cards.push(<CardCommon  key={i+1} cardName={i} cardImage='#1' cardPrice='2500' cardOwner="Igor"/>)
    }

    
   /*  const cardAreaStyle = {
        //backgroundImage: `url(${imaga})`, //`url(${CardsData[0].faceBackground})`,
        backgroundImage: `url('./img/cards/front-suplying.jpg')`,
        //backgroundImage:{require ('../../img/cards/front-media.jpg')},
        backgroundSize: 'cover',
    }; */

    return(
        <div className='play-field'>
            {CardsData.map((item, index) => <CardCommon 
                        key={item.id} 
                        styles={{backgroundImage: `url(${item.faceBackground})`, backgroundSize:'contain'}}
                        /* styles={cardAreaStyle}   */
                                                                   
                        cardType={item.type} 
                        cardName={item.name} 
                        cardImage={item.img} 
                        cardPrice={item.price}  
                        cardOwner=""/>
                        )
                        }

            {/* <CardCommon key={CardsData[0].id} 
                        cardType={CardsData[0].type} 
                        cardName={CardsData[0].name} 
                        cardImage='#1' 
                        cardPrice={CardsData[0].price}  
                        cardOwner="Igor"/> */}
            {cards}
            <InnerArea/>
        </div>
    );
}