import './index.css';

import { useState } from "react";
import {PlayersData,
        getCurrentPlayer,
        setCurrentPlayer,
        getCurrentPlayerPosition,
        setCurrentPlayerPosition,
        getCurrentPlayerBudget,
        moneyAddForPlayer,
        moneyStorneForPlayer
    } from '../../../../data/PlayersData';

import {CardsData,
        setPlayFieldCardOwner,
        checkObjectOwner,
        getObjectOwner,
        getObjectPrice,
        getObjectType,
        getObjectName,
        checkMunicipalTreasuresTypeCard,
        checkChanceTypeCard,
        checkBunkerTypeCard,
        checkLoteryTypeCard,
        checkZSUDonateTypeCard,
        checkPrisonTypeCard,
        checkChornobaivkaTypeCard
    } from '../../../../data/CardsData';

import {bonusForFullPlayFieldRound,
        bankSum,
        setBankSum
    } from '../../../../data/GlobalData';
//import { useState } from "../../../../../public/img/cube-sides/";


export default function GameControlPoints(props){
    const [PlayCube1, setPlayCube1] = useState(getPlayCube('start'));
    const [PlayCube2, setPlayCube2] = useState(getPlayCube('start'));


    function getPlayCube(cubeValue){
        switch (cubeValue) {
            case 'start':
                cubeValue=0;
                break;
            case undefined:
                cubeValue=Math.floor(Math.random() * (6 - 1) + 1);
                break;
            default:
                break;
        };
        
        let cubeImage='';
        switch (cubeValue) {
            case 1:
                cubeImage='../img/cube-sides/cube-1.png';
                break;
           case 2:
                cubeImage='../img/cube-sides/cube-2.png';
                break;
            case 3:
                cubeImage='../img/cube-sides/cube-3.png';
                break;
            case 4:
                cubeImage='../img/cube-sides/cube-4.png';
                break;
            case 5:
                cubeImage='../img/cube-sides/cube-5.png';
                break;
            case 6:
                cubeImage='../img/cube-sides/cube-6.png';
                break;
            default:
                cubeImage='../img/cube-sides/cube-error.png';
          }

        let playcube=(
            <div className='game-control-poins__play-cube'
                    cubevalue={cubeValue}
                    style={{backgroundImage:`url(${cubeImage})`}}>
            </div>
        );
        return playcube; 
    }

    function GenerateEffectCubes(){
        //Випропучкаєте хід бо попередній ви потрапили на пропуск ходу
        //if(){}

        let cube1Value=0;
        let cube2Value=0;
        
        
        let generateCubeEffectsCount=20;
        let generateCubeEffectsCounter=0;
        let generateCubeTimerDelay = 40;
        let generateCubeTimer = setTimeout(function request() {
            if(generateCubeEffectsCounter<generateCubeEffectsCount){
                generateCubeTimer = setTimeout(request, generateCubeTimerDelay);
                generateCubeEffectsCounter++;
                setPlayCube1(getPlayCube());        
                setPlayCube2(getPlayCube());        
            }else{

            //===Memorize cubes value
                let elementCubes=document.querySelectorAll('.game-control-poins__play-cube');
                elementCubes.forEach((cube, cubeNum)=>{
                    console.log(`cube${cubeNum+1}= ${cube.getAttribute('cubevalue')}`);
                    cubeNum===0 ? cube1Value=cube.getAttribute('cubevalue') : cube2Value=cube.getAttribute('cubevalue');
                });
                console.log(`cubes: ${cube1Value} ${cube2Value}`);
            //==========================================================================================================
               
            //===Make animate move on play step / play field cards (go to playFieldCard - go to each with deley)
                let playStepsCount=+cube1Value+ +cube2Value;
                //let playStepsCount=3;
                let newPlayFieldCardPosition=getCurrentPlayerPosition();
                console.log(`newPlayFieldCardPosition start - ${newPlayFieldCardPosition}`) 
                let bonusForFullPlayFieldRoundFlag=false;
                let playStepsCounter=0;
                let playStepsTimerDelay = 200;
                let playStepsTimer = setTimeout(function request() {
                    if(playStepsCounter<playStepsCount){
                        playStepsCounter++;
                        playStepsTimer = setTimeout(request, playStepsTimerDelay);
                        newPlayFieldCardPosition= newPlayFieldCardPosition+1;
                        console.log(`newPlayFieldCardPosition before - ${newPlayFieldCardPosition}`)                         
                        if(newPlayFieldCardPosition>=CardsData.length){
                            newPlayFieldCardPosition= newPlayFieldCardPosition-CardsData.length;
                            console.log(`newPlayFieldCardPosition check - ${newPlayFieldCardPosition}`)
                            bonusForFullPlayFieldRoundFlag=true;
                        }                    
                        console.log(`newPlayFieldCardPosition after ${newPlayFieldCardPosition}`);
                        setCurrentPlayerPosition(newPlayFieldCardPosition);
                        props.reRenderPlayFieldSteps();
            //========================================================================================================== 
                    
                    }else{

            //===Do action on a focused step 
                //***bonus for full play round
                        if(bonusForFullPlayFieldRoundFlag /* &&  newPlayFieldCardPosition===0 /* 1 */){
                            bonusForFullPlayFieldRoundFlag=false;
                            moneyAddForPlayer(bonusForFullPlayFieldRound,getCurrentPlayer());
                            props.reRenderGameProcessInfo_Players();
                            alert(`Вітаємо! Отримай бонус за пройдене коло ${bonusForFullPlayFieldRound}$`);                              
                        }
                //***********************************************
                    console.log(`object ${newPlayFieldCardPosition}`);
                    let objectPrice= getObjectPrice(newPlayFieldCardPosition);
                    let objectOwner=getObjectOwner(newPlayFieldCardPosition);
                //***object owner (play field cards) is NOT empty and object owner not a 'owner prohibited'
                        
                        
                        if(objectOwner!==9999999){
                        //---is curent player owner object 
                            console.log(`objectOwner ${objectOwner}`);
                            console.log(`getCurrentPlayer() ${getCurrentPlayer()}`);
                            console.log(CardsData);
                            if(objectOwner===getCurrentPlayer()){
                                alert ('Це твій об\'єкт\nСтягуй вартість за користування об\'єктом з інших гравців, що сюди потраплять\nНабувай у власність більше об\'єктів даного типу і збільшуй плату за їх користування для інших гравців');
                        //-----------------------------------------------
                            }else{
                        //---IS NOT curent player owner object 
                                moneyStorneForPlayer(objectPrice, getCurrentPlayer());
                                moneyAddForPlayer(objectPrice,objectOwner);
                                props.reRenderGameProcessInfo_Players(); 
                                alert (`Це не твій об'єкт\nНеобхідно заплатити за його користування власнику ${objectPrice}$`);
                            }
                        //-----------------------------------------------
                        }

                //***********************************************
            
                //***object owner (play field cards) is empty and object owner not a 'owner prohibited'
                        
                        if(checkObjectOwner(newPlayFieldCardPosition)===false){                            
                        //---buy object or auction                            
                            let ObjectType=getObjectType(newPlayFieldCardPosition);
                            let ObjectName=getObjectName(newPlayFieldCardPosition);
                            let agrymentToButObject=window.confirm(`Бажаєте придбати об'єкт: ${ObjectType} - [${ObjectName}]?\n\n Вартість: ${objectPrice}$`);
                            if(getCurrentPlayerBudget()-objectPrice>=0 && agrymentToButObject === true){
                            //___buy object
                                console.log(`setPlayFieldCardOwner ${newPlayFieldCardPosition+1}; user: ${getCurrentPlayer()}`);
                                moneyStorneForPlayer(objectPrice, getCurrentPlayer());
                                setPlayFieldCardOwner(newPlayFieldCardPosition, getCurrentPlayer());
                                props.reRenderPlayFieldSteps(); 
                                props.reRenderGameProcessInfo_Players();  
                            //_______________________________________________                          
                            }else{
                            //___auction object
                                if(getCurrentPlayerBudget()-objectPrice<0 && agrymentToButObject === true){
                                    alert ('Нажаль у тебе недостатньо коштів на придбання цього об\'єкту \nБуде проведено аукціон');
                                }                                
                                alert ('аукціон (in progress)');
                            //_______________________________________________
                            }  
                        //-----------------------------------------------
                        } 
                //***********************************************

                //***object is a "Municipal treasures" type (object owner is 'owner prohibited')                       
                        if (checkMunicipalTreasuresTypeCard(newPlayFieldCardPosition)){
                            alert ('Міська скарбниця (in progress)');
                        }
                //***********************************************
                    
                //***object is a "Chance" type  (object owner is 'owner prohibited')                          
                    if (checkChanceTypeCard(newPlayFieldCardPosition)){
                        alert ('Шанс (in progress)');
                    }
                //***********************************************

                //***object is a "Bunker" type  (object owner is 'owner prohibited')                         
                    if (checkBunkerTypeCard(newPlayFieldCardPosition)){
                        alert ('Бункер (in progress)');
                    }
                //***********************************************

                //***object is a "Lotery" type  (object owner is 'owner prohibited')                         
                    if (checkLoteryTypeCard(newPlayFieldCardPosition)){
                        alert ('Лотерея (in progress)');
                    }
                //***********************************************

                //***object is a "Donate for ZSU" type  (object owner is 'owner prohibited')                         
                    if (checkZSUDonateTypeCard(newPlayFieldCardPosition)){
                        alert (`Ви донатите на ЗСУ - ${objectPrice}$ \nТак тримати!`);
                        moneyStorneForPlayer(objectPrice, getCurrentPlayer());
                        setBankSum(bankSum+objectPrice);
                    }
                //***********************************************

                //***object is a "Prison" type  (object owner is 'owner prohibited')                         
                    if (checkPrisonTypeCard(newPlayFieldCardPosition)){
                        alert ('В\'язниця (in progress)');
                    }
                //***********************************************

                //***object is a "Step burn" type  (object owner is 'owner prohibited')                         
                    if (checkChornobaivkaTypeCard(newPlayFieldCardPosition)){
                        alert ('Чорнобаївка (in progress)');
                    }
                //***********************************************
                
                //***go to next player
                    let nextPlayer = getCurrentPlayer()+1; //Math.floor(Math.random() * ((PlayersData.length-1) - 0) + 0);
                    nextPlayer = nextPlayer < PlayersData.length ?  nextPlayer : 0;
                    //nextPlayer=0;
                    console.log(`nextPlayer ${nextPlayer+1}`);
                    setCurrentPlayer(nextPlayer);
                    props.reRenderGameProcessInfo_Players();
                    props.reRenderPlayFieldSteps();
                //***********************************************
            //==========================================================================================================
                        playStepsTimer='';
                        return playStepsTimer;
                    }            
                }, playStepsTimerDelay);


                generateCubeTimer='';
                return generateCubeTimer;
            }            
        }, generateCubeTimerDelay);   
        
    }

    //props.reRenderGameProcessInfo();
    //props.reRenderPlayFieldSteps();
    

    return(
        <div className={`game-control-poins${props.hidden ? " game-control-poins--hidden": ""}`}>
            <button className="game-control-poins__item"
                    /* onClick={setTimeout(RandomPlayCubes, 1000)} */
                    >
                Продати об'єкт
            </button>
            <button className="game-control-poins__item game-control-poins__make-move "
                    /* onClick={setTimeout(RandomPlayCubes, 1000)} */
                    onClick={GenerateEffectCubes}
                    >
                <div className='game-control-poins__play-cubes'>
                    {PlayCube1}
                    {PlayCube2}
                </div>
            </button>
        </div>
    )
}