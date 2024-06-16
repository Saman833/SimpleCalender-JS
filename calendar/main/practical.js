class Mount{
    nextMonth=undefined
    perviusMonth=undefined
    firstDay=undefined;
    order=undefined;
    daysOfWeek=['S','M','T','W','T','F','S'];
    constructor(name, numberOfDays,firstDay) {
        this.name = name;
        this.numberOfDays = numberOfDays;
        this.firstDay=firstDay;
    };
    setNextMonth(nextMonth){
          this.nextMonth=nextMonth;
    }
    pickFristDay(firstDay){
        this.firstDay=firstDay;
    }
    setPreviousMonth(perviusMonth){
        this.perviusMonth=perviusMonth;
    }
    getNextMonth(){
        return this.nextMonth;
  }
     getPreviousMonth(){
      return this.perviusMonth;
  }
}
function showAccept(){
    let x=document.getElementById("alertBox");
    x.style.display="block";
     document.getElementById("alertBox").innerHTML =
     ' <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>'+
        '<strong>Alert!</strong> This is an alert message'
     ;
     setTimeout(function() {
        x.style.display = 'none';
    }, 2000);
    // window.alert("you accepted all of the conditions")
}
function makeMounts(){
    const months = [
        new Mount("January", 31),
        new Mount("February", 28),
        new Mount("March", 31),
        new Mount("April", 30),
        new Mount("May", 31),
        new Mount("June", 30),
        new Mount("July", 31),
        new Mount("August", 31),
        new Mount("September", 30),
        new Mount("October", 31),
        new Mount("November", 30),
        new Mount("December", 31)
    ];
    months[0].pickFristDay(2);
    for (let i=0; i<months.length; i++){
        months[i].order=i;
        months[i].setNextMonth(months[(i+1)%months.length]);
        months[i].setPreviousMonth(months[(i-1+months.length)%months.length]);
        if(i>0){
            months[i].pickFristDay((months[i-1].firstDay+months[i-1].numberOfDays)%7);
        }
    }
    calenderMount=setDefualtMount(months);
}
function setDefualtMount(mounts){
    let today = new Date();
    let currentMonth = today.getMonth();
    let thisMount=mounts[0];
    while(thisMount.order!==currentMonth) goNextMount();
    function goNextMount(){
        thisMount=thisMount.getNextMonth();
    }
    function goPreviousMount(){
        thisMount=thisMount.getPreviousMonth();
    }
    function getThisMount(){
        return thisMount;
    }
    return {
        goNextMount,
        goPreviousMount,
        getThisMount,
    };
}
function gridBox(){
    let myGrid=document.getElementById("gridBox");
    myGrid.className="calendar-container";
    let injectHTML =`
    <div class="calendar">
    <div> 
      <span style="position: relative; right: 125px; width:30px"> ${calenderMount.getThisMount().name} </span>
      <span style="position: relative; left: 90px;"> 
        <span >2023</span>
        <span style="position: relative; left: 30px;"> <button onclick="calenderMount.goNextMount(); gridBox();"> < </button>  </span> 
        <span style="position: relative; left: 40px;"> <button onclick="calenderMount.goPreviousMount(); gridBox();"> > </button> </span>
      </span> 
    </div>
    <div class="calendar-row days-of-week"> 
    <div>S</div>
    <div>M</div>
    <div>T</div>
    <div>W</div>
    <div>T</div>
    <div>F</div>
    <div>S</div>
 </div>`;
    let today = new Date();
    let currentDay = today.getDate();
    let currentMonth = today.getMonth();
    let days=[];
    for (let day=0; day<calenderMount.getThisMount().firstDay; day++){  
        days.push(calenderMount.getThisMount().getPreviousMonth().numberOfDays-day);
    }
    days.reverse();
    for (let day=1; day<=calenderMount.getThisMount().numberOfDays; day++){
        days.push(day);
    }
    for (let day=1; days.length<42; day++){
        days.push(day);
    }
    for (let i=0; i<6; i++){
        let row = "";
        row+='<div class="calendar-row">';
        
        for (let j=0; j<7; j++){
            if (days[i*7+j]===currentDay && currentMonth === calenderMount.getThisMount().order)
            row+=`<div class="write-in-Center" style="  border: 2px;border-radius: 50%;padding: 2px;  background-color: #ceb0b0;">${days[i*7+j]} </div>`;            
            else 
            row+=`<div class="write-in-Center"> ${days[i*7+j]} </div>`;
        }
        row+="</div>";
        injectHTML+= row;
    }
    injectHTML+=`</div>`;
    myGrid.innerHTML=injectHTML;
}
makeMounts();
