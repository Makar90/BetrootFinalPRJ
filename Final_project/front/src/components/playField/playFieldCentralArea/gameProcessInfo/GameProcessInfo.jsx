import './index.css';
import {PlayersData} from '../../../../data/PlayersData';

export default function gameProcessInfo (props){
    let playersCards=PlayersData.map((item, index)=>
        <div className="game-process-info__player"
                key={index}
                style={{backgroundColor:item.playerColor, width:`${(100/PlayersData.length)-2}%`}}>
            <h4 className="game-process-info__player-name">{item.playerName}</h4>
            <h5 className="game-process-info__player-budget">{item.playerBudget}$</h5>
        </div>
    ) 
    return(
        <div className={`game-process-info${props.hidden ? " game-process-info--hidden": " game-process-info--noHidden"}`}>
            <h3 className="game-process-info__game-budget">Банк: {props.gameBudget}$</h3>
            <div className="game-process-info__players-line">
                {/* <div className="game-process-info__player">
                    <h4 className="game-process-info__player-name">Igor {props.playerName}</h4>
                    <h4 className="game-process-info__player-budget">$ 1000 {props.playerBudget}</h4>
                </div> */}
                {playersCards}
            </div>
        </div>
    )
}