let btcPrice = 0;
let ltcPrice = 0;
let dogePrice = 0;

async function getBtcPrice(){

    if (btcPrice !== 0) {
    
        document.getElementById('oneBtcPrice')
        .innerHTML = " $" +  Number.parseFloat(btcPrice).toFixed(2);
    
    }else{

    try{
        fetch('https://api.coincap.io/v2/assets')

    .then(response => {
    
    if(response.status !== 200){
    
        throw new Error(`Request error! ${response.status} ${response.statusText}`);
    
    }else if (response.ok == false){
        
        throw new Error("Request ok is false!")
    
    }
    return response.json() // can be .json() or text()
    })
    .then(function(crypto){
    
        console.log(crypto.data);
    
    console.log(crypto.data[0].priceUsd); //BTC
    console.log(crypto.data[19].priceUsd); //LTC
    console.log(crypto.data[12].priceUsd); //Doge
    
    btcPrice = crypto.data[0].priceUsd;
    ltcPrice = crypto.data[19].priceUsd;
    dogePrice = crypto.data[12].priceUsd;

    document.getElementById('oneBtcPrice')
        .innerHTML = " $" +  Number.parseFloat(btcPrice).toFixed(2);
    
    })
    .catch(err => {
    console.error(err);
    });
    
    }catch(error){
        document.querySelector('#oneBtcPrice').textContent = "Error!";
    }
}
}

window.addEventListener('load',getBtcPrice);

let usdOrBtc = document.getElementById('usdOrBtc');
usdOrBtc.addEventListener('change', function(){

    if (usdOrBtc.value === 'usdToBtc'){
        document.querySelector('.inputs')
    .innerHTML = '<input id="usd" type="number" placeholder="Enter USD" step="0.01">';

    }else {
        document.querySelector('.inputs')
    .innerHTML = '<input id="btc" type="number" placeholder="Enter BTC" step="0.000000001"></input>';

    }

    

});

function convert(){

    if (usdOrBtc.value === 'usdToBtc'){

        let usd = document.getElementById('usd').value;

        if (usd !== undefined && usd !== null && usd !== "" && usd !== '0'){

            let sum = usd / btcPrice;
             console.log('the converted sum is ' + sum);
     
             document.getElementById('currency')
                     .textContent = 'BTC ';
     
             document.getElementById('amount')
                     .textContent = sum.toFixed(9);
         }

    }else {

        let btc = document.getElementById('btc').value;

        if (btc !== undefined && btc !== null && btc !== "" && btc !== '0'){

            let sum = btc * btcPrice;
             console.log('the converted sum is ' + sum);
     
             document.getElementById('currency')
                     .textContent = 'BTC ';
     
             document.getElementById('amount')
                     .textContent = sum.toFixed(9);
         }
    }

}