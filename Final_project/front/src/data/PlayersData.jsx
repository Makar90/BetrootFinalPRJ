export let PlayersData=[
    /*{
        playerName:playerName,
        playerColor:playerColor,
        playerBudget:8000,
        playerPlayFieldPosition:0,
        playetCurrentMove:elementItem===0 ? true:false,
        playerActive:true,
        playerSkipStep:0,
        remoteStepPosibility: false
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
    return +currentPlayerPosition;
};

export function getCurrentPlayerPName(){
    let currentPlayerName;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayerName=item.playerName;
        }
    });
    return currentPlayerName;
};

export function getPlayerPName(playerNum){
    let PlayerName;
    PlayersData.forEach((item, index)=>
    {
        if(index===playerNum){
            PlayerName=item.playerName;
        }
    });
    return PlayerName;
};

export function setCurrentPlayerPosition(position){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playerPlayFieldPosition=position;
        }
    });
};

export function getCurrentPlayerColor(){
    let currentPlayerColor;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayerColor=item.playerColor
        }
    });
    return currentPlayerColor;
};

export function getCurrentPlayerBudget(){
    let currentPlayerBudget;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayerBudget=item.playerBudget;
        }
    });
    return +currentPlayerBudget;
};

export function getPlayerColor(playerId){
    let PlayerColor;
    PlayersData.forEach((item, index)=>
    {
        if(index===playerId){
            PlayerColor=item.playerColor
        }
    });
    return PlayerColor;
};

export function getCurrentPlayerNum(){
    let currentPlayer;
    PlayersData.forEach((item,index)=>
    {
        if(item.playetCurrentMove===true){
            currentPlayer=index;
        }
    });
    return +currentPlayer;
};

export function setCurrentPlayer(playerNum){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playetCurrentMove=false;
        }
    });
    PlayersData.forEach((item, index)=>
    {
        if(index=== +playerNum){
            item.playetCurrentMove=true;
        }
    });
};

export function moneyAddForPlayer(sum, playerId){
    PlayersData.forEach((item, index)=>
    {
        if(index===playerId){
            item.playerBudget=+item.playerBudget+ +sum;
        }
    });
};

export function moneyStorneForPlayer(sum, playerId){
    PlayersData.forEach((item, index)=>
    {
        if(index===playerId){
            item.playerBudget=+item.playerBudget+ -sum;
        }
    });
};

export function getCurrentPlayerSkipStep(){
    let playerSkipStep;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            playerSkipStep=item.playerSkipStep;
        }
    });
    return +playerSkipStep;
};

export function setCurrentPlayerSkipStepPlusNum(stepsCount){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playerSkipStep=item.playerSkipStep+ +stepsCount;
        }
    });
};

export function setCurrentPlayerSkipStepMinusNum(stepsCount){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.playerSkipStep=item.playerSkipStep - +stepsCount;
        }
    });
};

export function getCurrentPlayerRemoteStepPosibility(){
    let CurrentPlayerRemoteStepPosibility;
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            CurrentPlayerRemoteStepPosibility=item.remoteStepPosibility;
        }
    });
    return CurrentPlayerRemoteStepPosibility;
};

export function setCurrentPlayerRemoteStepPosibility(flag){
    PlayersData.forEach((item)=>
    {
        if(item.playetCurrentMove===true){
            item.remoteStepPosibility=flag;
        }
    });
};



