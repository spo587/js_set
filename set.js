

function $(id) {
    return document.getElementById(id)
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


function range(end) {
    var arr = []
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

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

shuffleArray(allCards)

function dealtwelve() {
    
    for (var j=0; j<3; j++) {
        newp = dom('P',null)
        document.body.appendChild(newp)
        for (var i=0; i<4; i++) {
            
            var randNum = allCards.pop()
            var card = domCard(randNum);
            newp.appendChild(card);
            //console.log(card.id)
        
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
        var cards = cardnumarray()

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

    
function reduce(combine, base, array) {
    forEach(array, function(element) {
        base = combine(base, element)
    })
    return base
}


function threeClicks(cardsClicked) {
    if (cardsClicked.length == 3) {

            // if (result.length == 3) {
        console.log(cardsClicked)
        //removeDeal(result)
        var isitaset = isset(cardsClicked)
        console.log(isitaset);
        //for all img in doc.body: set border = black
        var imgs = document.body.getElementsByTagName('IMG')
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



function convertCard(cardNum) {
    att3 = Math.floor(cardNum/27);
    att2 = Math.floor((cardNum - att3*27) / 9);
    att1 = Math.floor((cardNum - 27*att3 - 9*att2) / 3);
    att0 = Math.floor(cardNum - 27*att3 - 9*att2 - 3*att1);
    return [att0, att1, att2, att3]
    //return {'att0': att0, 'att1': att1, 'att2': att2, 'att3':att3}
}



function equalArray(arr1,arr2) {
    var res = 0
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

    

}

function removeElement(node) {
  if (node.parentNode)
    node.parentNode.removeChild(node);
}

function convertCardBack(cardArray) {
    return cardArray[0]*1 + cardArray[1]*3 + cardArray[2]*9 + cardArray[3]*27
}

function dealThree() {
    console.log(allCards)
    for (var i=0; i<3; i++) {

        var randNum = allCards.pop();
        console.log(allCards)
        var newCard = domCard(randNum);
        
        
        document.body.childNodes[i+7].appendChild(newCard)
        addEventListeners([(newCard.id)])
        console.log(allCards)
    }
}


function dealOne(parent) {
    //console.log(allCards)
    var randNum = allCards.pop()
    var newCard = domCard(randNum)
    parent.appendChild(newCard)
    console.log(newCard)
    addEventListeners([(newCard.id)])


    //addEventListeners()
}

function realign() {
    var pars = document.getElementsByTagName('P')
    console.log(pars)
    var longlines = 0
    for (var i=0; i<3; i++) {
        if (pars[i].childNodes.length < 4) {
            var min = pars[i].childNodes.length
            var shortline = i
        }
        else if (pars[i].childNodes.length > 4) {
            var longline = i
            longlines += 1
        }
    }
    console.log(longlines)
    console.log(longline)
    console.log(shortline)
    if (longlines == 1) {
        cardToMove = pars[longline].lastChild
        pars[shortline].appendChild(cardToMove)
    }
    else if (longlines == 2) {
        var longline1;
        var longline2;
        (shortline == 0) ? longline1 = 1 : longline1 = 0;
        (shortline != 2) ? longline2 = 2 : longline2 = 1;
        console.log(longline1);
        console.log(longline2);
        var cardtoMove1 = pars[longline1].lastChild;
        var cardtoMove2 = pars[longline2].lastChild;
        pars[shortline].appendChild(cardtoMove1);
        pars[shortline].appendChild(cardtoMove2);
     
    }


}

function removeDeal(cards) {
    //console.log('cards  ', cards)
    var setcards = []
    for (var i=0; i<3; i++) {
        //arr.push(cards[i]['att0']*1+cards[i]['att1']*3+cards[i]['att2']*9+cards[i]['att3']*27)
        setcards.push(convertCardBack(cards[i]))
        //console.log('setcards array ', setcards)
    }
    //console.log(setcards)
    for (var j=0; j<3; j++) {
        var par = document.getElementById(setcards[j]).parentNode //WHAT THE FUCK???? WHY DOESN'T THIS WORK??
 
        par.removeChild(document.getElementById(setcards[j]))

        var imgs = document.getElementsByTagName('IMG')
        if (imgs.length < 12)
            dealOne(par)
        } 
    realign()      
}

function startgame() {
    dealtwelve()
    //console.log(document.getElementsByTagName('IMG'))
}


