//DOM Variable lier au HTML

const gameKeys = document.querySelector('.gameKeys');
let alphabet = "abcdefghijklmnopqrstuvwxyz"
let alphabetArray = alphabet.split('')
const words = ["bouteille", "casserole", "fourchette", "spatule", "passoire", "cocorico"]
const displayedWord = document.querySelector(".displayedWord")
const victoryDiv = document.querySelector(".victory")
let secretWord
let displayedSecretWord
let mistakenLetters
let maxErrors = 6
let errors
console.log("DEBUT : ", displayedSecretWord)


console.log(document.querySelectorAll('.keyButton') )


//-------------Function qui permet de savoir si une lettre est bonne ou fausse -----------------------------------------------------------------
function checkSecretWordForLetter(letterToFind) {
    if(!secretWord.includes(letterToFind))
    {
        return false
    }
    let indexes= []

    let secretWordArray = secretWord.split('')

    for(let i = 1; i < secretWordArray.length -1; i++)
    {
        if(secretWordArray[i] === letterToFind)
        {
            indexes.push(i)
        }
    }


    return indexes

}
//------------------------------------------------------------------------------





//-------------Function qui permet de jouer une lettre -----------------------------------------------------------------
function playLetter(playedLetter) {

    console.log(playedLetter)
    let indexes = checkSecretWordForLetter(playedLetter) // si l'index d'un lettre est égale à l'index d'une lettre qui est dans le mot alors on la place

    if(!indexes){
        return wrongLetter(playedLetter) // sinon on retourne une fausse lettre

    }

    return addLetterToWord(playedLetter, indexes)


}
//------------------------------------------------------------------------------







//---------------function qui permet d'ajouter la lettre au mot ---------------------------------------------------------------
function addLetterToWord(letterToAdd, indexes) {
    let displayedSecretWordArray = displayedSecretWord.split('')

    indexes.forEach(index => {
        displayedSecretWordArray[index] = letterToAdd
    })

    console.log("MILIEU : ", displayedSecretWord)

    displayedSecretWord = displayedSecretWordArray.toString().replaceAll(',', '')
    console.log("FIN : ", displayedSecretWord)
    displayGameWord()
    disableUsedLettersFromKeyboard()
    checkForWinOrLost()

}
//------------------------------------------------------------------------------







//-----------function qui permet de créer un clavier -------------------------------------------------------------------
function createKeyboard(){
    document.querySelectorAll('.gameKeys>*').forEach(button => { // on affiche la clavier dans la div 'gameKeys'
        console.log(button)
        button.remove()
    })

    alphabetArray.forEach((letter) => { // on place les lettres dans un tableau sous forme de bouton
        let newKey = document.createElement("button");
        newKey.classList.add('btn');
        newKey.classList.add('keyButton');
        newKey.id = letter;
        newKey.classList.add('btn-outline-primary');
        newKey.textContent = letter;

        gameKeys.appendChild(newKey);


    })
    document.querySelectorAll('.keyButton').forEach((gameKey) => {
        gameKey.addEventListener('click', e => { // et chaque bouton sera cliquable donc ajoute un addEventLsitenr 'click'

            console.log(gameKey.id);
        })
    })

    wireKeyButtons()

}
//------------------------------------------------------------------------------






//--------Function qui permet d'initialiser la game ----------------------------------------------------------------------
function initGame() {
    errors = 0 // elle va remetre les errreurs a 0
    mistakenLetters = [] //va enlever les lettres grises
    createKeyboard() // va creer un clavier
    pickRandomWord() // va choisir un mot aléatoire
    prepareDisplayedSecretWord() // va preparer le mot avec la 1er et derniere lettre afficher et remplacer les autres par des "_"
    displayGameWord() // va l'afficher
    disableUsedLettersFromKeyboard() // et va desactiver les lettres qui ne sont pas dans le mot
}
//------------------------------------------------------------------------------





//------------Function qui permet de choisir un mot aléatoire parmis les mots du tableau ---------------------------------------------------------------
function pickRandomWord(){
    let randomIndex = Math.floor(Math.random() * words.length);
    secretWord = words[randomIndex];
    //le secret Word est égale au Word mais avec la fucntion pickRandomWord
}
//------------------------------------------------------------------------------






//--------------Function qui permet d'afficher le mot secret dans la div ou doit etre afficher le mot secret ----------------------------------------------------------------
function displayGameWord(){
    displayedWord.innerHTML = displayedSecretWord
    //displayedWord est la classe donne de la ou doit etre afficher le SecretWord
    //du coup avec le innerHTML permet de changer le contenu par le SecretWord
}
//------------------------------------------------------------------------------






//--------Function qui permet de preparer l'affichage du mot secret----------------------------------------------------------------------
//--------cad que la 1er et derniere lettre sera afficher et que les lettre du milieu seront remplacer par des "_"
//--------aussi si il y a plusieur fois la 1er et/ou derniere lettre au mileu du mot elle sera aussi afficher
function prepareDisplayedSecretWord(){
    displayedSecretWord = ""
    // premiere et derniere lettre
    // et les lettres similaires à ces dernieres dans le mot. Ex bouteille
    //                                                          B___E___E
    let firstLetter = secretWord[0] // changement de la 1er lettre avec l'index O car on veut chnager la 1er lettre
    console.log(firstLetter)
    let lastLetter = secretWord[secretWord.length - 1] // changement de la derniere lettre on prend la longueur du mot secret et on fait -1 car on prend l'index de la derniere lettre

    for(let i = 0; i < secretWord.length; i++){ //changement des lettre restant par des "_"
        displayedSecretWord += "_"
    }

    let displayedSecretWordArray = displayedSecretWord.split('') // on transforme la chaine de caractere par un taleau

    displayedSecretWordArray[0] = firstLetter// pareil on change la 1er lettre mais cette fois ci elle est dans un tableau
    displayedSecretWordArray[displayedSecretWord.length - 1] = lastLetter // pareil pour la dernire elle est dans un tabelau

    let secretWordArray = secretWord.split('')// creation des espace dans le tableau

    for(let i = 0; i < secretWordArray.length; i++){


        if(i === 0 && i === secretWord.length){ break }

        switch(secretWord[i]){// pour le mot secret

            case firstLetter: // quand on arrive a la 1er lettre on l'affiche
                displayedSecretWordArray[i] = secretWord[i]
                break;         // les autres lettre on les remplace par des "_"
            case lastLetter:
                displayedSecretWordArray[i] = secretWord[i] // et quand on arrive à la dernire lettre on l'afffiche aussi
                break;


        }

    }

    displayedSecretWord = displayedSecretWordArray.toString().replaceAll(',', '')
    // Dans ce cas le mot secret sera afficher avec des "," mais on les remplace par "" pour enlever les ","

}
//------------------------------------------------------------------------------







//-------------------Function qui permet -----------------------------------------------------------
function wireKeyButtons(){
    const allButtons = document.querySelectorAll('.keyButton')
    allButtons.forEach(button => {
        button.addEventListener('click', e => {
            playLetter(button.id)
        })
    })
}
//------------------------------------------------------------------------------






//--------------function qui permet de rendre gris les lettre qu'on a utiliser dnas le clavier du jeux----------------------------------------------------------------
function disableUsedLettersFromKeyboard() {
    document.querySelectorAll('.keyButton').forEach(button => {
        if(displayedSecretWord.includes(button.id) || mistakenLetters.includes(button.id)){
            button.disabled = true // si le mot affiche inclut l'id de la lettre et cet id est un mistakenLetter alors le bouton sera disabled
        }
    })
}
//------------------------------------------------------------------------------







//-------------Function de quand on fait une erreur le pendu se dessine de la tete au pied -----------------------------------------------------------------
function wrongLetter(mistakenLetter) {
    errors++
    switch (errors) { // dans les erreurs
        case 1:    // a la 1er erreur la tete va s'afficher
            tete()
            break;
        case 2:   //à la 2eme erreur la corps va s'afficher
           corps()
            break;
        case 3:   // à la 3eme erreur la jambe gauche va s'afficher
            jambeGauche()
            break;
        case 4:    // à la 4eme arreur la jambe droite va s'afficher
         jambeDroite()
            break;
        case 5:    // à la 5eme erreur le bras gauche va s'afficher
           brasGauche()
            break;
        case 6:   // à la 6eme erreur le bras droit va s'afficher
            brasDroit()
            break;
    }
    document.querySelector('.pendu').innerHTML += "X"

    mistakenLetters.push(mistakenLetter) // quand on fait une mistakenLetter
    disableUsedLettersFromKeyboard() // on désactive le lettre du clavier
    checkForWinOrLost() // et à la 6eme on affiche une lose ou si on a trouver le mot on affiche la win

}
//------------------------------------------------------------------------------






//----------function qui permet de savoir si on a gagner ou perdu --------------------------------------------------------------------

function checkForWinOrLost() {
    console.log('avant verif errors')
    if(errors >= maxErrors){ // si le nombre d'erreur qu'on a fait et superieur ou égale au nombre max d'erreur alors on return une lose
        return gameOver()
    }
    console.log('apres verif errors')

    if(displayedSecretWord === secretWord ){ // si le mot secret cacher et égale au mot secret donc on a win
        console.log('victoire')

        return  victory() // on return une win
    }
}
//------------------------------------------------------------------------------






//-----------Function qui permet de créer un pop up quand on a perdu avec un bouton rejouer-------------------------------------------------------------------
function gameOver(){
    let gameOverMessage = document.createElement('span')
    gameOverMessage.classList.add('.gameOverMessage')
    gameOverMessage.textContent = "Perdu ! Le mot était :"
    document.querySelector('.gameDisplay').appendChild(gameOverMessage)
    displayedWord.textContent = secretWord
    let playAgainButton = document.createElement('button')
    playAgainButton.classList.add('btn')
    playAgainButton.classList.add('btn-primary')
    playAgainButton.classList.add('btn-primary')
    playAgainButton.classList.add('rejouer')
    playAgainButton.innerHTML = "Rejouer"
    document.querySelector('.gameDisplay').appendChild(playAgainButton)

    document.querySelectorAll('.keyButton').forEach(button => {
        button.disabled = true
    })

    console.log('coucou')

    document.querySelector('.rejouer').addEventListener('click', e => {
        playAgain();
    })
}
//------------------------------------------------------------------------------



console.log('coucou')




//--------Function qui affiche un message quand on a gagner avc un bouton rejouer ----------------------------------------------------------------------
function victory(){
    victoryDiv.style.display = "flex"
    document.querySelector('.rejouer').addEventListener('click', e => {
        playAgain();
    })
}
//------------------------------------------------------------------------------





//-------function rejouer qui init Game-----------------------------------------------------------------------
function playAgain(){
    initGame()
    victoryDiv.style.display = "none"
}
//------------------------------------------------------------------------------



// on rappel la function initGame quand on arrive a la fin du coup on relance la game
initGame()








// "canva" permet de faire des dessin dans JavaScript
let canvasPendu = document.querySelector('.pendu')
let dessin = canvasPendu.getContext('2d')




/// DESSIN DU PENDU


// coordonnées des dessins



//dessin qui  va dessiner la tete
function tete(){
    dessin.beginPath()
    dessin.strokeStyle = "#000"
    dessin.lineWidth = 2
    dessin.arc(70,30, 10, 0, Math.PI * 2, true)
    dessin.stroke()
}




//dessin qui  va dessiner la corps
function corps(){
    dessin.moveTo(70, 40)
    dessin.lineTo(70,80)
    dessin.stroke()
}


//dessin qui  va dessiner le bras gauche
function brasGauche(){
    dessin.moveTo(70, 50)
    dessin.lineTo(50,70)
    dessin.stroke()
}



//dessin qui  va dessiner le bras droit
function brasDroit(){
    dessin.moveTo(70, 50)
    dessin.lineTo(90,70)
    dessin.stroke()
}


//dessin qui  va dessiner la jambe gauche
function jambeGauche(){
    dessin.moveTo(70,80)
    dessin.lineTo(50,100)
    dessin.stroke()
}


//dessin qui  va dessiner la  jambe droite
function jambeDroite(){
    dessin.moveTo(70,80)
    dessin.lineTo(90,100)
    dessin.stroke()
}

