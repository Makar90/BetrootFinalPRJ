export let PlayersData=[
    /*{
        playerName:playerName,
        playerColor:playerColor,
        playerBudget:8000,
        playerPlayFieldPosition:0,
        playetCurrentMove:elementItem===0 ? true:false,
        playerActive:true
    };  */ 
];

export function getCurrentPlayerPosition(){
    let currentPlayerPosition;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayerPosition=item.playerPlayFieldPosition
        }
    });
    return currentPlayerPosition;
}

export function setCurrentPlayerPosition(position){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playerPlayFieldPosition=position;
        }
    });
}

export function getCurrentPlayerColor(){
    let currentPlayerColor;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayerColor=item.playerColor
        }
    });
    return currentPlayerColor;
}

export function getCurrentPlayer(){
    let currentPlayer;
    PlayersData.forEach((item,index)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayer=index;
        }
    });
    return currentPlayer;
}

export function setCurrentPlayer(playerNum){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playetCurrentMove=false;
        }
    });
    PlayersData.forEach((item, index)=>
    {
        if(index===playerNum){
            item.playetCurrentMove=true;
        }
    });
}



