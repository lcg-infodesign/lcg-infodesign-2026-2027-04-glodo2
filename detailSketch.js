// variabili globali
let backgroundColor = '#ff6647'
let accentColor = '#ff2a00'

let myData;

let maxDollarPri = 0;
let maxLocalPri = 0;
let maxLocalEx = 0;
let minLocalEx = 100000000;

let selectedBigName;



async function setup() {

  myData = await loadTable("assets/datasets/bigmac_3.csv", ",", "header");

  // leggi parametri passati nell'URL
  let params = getURLParams();

  // salvo id della riga selezionata
  selectedBigName = params.bigmac_3;

  // trova massimo prezzo in dollari
  for (let rowNum = 0; rowNum < myData.getRowCount(); rowNum++) {
    
    // prova di stampa delle righe
    // console.log("numero riga: ", rowNum)

    // carica il valore del prezzo in dollari
    let dolPri = myData.getNum(rowNum, "dollar_price")

    // prova di stampa dei prezzi in dollari
    // console.log("prezzo in dollari: ", dolPri)

    // trova e sostituisci il valore massimo del prezzo in dollari 
    if (dolPri > maxDollarPri) {
      maxDollarPri = dolPri
    } 

  }

  // prova di stampa del massimo prezzo in dollari
  // console.log("massimo prezzo in dollari: ", maxDollarPri)



  // trova massimo prezzo in valuta locale
  for (let rowNum = 0; rowNum < myData.getRowCount(); rowNum++) {
    
    // prova di stampa delle righe
    // console.log("numero riga: ", rowNum)

    // carica il valore del prezzo in valuta locale
    let locPri = myData.getNum(rowNum, "local_price")

    // prova di stampa dei prezzi in dollari
    // console.log("prezzo in valuta locale: ", locPri)

    // trova e sostituisci il valore massimo del prezzo in dollari 
    if (locPri > maxLocalPri) {
      maxLocalPri = locPri
    } 
  
  }



  // trova massima valuta locale in dollari
  for (let rowNum = 0; rowNum < myData.getRowCount(); rowNum++) {
    
    // prova di stampa delle righe
    console.log("numero riga: ", rowNum)

    // carica il valore della valuta locale in dollari
    let locEx = myData.getNum(rowNum, "dollar_ex")

    // prova di stampa delle valute locali in dollari
    console.log("cambio valuta locale in dollari: ", locEx)

    // trova e sostituisci il valore massimo della valuta locale in dollari
    if (locEx > maxLocalEx) {
      maxLocalEx = locEx
    }

    // trova e sostituisci il valore minimo della valuta locale in dollari
    if (locEx < minLocalEx) {
      minLocalEx = locEx
    }

  }

  // prova di stampa della massima valuta locale in dollari
  console.log("massimo cambio valuta in dollari: ", maxLocalEx)

  createCanvas(windowWidth, windowHeight);

  frameRate(8);

}



function draw() {
  background(backgroundColor)

  // seleziona riga in base al nome
  let bigRow = myData.findRow(selectedBigName, "currency_code");

  if (bigRow) {
    
    // carica il valore del valuta locale in dollari dalla riga
    let localEx = bigRow.getNum("dollar_ex");

    // prova di stampa del valuta locale in dollari dalla riga
    console.log("cambio valuta locale in dollari: ", localEx)


    let dolWidth = 1;
    let locWidth = 1/localEx
    let maxBacWidth = 1/minLocalEx;
    let maxWidth = windowWidth-50

    let dolBacWidth = map(dolWidth, 0, maxBacWidth, 0, maxWidth)
    let locBacWidth = map(locWidth, 0, maxBacWidth, 0, maxWidth)
    let bacHeight = (windowHeight-200)/3


    // istogramma
    push();
      stroke(accentColor)
      strokeWeight(5)

      // barra valuta locale in dollari
      push();
        fill(backgroundColor)
        rect(25, 50, dolBacWidth, bacHeight)
      pop();
      rect(25, 50, locBacWidth, bacHeight)

      // barra USD
      rect(25, 60+bacHeight, dolBacWidth, bacHeight)
    pop();

    

  push();
    fill(accentColor)
    textSize(windowHeight/8)
    text("USD", maxWidth-textWidth("USD"), 60+1.5*bacHeight)
    text(("", selectedBigName), maxWidth-textWidth(selectedBigName),60+0.5*bacHeight)

    textStyle(BOLD)
    textSize(windowHeight/44)
    textLeading(windowHeight/44)
    text("Le due barre confrontano il valore del dollaro americano e quello della valuta relativa alla nazione selezionata.", 25, 145+2*bacHeight)
  pop();

    
  }


}