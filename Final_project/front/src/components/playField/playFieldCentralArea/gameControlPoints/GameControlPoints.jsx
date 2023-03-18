import './index.css';

import { useState } from "react";

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
        let delay = 40;
        let counter=0;
        let effectsNum=20;
        let timerId = setTimeout(function request() {
            if(counter<effectsNum){
                timerId = setTimeout(request, delay);
                counter++;
                setPlayCube1(getPlayCube());        
                setPlayCube2(getPlayCube());        
            }else{
                let elementCubes=document.querySelectorAll('.game-control-poins__play-cube');
                elementCubes.forEach((cube, cubeNum)=>{
                    console.log(`cube${cubeNum+1}= ${cube.getAttribute('cubevalue')}`);
                });

                timerId='';
                return timerId;
            }            
        }, delay);         
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