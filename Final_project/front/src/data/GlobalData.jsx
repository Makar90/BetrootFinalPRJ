export let playersMinNum=2;
export let playersMaxNum=5;

export let bankMinSum=8000;
export let bankMaxSum=16000;

export function getrandomColorHEX () {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}; 

export function checkMinMaxPlayers(numPlayers){
    if (+numPlayers > playersMaxNum || +numPlayers<playersMinNum){
        alert(`Тільки від ${playersMinNum} до ${playersMaxNum} гравців`); 
        return false;
    } else{    
    return true;
    }
};