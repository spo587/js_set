function objectEquals(obj1, obj2) {
    for (var i in obj1) {
        if (obj1.hasOwnProperty(i)) {
            if (!obj2.hasOwnProperty(i)) return false;
            if (obj1[i] != obj2[i]) return false;
        }
    }
    for (var i in obj2) {
        if (obj2.hasOwnProperty(i)) {
            if (!obj1.hasOwnProperty(i)) return false;
            if (obj1[i] != obj2[i]) return false;
        }
    }
    return true;
}

function $(id) {
    return document.getElementById(id)
}

function reduce(combine,base,arr) {
    forEach(arr,function(element) {
        base = combine(base,element)
    })
    return base

}

function forEachIn(object, func) {
    for (var property in object) {
        if (object.hasOwnProperty(property))
            func(property, object[property])
    }
}

function forEach(arr, func) {
    for (var i=0; i<arr.length; i++)
        func(arr[i])
}

function randomElement(array) {
  if (array.length == 0)
    throw new Error("The array is empty.");
  return array[Math.floor(Math.random() * array.length)];
}

function range(end) {
    arr = []
    for (var i=0; i<end; i++)
        arr.push(i)
    return arr

}

function setNodeAttribute(node, attribute, value) {
  if (attribute == "class")
    node.className = value;
  else if (attribute == "checked")
    node.defaultChecked = value;
  else if (attribute == "for")
    node.htmlFor = value;
  else if (attribute == "style")
    node.style.cssText = value;
  else
    node.setAttribute(attribute, value);
}



function dom(name, attributes) {
  var node = document.createElement(name);
  if (attributes) {
    forEachIn(attributes, function(name, value) {
      setNodeAttribute(node, name, value);
    });
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == "string")
      child = document.createTextNode(child);
    node.appendChild(child);
  }
  return node;
}



function domCard(cardnum) {
    var cardsrc = 'cards/' + String(cardnum) + '.JPG'
    return dom('IMG', {src: cardsrc, id: cardnum, border: 5}) //click: printnum()}) //adding click to the properties just executes the function without click...wtf?
}

var allCards = range(81) //can we do this better?

function dealtwelve() {
    
    for (var j=0; j<3; j++) {
        newp = dom('P',null)
        document.body.appendChild(newp)
        for (var i=0; i<4; i++) {
            
            randNum = randomElement(allCards)
            var card = domCard(randNum);
            newp.appendChild(card);
            //console.log(card.id)
            allCards.splice(allCards.indexOf(randNum),1)
        
        }

    }
    addEventListeners()
}



function cardnumarray() {
    var cardnums = []
    var elements = document.body.getElementsByTagName('IMG')
    for (var i=0; i<elements.length; i++)
        cardnums.push(elements[i].id)
    //  console.log(cardnums)
    return cardnums
}

var result = []

function addEventListeners(cards) {
    if (cards == undefined) 
        cards = cardnumarray()

    else
        console.log(cards)
    for (var i=0; i<cards.length; i++) {
        var num = Number(cards[i]);
        console.log(num)
        $(num).addEventListener('click',function(click){
            var cardnum = Number(click.target.id)
            if (cardnum != result[0] && cardnum != result[1])
                result.push(convertCard(cardnum));
            if (!click.target.style.borderColor || click.target.style.borderColor == 'black')
                click.target.style.borderColor = 'green';
            else
                click.target.style.borderColor = 'black'
            if (result.length == 3) {
                threeClicks(result);
                result = [];
            }
        });
    }
}

    



function threeClicks(cardsClicked) {
    if (cardsClicked.length == 3) {

            // if (result.length == 3) {
        console.log(cardsClicked)
        //removeDeal(result)
        isitaset = isset(cardsClicked)
        console.log(isitaset);
        //for all img in doc.body: set border = black
        imgs = document.body.getElementsByTagName('IMG')
        forEach(imgs,function(img){img.style.borderColor = 'black'})
        if (!isitaset)   
            cardsClicked = [];
        else {
            console.log(cardsClicked)
            removeDeal(cardsClicked)
            result = []
        }

    }
}

    // console.log(result)
    // if (result.length == 3) {
    //     var setty = isset(result)
    //     result = []
    //     return setty
    // }



function convertCard(cardNum) {
    att3 = Math.floor(cardNum/27);
    att2 = Math.floor((cardNum - att3*27) / 9);
    att1 = Math.floor((cardNum - 27*att3 - 9*att2) / 3);
    att0 = Math.floor(cardNum - 27*att3 - 9*att2 - 3*att1);
    return [att0, att1, att2, att3]
    //return {'att0': att0, 'att1': att1, 'att2': att2, 'att3':att3}
}



function equalArray(arr1,arr2) {
    res = 0
    for (i=0; i<arr1.length; i++) {
        if (arr1[i] == arr2[i])
            res += 1
    }
    return res == arr1.length

}
function isset(cards) {
    //console.log(cards)
    if (equalArray(cards[0], cards[1]))
        return false
    
    // card1 = (cards[0])
    // //  console.log(card1)
    // card2 = (cards[1])
    // card3 = (cards[2])
    // if (objectEquals(card1,card2))
    //     return false
    ans=0
    for (var j=0; j<4; j++) {
        testarray = []
        forEach(cards, function(card) {testarray.push(card[j])})
        //console.log(testarray)
        if (reduce(function(a,b){return a + b},0,testarray)%3 == 0)
            ans +=1
    }
    //console.log(cards)
    return ans == 4
    //return true
    
    // if ((card1['att1'] + card2['att1'] + card3['att1']) % 3 ==0)
    //     ans += 1
    // if ((card1['att2'] + card2['att2'] + card3['att2']) % 3 ==0)
    //     ans += 1
    // if ((card1['att3'] + card2['att3'] + card3['att3']) % 3 ==0)
    //     ans += 1
    // if ((card1['att0'] + card2['att0'] + card3['att0']) % 3 ==0)
    //     ans += 1
    // return (ans == 4)
    

}

function removeElement(node) {
  if (node.parentNode)
    node.parentNode.removeChild(node);
}

function convertCardBack(cardArray) {
    return cardArray[0]*1 + cardArray[1]*3 + cardArray[2]*9 + cardArray[3]*27
}

function dealOne(parent) {
    //console.log(allCards)
    randNum = randomElement(allCards)
    newCard = domCard(randNum)
    parent.appendChild(newCard)
    console.log(newCard)
    addEventListeners([(newCard.id)])
    allCards.splice(allCards.indexOf(randNum),1)


    //addEventListeners()
}

function removeDeal(cards) {
    //console.log('cards  ', cards)
    setcards = []
    for (var i=0; i<3; i++) {
        //arr.push(cards[i]['att0']*1+cards[i]['att1']*3+cards[i]['att2']*9+cards[i]['att3']*27)
        setcards.push(convertCardBack(cards[i]))
        //console.log('setcards array ', setcards)
    }
    //console.log(setcards)
    for (var j=0; j<3; j++) {
        var par = document.getElementById(setcards[j]).parentNode //WHAT THE FUCK???? WHY DOESN'T THIS WORK??
        //console.log(par)
        //console.log(j)
        //console.log(setcards[j])
        par.removeChild(document.getElementById(setcards[j]))
        //dealOne($(setcards[j]).parentNode)
        //$(setcards[j]).remove()
        // $(setcards[j]).parentNode.removeChild($(setcards[j]))
        //removeElement($(setcards[i]))   //why the fuck doesn't the loop work for dealone
        dealOne(par)

        }
        
}

function startgame() {
    dealtwelve()
    //console.log(document.getElementsByTagName('IMG'))
}



// function dealcard() {
//     //take a random number and turn it into an img tag to pass to html

// }