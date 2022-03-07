console.log("Hello World3");
import foodData from "./data.json" assert {type: 'json'};
// console.log(data);


// mvc implementation
// model
let model=
{
modalData:foodData,
init:function(data){
   this.modelData=data;
},
sendData: function(){
  return this.modalData;
},

};
// view
let view={
  init(){
    this.render();
  },
  
 buildFoodTemplate(foods,category) {
   console.log("uuu",category);
    return `
    <div class="${category} item${foods.id}">
    <h class="item_name">${foods.food_name}</h>
    <h3 class="item__price">${foods.price}</h3>
    <p class="item__info">${foods.food_description}</p>
    <img class="image__box" src="${foods.food_image}">
    <button class="add__button">Add</button>
    </div>
    `;
  },
  buildFoodView(){
    let viewData=controller.getData();
    let menuList='';
    console.log(viewData);
    for (let category in foodData ){
      console.log(foodData[category][0]);
      menuList += this.buildFoodTemplate(foodData[category][0],category);
    }
     console.log(menuList," pfppp ");
     document.getElementById("ID").innerHTML = menuList;
  },
  render()
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

// cart initialization

function emptyCart() {
    const emptycart = `<div class="emptyCart">
            <h3 class="secondaryH3">Empty Cart</h3>
            <p class="lightWeightedText"></p>
            <div class="emptyCart">
              <p class="secondaryP">
                Good food is always cooking! Go ahead, order some yummy items from the menu.
              </p>
            </div>
          </div>`;
    return emptycart;
  }
  function buildCart(cartItems) 
  {
    if (cartItems.totalItems == 0) {
      return emptyCart();
    }
    let cartHeader = buildCartHeader(cartItems.totalItems);
    let items = buildCartItems(cartItems.dishes);
    let cart = `
      <div class="cartItems">
        ${cartHeader}
        ${items}
        <div class="checkout">
          <div class="subtotal">
            <h4>Total</h4>
            <span>${cartItems.total}</span>
          </div>
          <div>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    `;
    return cart;
  }
  
  function buildCartHeader(len) {
    let header = ` <div>
            <h1>Cart</h1>
            <p>${len} ${len == 1 ? 'Item' : 'Items'}</p>
          </div>`;
    return header;
  }
  
  function buildCartItems(dishes) {
    let items = ``;
    dishes.forEach((dish) => {
      items += `<div class="cartItem">

              <div>
                <h3>${dish.food_name}</h3>
                <p>${dish.subTotal}</p>
              </div>
              <button id="${dish.id}" class="secondaryButton" >
                  
                  <span class="quantity">${dish.quantity}</span>
                  
              </button>
            </div>
            `;
    });
    return items;
  }




// modal

let cartModel = {
  data: {
    dishes: [],
    total: 0,
    totalItems: 0,
  },
  getData() {
    return this.data;
  },
  addDish(dish) {
    console.log(dish);
    let quantity = this.getQuantity(dish.id);
    if (quantity == 0) {
      dish.quantity = 1;
      dish.subTotal = dish.price;
      this.data.dishes.push(dish);
      this.data.total += dish.price;
      this.data.totalItems += 1;
    } else {
      let targetDish = this.getDish(dish.id);
      targetDish.quantity += 1;
      targetDish.subTotal += dish.price;
      this.data.total += dish.price;
      this.data.totalItems += 1;
    }
  },

  getQuantity(dishId) {
    let quantity = 0;
    this.data.dishes.forEach((dish) => {
      if (dish.id === dishId) {
        quantity = dish.quantity;
      }
    });
    return quantity;
  },
  getDish(dishId) {
    let targetDish = {};
    this.data.dishes.forEach((dish) => {
      if (dish.id === dishId) {
        targetDish = dish;
      }
    });
    return targetDish;
  },
}






// view
let cartView = {
  init() {
    this.initListeners();
  },
  render(cartItems) {
    let cart = buildCart(cartItems);
    document.querySelector('.cart').innerHTML = cart;
  },
  initListeners() {
    document
      .getElementsByClassName('items__description')[0]
      .addEventListener('click', (event) => {
        this.handleEvent(event);
      });
  },
  handleEvent(event) {
      let dishClassName = event.target.parentElement.className;
      let category = dishClassName.split(' ')[0];
   if (event.target.innerHTML === 'Add')
   {
    cartController.addToCart(foodData[category][0]);
   }
  },

 };



 

// controller
let cartController = {
  cartItems: {},
  init() {
    this.getData();
    cartView.init();
  },
  getData() {
    this.cartItems = cartModel.getData();
    this.renderData();
  },
  renderData() {
    cartView.render(this.cartItems);
  },
  addToCart(dish) {
    cartModel.addDish(dish);
    this.getData();
  },
  getQuantity(dishId) {
    return cartModel.getQuantity(dishId);
  },
  getDish(dishId) {
    return cartModel.getDish(dishId);
  },
  
}

 cartController.init();