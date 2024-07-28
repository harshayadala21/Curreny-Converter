const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");


for(let i=0;i<dropList.length;i++){
  for(currency_code in country_list){
    let selected;
    if(i==0){
      selected = currency_code=="USD" ? "selected" : "";
    }
    else if(i==1){
      selected = currency_code=="INR" ? "selected": "";
    }

      let optionTag=`<option value="${currency_code}" ${selected}>${currency_code}</option>`;
      dropList[i].insertAdjacentHTML("beforeend",optionTag);

  }
  dropList[i].addEventListener("change", e=> {
    loadFlag(e.target);
  });

}

function loadFlag(element){
  for(code in country_list){
    if(code==element.value){
      let imgtag=element.parentElement.querySelector("img");
      imgtag.src=`https://flagsapi.com/${country_list[code]}/flat/64.png`;
    }
  }
}

window.addEventListener("load", e=>{
  // e.preventDefault();
  getExchangeRate();
});

getButton.addEventListener("click", e=>{
  e.preventDefault();
  getExchangeRate();
});


const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click" , ()=>{
  let temp=fromCurrency.value;
  fromCurrency.value=toCurrency.value;
  toCurrency.value=temp;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
})


function getExchangeRate(){
  const amount=document.querySelector(".amount input"),
  exchangeRateTxt = document.querySelector(".exchange-rate");
  let amountVal=amount.value ;
  if(amountVal=="" || amountVal=="0"){
    amount.value="1";
    amountVal=1;
  }
  exchangeRateTxt.innerText="Getting exchange rate...";
  let url=` https://v6.exchangerate-api.com/v6/cb2697f4be092e5a2933438f/latest/${fromCurrency.value}`;
  fetch(url).then(response=> response.json()).then(result=> {
    let exchangeRate=result.conversion_rates[toCurrency.value];
    let totalExchangeRate =(amountVal * exchangeRate);
    const exchangeRateTxt =document.querySelector(".exchange-rate");
    exchangeRateTxt.innerText=`${amountVal} ${fromCurrency.value}=${totalExchangeRate} ${toCurrency.value}`;

  }).catch(()=> {
    exchangeRateTxt.innerText="Something Went Wrong";
    }
  )
}