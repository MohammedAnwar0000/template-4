let name =document.getElementById('name');
let price =document.getElementById('price');
let discount =document.getElementById('discount');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let total =document.getElementById('total');
let totalV =document.getElementById('total-v');
let count =document.getElementById('count');
let catagory =document.getElementById('catagory');
let create =document.getElementById('careat');

let sbt =document.getElementById('sbt');
let sbc =document.getElementById('sbc');
let deleteAll =document.getElementById('deleteAll');
let tbody =document.getElementById('tbody')
let mood= create;
let updateIndex;
//----------------- get total----------------//
function getTotal(){
    if( price.value !='' & price.value >=0) {
        totalPrice =(+price.value + +taxes.value + +ads.value)- (+discount.value) ;
        totalV.innerHTML= (totalPrice);
        totalV.style.display='inline-block'

    }else{
        totalV.innerHTML=""
    }
}

//-------------- create element ------------//
let cruds;
if(localStorage.product !=null){
    cruds= JSON.parse(localStorage.product )
}
else{
    cruds =[];
}
create.onclick=function(){
    if(name.value !='' && price.value !=''&& totalV.value !=''&& catagory.value !='' ){
        let crudsPro={
        name:name.value.toLowerCase(),
        price:price.value,
        discount:discount.value,
        taxes:taxes.value,
        ads:ads.value,
        totalV:totalV.innerHTML,
        count:count.value,
        catagory:catagory.value.toLowerCase(),
    }
    if(mood === create){
        if(crudsPro.count >1){
        for(let i=0 ;i<crudsPro.count;i++){
                cruds.push(crudsPro);
    } 
      }
      else{
          cruds.push(crudsPro);
      }
    }else{
        cruds[ updateIndex ]= crudsPro;
        count.style.display='block';
        careat.value='create'  ; 
        mood = create;
       
    }  
    localStorage.setItem('product',JSON.stringify(cruds))
    clearInput();
    newElement();
    }
    deleted();
}
// ---------clear input----//
function clearInput(){
    name.value='';
    price.value='';
    discount.value='';
    taxes.value='';
    ads.value='';
    totalV.innerHTML='';
    count.value='';
    catagory.value='';
}
// ---------newElement--------//
function newElement(){
    let table='';
    for(let i = 0; i < cruds.length; i++){
       table +=`
       <tr>
         <td>${i+1}</td>
         <td>${cruds[i].name}</td>
         <td>${cruds[i].price}</td>
       
        <td>${cruds[i].taxes}</td>
        <td>${cruds[i].ads}</td>
        <td>${cruds[i].discount}</td>
        <td>${cruds[i].totalV}</td>
        <td>${cruds[i].catagory}</td>
        <td><input onclick="update(${i})" type="button" value="update"></td>
        <td><input onclick="deleteElement(${i})" type="button" value="delete"></td>
   </tr> 
   
        `;
        tbody.innerHTML=table;
    }
}
newElement()
// ---------delete element--------//
function deleteElement(i){
    cruds.splice(i,1);
    localStorage.product=JSON.stringify(cruds);
   if(tbody.length=1){
       tbody.innerHTML =''
   }
   deleted();

   newElement();
      if(mood===update){
        document.getElementById('cruds').style.padding='0% 8%'
    }
else if(mood===create){
                 

}

    
 }
   
// -------delete all input---------------//
   function deleted(){
       
    if(cruds.length > 0){
        deleteAll.innerHTML = `
            <input id="deAll" onclick="clearData()" type="button" value="delete all(${cruds.length})">
            `
           
            document.getElementById('cruds').style.padding= '0% 8%'


            console.log(deleteAll)
    
        }else{
            deleteAll.innerHTML =''
            document.getElementById('cruds').style.padding='0% 8%'
        }
            
   }
   deleted();
// -------delete all-----------//
 function clearData(){
  localStorage.clear();
  cruds.splice(0);
  
  if(tbody.length=1){
          tbody.innerHTML ='';
  }
  newElement();
  deleted();
 }

function update(i){
    name.value=cruds[i].name
    price.value =cruds[i].price;
    taxes.value =cruds[i].taxes;
    ads.value =cruds[i].ads;
    discount.value =cruds[i].discount;
    catagory.value =cruds[i].name;
    count.style.display='none';
    careat.value='update'  ; 
    getTotal()
    mood = update;
    updateIndex = i;
 scroll({
     top:0,
 })
   

}
// ---------search--------//
let search =document.getElementById('search');
let searchMood = "title";
searchMood = "title";
function getSearchMood(id){
    if((id ==='sbt')){
        searchMood = "title";
        search.placeholder="search by title"
    }else{
        searchMood = "catagory";
        search.placeholder="search by catagory"
    }
    search.focus();
    search.value='';
    newElement();


}
function searchPro(value){
   let prg = document.getElementById('prg');
    let table='';
    if( searchMood === "title"){
         for(let i =0 ; i<cruds.length;i++){
             if(cruds[i].name.includes(value.toLowerCase())==true){
                 console.log(i)
                table +=`
                <tr>
                  <td>${i+1}</td>
                  <td>${cruds[i].name}</td>
                  <td>${cruds[i].price}</td>
                
                 <td>${cruds[i].taxes}</td>
                 <td>${cruds[i].ads}</td>
                 <td>${cruds[i].discount}</td>
                 <td>${cruds[i].totalV}</td>
                 <td>${cruds[i].catagory}</td>
                 <td><input onclick="update(${i})" type="button" value="update"></td>
                 <td><input onclick="deleteElement(${i})" type="button" value="delete"></td>
            </tr> 
            

                 `;
                 
                
             }else{
                tbody.innerHTML=''
                
             }
             tbody.innerHTML=table;
            //  prg.innerHTML='research results'+" "+(i)
    }
    }else{
        for(let i =0 ; i<cruds.length;i++){
            if(cruds[i].catagory.includes(value.toLowerCase())){
               table +=`
               <tr>
                 <td>${i+1}</td>
                 <td>${cruds[i].name}</td>
                 <td>${cruds[i].price}</td>
               
                <td>${cruds[i].taxes}</td>
                <td>${cruds[i].ads}</td>
                <td>${cruds[i].discount}</td>
                <td>${cruds[i].totalV}</td>
                <td>${cruds[i].catagory}</td>
                <td><input onclick="update(${i})" type="button" value="update"></td>
                <td><input onclick="deleteElement(${i})" type="button" value="delete"></td>
           </tr> 
           
                `;
               
            }else{
                tbody.innerHTML=''
                tbody.style.color='red'
              }
               tbody.innerHTML=table;
    }
   
}
}
