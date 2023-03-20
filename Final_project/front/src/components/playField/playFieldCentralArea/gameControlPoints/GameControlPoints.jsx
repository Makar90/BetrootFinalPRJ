import './index.css';

import { useState } from "react";
import {PlayersData,
        getCurrentPlayerNum,
        setCurrentPlayer,
        getCurrentPlayerPName,
        getCurrentPlayerPosition,
        setCurrentPlayerPosition,
        getCurrentPlayerBudget,
        moneyAddForPlayer,
        moneyStorneForPlayer,
        getCurrentPlayerSkipStep,
        setCurrentPlayerSkipStep,
        setCurrentPlayerNotSkipStep
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
        checkChornobaivkaTypeCard,
        repriceForAllCardsByOneOwnerAndType,
        getRepricePrice_ForAllCardsByOneOwnerAndTypePlusOneObject
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
                //playStepsCount=38;
                let newPlayFieldCardPosition=getCurrentPlayerPosition();
                console.log(`newPlayFieldCardPosition start - ${newPlayFieldCardPosition}`) 
                let bonusForFullPlayFieldRoundFlag=false;
                let playStepsCounter=0;
                let playStepsTimerDelay = 100;
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
                        props.reRenderGameProcessInfo_Players();
            //========================================================================================================== 
                    
                    }else{

                    //===Do action on a focused step 
                        
                        function BonusforRound(bonusForFullPlayFieldRoundFlag){
                            //***bonus for full play round
                            if(bonusForFullPlayFieldRoundFlag /* &&  newPlayFieldCardPosition===0 /* 1 */){
                                bonusForFullPlayFieldRoundFlag=false;
                                moneyAddForPlayer(bonusForFullPlayFieldRound,getCurrentPlayerNum());
                                props.reRenderGameProcessInfo_Players();
                                alert(`Вітаємо! Тобі прилетів бонус за пройдене коло: ${bonusForFullPlayFieldRound}$`);                              
                            }
                            //***********************************************
                        };

                        function BuyNotEmptyOwnerObject(objectOwner, objectPrice){
                            //***object owner (play field cards) is NOT empty and object owner not a 'owner prohibited'
                            if(objectOwner!==9999999){
                                //---is curent player owner object 
                                console.log(`objectOwner ${objectOwner}`);
                                console.log(`getCurrentPlayer() ${getCurrentPlayerNum()}`);
                                console.log(CardsData);
                                if(objectOwner===getCurrentPlayerNum()){
                                    alert ('Це твій об\'єкт\nСтягуй вартість оренди об\'єкту з інших гравців, що сюди потрапляють\nНабувай у власність більше об\'єктів даного типу і збільшуй орендну плату');
                                //-----------------------------------------------
                                }else{
                                //---IS NOT curent player owner object 
                                    moneyStorneForPlayer(objectPrice, getCurrentPlayerNum());
                                    moneyAddForPlayer(objectPrice,objectOwner);
                                    props.reRenderGameProcessInfo_Players(); 
                                    alert (`Цей об'єкт має власника\nНеобхідно заплатити за його оренду: ${objectPrice}$`);
                                }
                                //-----------------------------------------------
                            }
                            //***********************************************
                        };
                        function BuyEmptyOwnerObject(newPlayFieldCardPosition, objectPrice){   
                            //***object owner (play field cards) is empty and object owner not a 'owner prohibited' 
                            if(checkObjectOwner(newPlayFieldCardPosition)===false){                            
                                //---buy object or auction                            
                                let ObjectType=getObjectType(newPlayFieldCardPosition);
                                let ObjectName=getObjectName(newPlayFieldCardPosition);                           
    
    
                                if(getCurrentPlayerBudget()-objectPrice<0){
                                    //___auction object 
                                    alert ('Нажаль у тебе недостатньо коштів на придбання цього об\'єкту \nБуде проведено аукціон');
                                    objectAuction(ObjectType, ObjectName, objectPrice);
                                    //_______________________________________________ 
                                }else if(window.confirm(`Бажаєте придбати об'єкт?\n     ${ObjectType}\n     ${ObjectName}\nВартість: ${objectPrice}$\nЦіна оренди твоїх об'єктів цього типу становитиме: ${getRepricePrice_ForAllCardsByOneOwnerAndTypePlusOneObject(getCurrentPlayerNum(), newPlayFieldCardPosition)}$\n\nГравцям рекомендується купувати будь-яку власність, оскільки якщо в банку залишаються непродані об'єкти, втрачається інтерес до гри`)){
                                    //___buy object
                                    console.log(`setPlayFieldCardOwner ${newPlayFieldCardPosition}; user: ${getCurrentPlayerNum()}`);
                                    moneyStorneForPlayer(objectPrice, getCurrentPlayerNum());
                                    setPlayFieldCardOwner(newPlayFieldCardPosition, getCurrentPlayerNum());
                                    repriceForAllCardsByOneOwnerAndType(getCurrentPlayerNum(), newPlayFieldCardPosition)
                                    props.reRenderPlayFieldSteps(); 
                                    props.reRenderGameProcessInfo_Players();
                                    alert (`Вітаємо тебе ${getCurrentPlayerPName()}! \nОб'єкт:\n     ${ObjectType}\n     ${ObjectName}\nнабуто у власність`);  
                                    //_______________________________________________ 
                                }else{
                                    //___auction object  
                                        objectAuction(ObjectType, ObjectName, objectPrice);  
                                    }
                                    //_______________________________________________ 
                                //-----------------------------------------------
                            }
                            //***********************************************
                        };
                        

                        function ifMunicipalTreasuresTypeCardStep(){
                            //***object is a "Municipal treasures" type (object owner is 'owner prohibited')                       
                            if (checkMunicipalTreasuresTypeCard(newPlayFieldCardPosition)){
                                alert ('Міська скарбниця (in progress)');
                            }
                            //***********************************************
                        };
                        function ifChanceTypeCardStep(){
                            //***object is a "Chance" type  (object owner is 'owner prohibited')                          
                            if (checkChanceTypeCard(newPlayFieldCardPosition)){
                                alert ('Шанс (in progress)');
                            }
                            //***********************************************
                        };
                        function ifBunkerTypeCardStep(){
                            //***object is a "Bunker" type  (object owner is 'owner prohibited')                         
                            if (checkBunkerTypeCard(newPlayFieldCardPosition)){
                                alert ('Бункер (in progress)');
                            }
                            //***********************************************
                        };
                        function ifLoteryTypeCardStep(){
                            //***object is a "Lotery" type  (object owner is 'owner prohibited')                         
                            if (checkLoteryTypeCard(newPlayFieldCardPosition)){
                                alert ('Лотерея (in progress)');
                            }
                            //***********************************************
                        };
                        function ifZSUDonateTypeCardStep(){
                            //***object is a "Donate for ZSU" type  (object owner is 'owner prohibited')                         
                            if (checkZSUDonateTypeCard(newPlayFieldCardPosition)){
                                alert (`ти донатиш на ЗСУ - ${objectPrice}$ \nТак тримати!`);
                                moneyStorneForPlayer(objectPrice, getCurrentPlayerNum());
                                setBankSum(bankSum+objectPrice);
                            }
                            //***********************************************
                        };
                        function ifPrisonTypeCardStep(){
                            //***object is a "Prison" type  (object owner is 'owner prohibited')                         
                            if (checkPrisonTypeCard(newPlayFieldCardPosition)){
                                alert ('В\'язниця (in progress)');
                            }
                            //***********************************************
                        };
                        function ifChornobaivkaTypeStep(){        
                            //***object is a "Step burn" type  (object owner is 'owner prohibited')                         
                            if (checkChornobaivkaTypeCard(newPlayFieldCardPosition)){
                                SkipNextStepForPlayer();
                            }
                            //***********************************************
                        };                        

                        function GoToNextPlayerStep (){
                            //***go to next player
                                let nextPlayer = getCurrentPlayerNum()+1; //Math.floor(Math.random() * ((PlayersData.length-1) - 0) + 0);
                                nextPlayer = nextPlayer < PlayersData.length ?  nextPlayer : 0;
                                //nextPlayer=0;
                                setCurrentPlayer(nextPlayer);
                                props.reRenderGameProcessInfo_Players();
                                props.reRenderPlayFieldSteps();

                                if(getCurrentPlayerSkipStep()){                                    
                                    alert(`${getCurrentPlayerPName()}, даний хід доведеться пропустити :(`);
                                    setCurrentPlayerNotSkipStep();
                                    GoToNextPlayerStep ();                                    
                                }
                                props.reRenderGameProcessInfo_Players();
                                props.reRenderPlayFieldSteps();   
                            //***********************************************
                        };




                        function objectAuction(ObjectType, ObjectName, objectPrice){
                            alert (`аукціон (in progress)\n ${ObjectType} - [${ObjectName}]: ${objectPrice}`);
                        };
                        function SkipNextStepForPlayer(){
                            alert (`${getCurrentPlayerPName()}, нажаль наступний хід ти пропускаєш :(\n Але не здавайся! :)`);
                            setCurrentPlayerSkipStep();
                        }
                        



                        BonusforRound(bonusForFullPlayFieldRoundFlag);
                        let objectPrice= getObjectPrice(newPlayFieldCardPosition);
                        let objectOwner=getObjectOwner(newPlayFieldCardPosition);
                        BuyNotEmptyOwnerObject(objectOwner, objectPrice);
                        BuyEmptyOwnerObject(newPlayFieldCardPosition, objectPrice);  

                        ifMunicipalTreasuresTypeCardStep();
                        ifChanceTypeCardStep();
                        ifBunkerTypeCardStep();
                        ifLoteryTypeCardStep();
                        ifZSUDonateTypeCardStep();
                        ifPrisonTypeCardStep();
                        ifChornobaivkaTypeStep();
                        
                        GoToNextPlayerStep ();                
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
                Управління об'єктами
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