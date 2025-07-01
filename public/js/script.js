
// Function to update real-time and date every second
function updateTimeAndDate() {
    const realTimeElement = document.getElementById('real-time');
    const realDateElement = document.getElementById('real-date');

    // Update time and date every second
    setInterval(() => {
        const now = new Date();

        // Format time (hh:mm:ss)
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const time = `${hours}:${minutes}:${seconds}`;

        // Format date (YYYY-MM-DD)
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;

        // Update the content of elements
        realTimeElement.textContent = ` ${time}`;
        realDateElement.textContent = ` ${date}`;
    }, 1000); // Update every second (1000 milliseconds)
}


updateTimeAndDate();

let availableKeywords=[

     'New Delhi',  'Chennai', 'Bangalore', 'Kolkata', 'Delhi', 'Patna', 'Ahmedabad', 'Agra', 'Varanasi', 'Lucknow', 'Mumbai', 'Goa', 'Jaipur', 'Chandigarh','Bhubaneswar', 'Visakhapatnam',  'Surat',  'Kanpur',  'Mysore',  'Secunderabad', 'Vijayawada', 'Jodhpur', 'Howrah', 'Puri',  'Kanp'
];

const resultbox = document.querySelector('.result_box');
const InpfromCity = document.getElementById('FromCity');
const result_box1= document.querySelector('.result_box1');
const inpToCity=document.getElementById('toCity');
function autuCurrectFun(resultbox,InpfromCity){
InpfromCity.onkeyup= function(){
    let result=[];
    let input = InpfromCity.value;
    if(input.length){
        result=availableKeywords.filter((keyword)=>{
           return  keyword.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result);
    }
    displayResult(result);
     if(!result.length){
        resultbox.innerHTML='';
     }
}

function displayResult(result){
    const content =result.map((list)=>{
        return `<li onclick=selectInput(this)> ${list}</li> `;
    });
    resultbox.innerHTML=`<ul> ${content.join('')} </ul>`;
}

function selectInput(list){
InpfromCity.value=list.innerHTML;
 resultbox.innerHTML='';
};
}
 autuCurrectFun(resultbox,InpfromCity);
 autuCurrectFun(result_box1,inpToCity);


 document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', () => {
      
        window.location.href = '/login';
    });
});

