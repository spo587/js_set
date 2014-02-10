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

// var card1 = document.createElement('IMG');
// var cardsrc = 'cards/' + '1' + '.JPG';
// card1.setAttribute('src',cardsrc);
// card1.setAttribute('id',1)
// var card1id = String(1)
//card1.setAttribute('onclick', printhi());

// card1.onclick = 

// function() {
//     console.log(card1.id)
// }
//document.body.appendChild(card1);

//
//$(card1id).addEventListener('click', function(){console.log('hi there')})

function domCard(cardnum) {
    var cardsrc = 'cards/' + String(cardnum) + '.JPG'
    return dom('IMG', {src: cardsrc, id: cardnum, border: 5}) //click: printnum()}) //adding click to the properties just executes the function without click...wtf?
}

var arr = range(81) //can we do this better?

function dealtwelve() {
    
    for (var j=0; j<3; j++) {
        newp = dom('P',null)
        document.body.appendChild(newp)
        for (var i=0; i<4; i++) {
            
            randNum = randomElement(arr)
            var card = domCard(randNum);
            newp.appendChild(card);
            console.log(card.id)
            arr.splice(arr.indexOf(randNum),1)
        
        }

    }
    addEventListeners()
}

// function printnum() {
//     console.log('hi')
// }


function cardnumarray() {
    cardnums = []
    elements = document.body.getElementsByTagName('IMG')
    for (var i=0; i<elements.length; i++)
        cardnums.push(elements[i].id)
    //  console.log(cardnums)
    return cardnums
}

function addEventListeners() {
    cardnums = cardnumarray()
    result = []
    for (var i=0; i<cardnums.length; i++) {
        var num = cardnums[i]
        $(num).addEventListener('click',function(click){
            cardnum = Number(click.target.id)
            if (cardnum != result[0] && cardnum != result[1])
                result.push(convertCard(cardnum));
            if (!click.target.style.borderColor || click.target.style.borderColor == 'black')
                click.target.style.borderColor = 'green';
            else
                click.target.style.borderColor = 'black'
            if (result.length == 3) {
                isitaset = isset(result)
                console.log(isitaset);
                //for all img in doc.body: set border = black
                imgs = document.body.getElementsByTagName('IMG')
                forEach(imgs,function(img){img.style.borderColor = 'black'})
                if (!isitaset)   
                    result = [];
                else
                    removeDeal(result)
                    result = []

            }
        });
    }

    // console.log(result)
    // if (result.length == 3) {
    //     var setty = isset(result)
    //     result = []
    //     return setty
    // }
}


function convertCard(cardNum) {
    att3 = Math.floor(cardNum/27);
    att2 = Math.floor((cardNum - att3*27) / 9);
    att1 = Math.floor((cardNum - 27*att3 - 9*att2) / 3);
    att0 = Math.floor(cardNum - 27*att3 - 9*att2 - 3*att1);
    return {'att0':att0, 'att1':att1, 'att2': att2, 'att3': att3}
}

//console.log(convertCard(50))

// function isset() {
//     arr = addEventListeners()
//     if (arr.length == 3)


// }

function isset(cards) {
    console.log(cards)
    
    card1 = (cards[0])
    //  console.log(card1)
    card2 = (cards[1])
    card3 = (cards[2])
    if (objectEquals(card1,card2))
        return false
    ans=0
    
    if ((card1['att1'] + card2['att1'] + card3['att1']) % 3 ==0)
        ans += 1
    if ((card1['att2'] + card2['att2'] + card3['att2']) % 3 ==0)
        ans += 1
    if ((card1['att3'] + card2['att3'] + card3['att3']) % 3 ==0)
        ans += 1
    if ((card1['att0'] + card2['att0'] + card3['att0']) % 3 ==0)
        ans += 1
    return (ans == 4)
    

}

function removeElement(node) {
  if (node.parentNode)
    node.parentNode.removeChild(node);
}


function dealOne(parent) {
    console.log(arr)
    randNum = randomElement(arr)
    parent.appendChild(domCard(randNum))
}

function removeDeal(cards) {
    console.log(cards)
    arr = []
    for (i=0; i<3; i++)
        arr.push(cards[i]['att0']*1+cards[i]['att1']*3+cards[i]['att2']*9+cards[i]['att3']*27)
        console.log(arr)
    console.log(arr)
    for (j=0; j<3; j++)
        //console.log($(arr[j]))
        //var par = document.getElementById(arr[j]).parentNode //WHAT THE FUCK???? WHY DOESN'T THIS WORK??
        //console.log(par)
        //console.log(j)
        //console.log(arr[j])
        //console.log($(arr[j]))
        //par.removeChild(document.getElementById(arr[j]))
        //dealOne($(arr[j]).parentNode)
        $(arr[j]).parentNode.removeChild($(arr[j]))
        //removeElement($(arr[i]))   //why the fuck doesn't the loop work for dealone
        //dealOne(parent)

        
        
}

function startgame() {
    dealtwelve()
    //console.log(document.getElementsByTagName('IMG'))
}



// function dealcard() {
//     //take a random number and turn it into an img tag to pass to html

// }