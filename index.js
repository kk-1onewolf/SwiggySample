console.log("Hello World3");
import foodData from "./data.json" assert {type: 'json'};
// console.log(data);


// mvc implementation
// model
let model={
modalData:foodData,
init:function(data){
   this.modelData=data;
},
sendData: function(){
  return this.modalData;
}

};
// view
let view={
  init: function(){
    this.render();
  },
  
 buildFoodTemplate: function(foods) {
    return `
    <div class="${foods.id}">
    <h class="item_name">${foods.food_name}</h>
    <h3 class="item__price">${foods.price}</h3>
    <p class="item__info">${foods.food_description}</p>
    <img class="image__box" src="${foods.food_image}">
    <button class="add__button">Add</button>
    </div>
    `;
  },
  buildFoodView: function(){
    let viewData=controller.getData();
    document.getElementById("ID").innerHTML = `
      
      ${viewData.map(this.buildFoodTemplate).join("")}
      
    `;
  },
  render: function()
  {
    this.buildFoodView();
  }
};
// controller
let controller={
   init: function(){
    model.init(foodData);
    view.render();
   },
   getData:function()
   {
      return model.modalData;
   }
}
controller.init();