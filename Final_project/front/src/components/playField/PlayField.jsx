import React, { useState} from 'react';

import './index.css';
import PlayFieldCentralArea from './playFieldCentralArea/PlayFieldCentralArea';
import CardCommon from './playSteps/_cardCommon/CardCommon';
import {CardsData} from '../../data/CardsData';
import StartGameSettings from '../startGameSettings/startGameSettings';

//import imaga from '../../img/cards/front-media.jpg';

function goStart(){
    let StartPanel= document.querySelector('.start-game');
    StartPanel.style.visibility='visible';
};

export default function PlayField(){
    //console.log({this:{style:{backgroundColor:'red'}}});

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
    

    const [playFieldSteps, setplayFieldSteps] = useState(
    /* let playFieldSteps= */CardsData.map((item, index) =>         
               <CardCommon 
                key={item.id} 
                onclick={index===0 ? goStart : undefined}
                visibility={index===0 ? true : false}
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
    );
   

    function getplayFieldSteps(){      
        setplayFieldSteps(CardsData.map((item, index) =>/*{
                setTimeout(() => {
                    console.log(playFieldSteps);
                    return(  */        
                        <CardCommon 
                            key={item.id} 
                            onclick={index===0 ? goStart : undefined}
                            visibility={index===0 ? true : true}
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
                            cardOwner=""
                        />
                    /*)
                    
                }, 1000*index)
            }*/)
        );
        
    }
    

    return(
        <div className='play-field'>            
            {playFieldSteps}
            {/* cards */}
            {/* cards2 */}
            <PlayFieldCentralArea/>
            <StartGameSettings showPlayFieldSteps={getplayFieldSteps}/>
            {/* <button onClick={getplayFieldSteps}>TEST</button> */}
        </div>
    );
}