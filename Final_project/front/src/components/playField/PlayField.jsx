import './index.css';

import PlayFieldCentralArea from '../playFieldCentralArea/PlayFieldCentralArea';
import CardCommon from '../playSteps/_cardCommon/CardCommon';
import {CardsData} from '../../data/CardsData';

import StartGame from '../startGame/StartGame';


//import imaga from '../../img/cards/front-media.jpg';

console.log(CardsData[0].faceBackground);

function Start(){
    alert('Qo');
};

export default function PlayField(){
    let element = document.querySelector('.play-field');
    console.log(element); 

/*     let cards=[];
    for(let i=41; i<=40; i++){
        cards.push(<CardCommon  key={i+1} cardName={i} cardImage='#1' cardPrice='2500' cardOwner="Igor"/>)
    } */

/*     let cards2=CardsData.map((item, index) =>{
        return(
            <CardCommon 
            key={item.id} 
            onClick={index===0 && Start}
            styles={{backgroundImage: `url(${item.faceBackground})`, backgroundSize:'contain'}}
            //styles={cardAreaStyle}                                      
            cardType={item.type} 
            cardName={item.name} 
            cardImage={item.img} 
            cardPrice={item.price}  
            cardOwner=""/>
        )
    }) */
                        
   /*  const cardAreaStyle = {
        //backgroundImage: `url(${imaga})`, //`url(${CardsData[0].faceBackground})`,
        backgroundImage: `url('./img/cards/front-suplying.jpg')`,
        //backgroundImage:{require ('../../img/cards/front-media.jpg')},
        backgroundSize: 'cover',
    }; */

    console.log({this:{style:{backgroundColor:'red'}}});

    return(
        <div className='play-field'>
            {CardsData.map((item, index) =>
                        
                        <CardCommon 
                        key={item.id} 
                        onclick={index===0 ? Start : undefined}
                        //onmouseover={{this:{style:{borderColor:'green'}}}}
                        styles={index===0 ? 
                                {backgroundImage: `url(${item.faceBackground})`, backgroundSize:'contain', borderColor:'red'} 
                                : 
                                {backgroundImage: `url(${item.faceBackground})`, backgroundSize:'contain'}}
                        //styles={cardAreaStyle}                                      
                        cardType={item.type} 
                        cardName={item.name} 
                        cardImage={item.img} 
                        cardPrice={item.price}  
                        cardOwner=""/>
                        )            
            }
            {/* cards */}
            {/* cards2 */}
            <PlayFieldCentralArea/>
            <StartGame/>
        </div>
    );
}