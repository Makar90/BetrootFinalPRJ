export let playersMinNum=2;
export let playersMaxNum=6;

export let bankSum= 266000;//194500;
export let bankMaxSum=300000;
export let bankMinSum=100000;


export let playerMoney=8000;
export let playerMaxMoney=(bankMaxSum/2)/playersMaxNum;

export function setBankSum(value){
    bankSum=value;  
};

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