// variabili globali
let myTable;

let maxDolPri = 0;

let hoveredName = null;
let selectedName = null;



async function setup() {

  myTable = await loadTable("assets/datasets/bigmac_3.csv", ",", "header");

  // prova di stampa del dataset
  // console.log("dati: ", myTable)

  for (let rowNum = 0; rowNum < myTable.getRowCount(); rowNum++) {
    
    // prova di stampa delle righe
    console.log("numero riga: ", rowNum)

    // carica il valore del prezzo in dollari
    let dolPri = myTable.getNum(rowNum, "dollar_price")

    // prova di stampa dei prezzi in dollari
    console.log("prezzo in dollari: ", dolPri)

    // trova e sostituisci il valore massimo del prezzo in dollari 
    if (dolPri > maxDolPri) {
      maxDolPri = dolPri
    } 

  }

  // prova di stampa del massimo prezzo in dollari
  console.log("massimo prezzo in dollari: ", maxDolPri)

  createCanvas(windowWidth, windowHeight);

  frameRate(8);

}



function draw() {

  background('#ff6647');

  fill('#ff2a00')
  push();
    textSize(windowHeight/8)
    text("2020 Big Mac Index", 25, windowHeight/8)
  pop();

  push();
    fill('#ff2a00')
    textStyle(BOLD)
    textSize(windowHeight/44)
    textLeading(windowHeight/44)
    text("L'altezza dei panini mostra il prezzo del celebre Big Mac \ndi McDonald's (espresso in USD) nel 2020 nella nazione indicata.", 25, windowHeight/5.6)
  pop();

  // push();
  //   fill('#FFFFFF')
  //   line(25, windowHeight-40, mouseX, windowHeight-40)
  //   line(25, (windowHeight-40)/2, mouseX, (windowHeight-40)/2)
  // pop();

  // per riflettere orizzontalmente e non avere Big Mac volanti
  translate(windowWidth, windowHeight)
  rotate(PI)

  let xPos = 0;
  let name = "";
  let currency = "";
  let bigMacWidth = (windowWidth-30)/myTable.getRowCount()

  console.log("larghezza big mac: ", bigMacWidth)

  for (let rowNum = 0; rowNum < myTable.getRowCount(); rowNum++){

    let dolPri = myTable.getNum(rowNum, "dollar_price")
    let altezza = (map(dolPri, 0, maxDolPri, 0, windowHeight-200))
    let altezzaHamburg = (map(dolPri, 0, maxDolPri, 0, windowHeight-200))/10

    if (dolPri > maxDolPri) {
      maxDolPri = dolPri
    } 

    // per disegnare livelli e relativi prezzi
    let yLines = 0;
   
    for (let r = 1; r < 6; r++) {
      push();
        fill('#FFFFFF')
        yLines = r*100
        let altezzaLines = (map(yLines, 0, 600, 0, windowHeight-200))
        push();
          translate(windowWidth, windowHeight)
          rotate(PI)
          textSize(30)
          linePrice = 6-r*1
          text(("$"+linePrice), 40, 140+altezzaLines)
        pop();
      pop();

      push()
        stroke('#ff2a00')
        strokeWeight(5)
        line(windowWidth-25, 50+altezzaLines, windowWidth-mouseX, 50+altezzaLines)
      pop();
    }

    push();
      noStroke();
      // fill('#873b08')
      // rect(xPos+25, 50, bigMacWidth/1.5, altezza)

      for (let i = 0; i < altezzaHamburg; i++) {
        fill('#873b08')
        rect(xPos+25, 50+i*10, bigMacWidth/1.5, 10, 5)
      }

      // lattuga
      if (altezza > 20) {
        fill('#40b800')
        if (windowWidth > 1920) {
        rect(xPos+25, 60, bigMacWidth/1.45, 10)
        } else {
        rect(xPos+25, 50, bigMacWidth/1.45, 10)
        }
      }

      
      // pane inferiore
      fill('#ffcc91')
      rect(xPos+25, 45, bigMacWidth/1.45, bigMacWidth/2.5)
      rect(xPos+25, 40, bigMacWidth/1.45, 15, 20)

      // formaggio
      if (altezza > 15) {
      fill('#ffbb00')
      
      if (windowWidth > 1920) {
      rect(xPos+25, altezza+45, bigMacWidth/1.45, 10)
      } else {
      rect(xPos+25, altezza+50, bigMacWidth/1.45, 10)
      }
      }


      // pane superiore
      fill('#ffcc91')
      if (windowWidth > 1920) {
      rect(xPos+25, altezza+50, bigMacWidth/1.45, bigMacWidth/2.9)
      } else {
      rect(xPos+25, altezza+55, bigMacWidth/1.45, bigMacWidth/2.75) 
      }
      rect(xPos+25, altezza+55, bigMacWidth/1.45, 15, 20)
    pop();

    // aumenta xPos
    xPos = xPos + bigMacWidth

    // carica il nome della nazione
    name = myTable.getString(rowNum, "name")
    currency = myTable.getString(rowNum, "currency_code")

    // se il cursore passa nella zona assegnata ad una nazione mostra il relativo nome
    if (mouseX > xPos-25 && mouseX < (xPos-25 + bigMacWidth)) {

      fill('#FFFFFF')
      if (mouseX < windowWidth/2) {
        push();
          translate(windowWidth, windowHeight)
          rotate(PI)
          textSize(150)
          text(("", name), mouseX, mouseY)
        pop();
      } else {
        push();
          translate(windowWidth, windowHeight)
          rotate(PI)
          textSize(150)
          text(("", name), mouseX-textWidth(name), mouseY)
        pop();        
      }

    hoveredName = currency  
    }

  }

}

function mousePressed() {
  // definisci parameters

  // crea nuovo URL con stessa root
  let newURL = "detail.html?bigmac_3=" + hoveredName;

  console.log(newURL);

  // rimanda nella stessa scheda
  window.location.href = newURL;
}
