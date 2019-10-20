'use strict';

function Product(title, src) {
    this.title = title;
    this.src = src;
    this.clickCtr = 0;
    this.shownCtr = 0;
    
    Product.all.push(this);
  }

Product.roundCtr = 0;
Product.roundLimit = 25;



Product.all = [];

Product.container = document.getElementById('product-container');

Product.leftImage = document.getElementById('left-image');
Product.midImage=document.getElementById('mid-image')
Product.rightImage = document.getElementById('right-image');

Product.leftTitle = document.getElementById('left-product-title');
Product.midTitle = document.getElementById('mid-product-title');
Product.rightTitle = document.getElementById('right-product-title');


Product.leftObject = null;
Product.midObject=null;
Product.rightObject = null;

new Product('bag','images/bag.jpg');
new Product('banana','images/banana.jpg');
new Product('bathroom','images/bathroom.jpg');
new Product('boots','images/boots.jpg');
new Product('breakfast','images/breakfast.jpg');
new Product('bubblegum','images/bubblegum.jpg');
// new Product('chair','images/chair.jpg');
// new Product('cthulhu','images/cthulhu.jpg');
// new Product('dog-duck','images/dog-duck.jpg');
// new Product('dragon','images/dragon.jpg');
// new Product('pet-sweep','images/pet-sweep.jpg');
// new Product('scissors','images/scissors.jpg');
// new Product('shark','images/shark.jpg');
// new Product('sweep','images/sweep.png');
// new Product('tauntaun','images/tauntaun.jpg');
// new Product('unicorn','images/unicorn.jpg');
// new Product('usb','images/usb.gif');
// new Product('water-can','images/water-can.jpg');
// new Product('wine-glass','images/wine-glass.jpg');







function renderNewProduct() {
    

 // ensure that previous product not shown on next round
 var forbidden = [Product.leftObject,Product.midObject, Product.rightObject];

 do {

    Product.leftObject = getRandomProduct();

 } while (forbidden.includes(Product.leftObject))

// mid product also ..

forbidden.push(Product.leftObject);

do{

    Product.midObject=getRandomProduct();

}while(forbidden.includes(Product.midObject));



 // add left product to forbidden list so we don't double up
 forbidden.push(Product.midObject);

 do {

    Product.rightObject = getRandomProduct();

 } while(forbidden.includes(Product.rightObject));



 // WARNING: if you got really unlucky the above code would result in infinite loop
 // Can you think of safer ways?
 
 Product.leftObject.shownCtr++;
 Product.midObject.shownCtr++;
 Product.rightObject.shownCtr++;

 var leftProductImageElement = Product.leftImage;
 var midProductImageElement=Product.midImage;
 var rightProductImageElement = Product.rightImage;

 leftProductImageElement.setAttribute('src', Product.leftObject.src);
 leftProductImageElement.setAttribute('alt', Product.leftObject.title);
 midProductImageElement.setAttribute('src',Product.midObject.src);
 midProductImageElement.setAttribute('alt',Product.midObject.title);
 rightProductImageElement.setAttribute('src', Product.rightObject.src);
 rightProductImageElement.setAttribute('alt', Product.rightObject.title);

 Product.leftTitle.textContent = Product.leftObject.title;
 Product.midTitle.textContent=Product.midObject.title;
 Product.rightTitle.textContent = Product.rightObject.title;
}


function getRandomProduct() {
    var index = Math.floor(Math.random() * Product.all.length);
    return Product.all[index];
  }

function updateTotals() {

    var tableBody = document.getElementById('report');
  
    // Remove all children so that content doesn't get duplicated
    // easiest way is to set innerHTML
    // WARNING: will not remove event listeners, so be careful with that
    tableBody.innerHTML = '';
  
    for (var i = 0; i < Product.all.length; i++) {
      var product = Product.all[i];
      var prc=(product.clickCtr/product.shownCtr)*100;
      if (isNaN(prc)){
          prc=0;
      }
      var row = addElement('tr', tableBody);
      addElement('td', row, product.title);
      addElement('td', row, '' + product.clickCtr);
      addElement('td', row, '' + product.shownCtr);
      addElement('td', row,''+ prc +'%');
    }
  }

  function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if(text) {
      element.textContent = text;
    }
    return element;
  }

  function clickHandler(event) {

    var clickedId = event.target.id;
    var pruductClicked;
  
    if(clickedId === 'left-image') {
        pruductClicked = Product.leftObject;
        
    } else if(clickedId==='mid-image'){
        pruductClicked=Product.midObject;

    } else if (clickedId === 'right-image') {
        pruductClicked = Product.rightObject;


    }
    else {
      console.log('Um, what was clicked on???', clickedId);
    }
  
    if(pruductClicked) {
        pruductClicked.clickCtr++;
      Product.roundCtr++;
  
      updateTotals();
  
      if(Product.roundCtr === Product.roundLimit) {
        
        alert('No more clicking for you!');
  
        Product.container.removeEventListener('click', clickHandler);
  
      } else {
  
        renderNewProduct();
      }
    }
  }

  // Notice that we're attaching event listener to the container, 
// but event.target will allow us to which child element was actually clicked
Product.container.addEventListener('click', clickHandler);

updateTotals();

renderNewProduct();


