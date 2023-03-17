import './index.css';

import { useState } from "react";

//import { useState } from "../../../../../public/img/cube-sides/";


export default function GameControlPoints(props){
    const [PlayCube1, setPlayCube1] = useState(/* getPlayCube('setCube1') */);
    const [PlayCube2, setPlayCube2] = useState(/* getPlayCube('setCube2') */);


    function getPlayCube(comm){
        let RandValue=Math.floor(Math.random() * (6 - 1) + 1);
        let cubeImage='';
        switch (RandValue) {
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
                    cubevalue={RandValue}
                    style={{backgroundImage:`url(${cubeImage})`, backgroundSize:'contain', backgroundColor:'gray', width:'50px', height:'50px'}}>
            </div>);
        //console.log(`${comm} = ${RandValue}` );
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
                //console.log(`randome cube counter = ${counter}`);
                //delay+=counter*2;
                setPlayCube1(getPlayCube('cube1'));        
                setPlayCube2(getPlayCube('cube2'));        
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

    return(
        <div className={`game-control-poins${props.hidden ? " game-control-poins--hidden": ""}`}>
            <button className="game-control-poins__make-move"
                    /* onClick={setTimeout(RandomPlayCubes, 1000)} */
                    onClick={GenerateEffectCubes}>
                Продати об'єкт
            </button>
            <button className="game-control-poins__make-move"
                    /* onClick={setTimeout(RandomPlayCubes, 1000)} */
                    onClick={GenerateEffectCubes}>
                Зробити хід
            </button>
            <div className='game-control-poins__play-cubes'>
                {PlayCube1}
                {PlayCube2}
            </div>
        </div>
    )
}