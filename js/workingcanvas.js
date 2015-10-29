/*
 Para dibujar en el canvas
*/
const arcRadio = 60;
const posInitialY = 100
const datos2Cabecera = ["(Requisitos)", "(Ajustadas)", "direccion", "direccion"];
const datosCabecera = ["No.", "Num dir.", "Num. dir.", "Direccion", "Primera", "Ultima", "Broadcast", "Mascara"];
const fuenteHeader = 'Bold 9pt Calibri';
const fuenteHeader2 = '7pt Calibri';
const fuenteNormal = '9pt Times';
const positionX = [28,68,133,193,283,373,463,553]; // Posicion de cada dato de tabla resumen
const LINECOLOR = 'black';

function dibujaLineasHoriz(canvas, xini, yini, xfin, ancho) {
	var c = canvas.getContext('2d');
	var g;
	c.beginPath();
	c.moveTo(xini, yini);
	c.lineTo(xfin, yini);
    c.lineWidth   = '2';	
    c.strokeStyle = LINECOLOR;  	
	c.stroke();
}

function dibujaLineasOblicuas(canvas, xini, yini, long) {
	var c = canvas.getContext('2d');
	c.beginPath();
	c.moveTo(xini, yini);
	c.lineTo(xini + long, yini+long);
    c.strokeStyle = LINECOLOR;
	c.stroke();
}

function dibujaLineasVert(canvas, xini, yini, long, ancho) {
	var c = canvas.getContext('2d');
	c.beginPath();
	c.moveTo(xini, yini);
	c.lineTo(xini, yini+long);
	c.strokeStyle = LINECOLOR;
    c.lineWidth   = '2';	
	c.stroke();
}
/* Dibuja tres circulos donde se ubicaran
 * los valores de inicio de la red, ultima
 * direccion y el broadcast
 * recibe:
 * posx = posicion en x de la primera marca
 * posy = posicion en y de la primera marca
 * las demas marcas son calculadas
 */

function dibujaLimites(canvas,posx,posy) {
	var c = canvas.getContext('2d');
	var posPrimera = posx - 0.72*arcRadio;
	var alturaPelota = posy - 0.16*arcRadio;
	var posUltima = posx + 0.72*arcRadio;
	var posBC     = posx + 0.28*arcRadio;
	var radioLimites = 0.20*arcRadio;

	// Primer circulo
	c.beginPath();
	c.arc(posPrimera,alturaPelota,radioLimites,0,2*Math.PI,true);
	c.strokeStyle = 'navy';
    c.lineCap ='square';
    c.lineWidth = 2;	
 	c.stroke();

	// Segundo circulo
	c.beginPath();	
	c.arc(posUltima,alturaPelota,radioLimites,0,2*Math.PI,true);	
	c.strokeStyle = LINECOLOR;
    c.lineCap     = 'square';	
	c.stroke();		 

	// Tercer circulo
	c.beginPath();	
	c.arc(posBC,alturaPelota,radioLimites,0,2*Math.PI,true);	
	c.strokeStyle = 'red';
    c.lineCap     = 'square';	
	c.stroke();		 

	// flecha con sentido de la red
	c.beginPath();
	c.moveTo(posx,posy - (arcRadio + 40)+40); 
	c.lineTo(posx-10, posy - (arcRadio + 50) +40); 
	c.moveTo(posx, posy - (arcRadio + 40)+40); 
	c.lineTo(posx-10, posy - (arcRadio + 30)+40); 
	c.lineWidth   = 2;
	c.strokeStyle = LINECOLOR;
	c.lineJoin    = 'miter';
	c.stroke();
	
}

function dibujaArrow(canvas, posx,posy) {
	var c = canvas.getContext('2d');
	c.beginPath();
	c.moveTo(posx,posy - 100); 
	c.lineTo(posx-10, posy - 110); 
	c.moveTo(posx, posy - 100); 
	c.lineTo(posx-10, posy - 90); 
	c.lineWidth   = 2;
	c.strokeStyle = LINECOLOR;
	c.lineJoin    = 'miter';
	c.stroke();
}


function dibujaArcos2(canvas,posx1,posy1) {
	var c = canvas.getContext('2d');
	c.beginPath();
	c.arc(posx1,posy1,arcRadio,0,3.14,true);
	c.lineWidth   = 2;	
	c.strokeStyle = LINECOLOR;
	c.lineCap     = 'round';
	c.stroke();
}

function writeMessage(canvas, message,posx, posy) {
	var c = canvas.getContext('2d');
	c.font      = '9pt Calibri';
	c.fillStyle = LINECOLOR;
	c.fillText(message,posx - arcRadio/4 ,posy - arcRadio/2);
}

function writeNetwork(canvas,tag1, posx, posy) {
	var c = canvas.getContext('2d');
	c.font      = 'bold 9pt Times';
	c.fillStyle = LINECOLOR;
	c.fillText(tag1,posx -arcRadio - 11  ,posy + 12);
}

function writeNetworkInternalValues(canvas,tag1, posx, posy, cantHost) {
	var c            = canvas.getContext('2d');
	var tt = parseInt(tag1);
	var longi = tt.toString().length;
	
	switch(longi) {
		case 2:
			posPrimera = posx - 0.79*arcRadio;
	        alturaPelota = posy - 0.12*arcRadio;
	        posUltima = posx + 0.68*arcRadio;
	        posBC     = posx + 0.25*arcRadio;
	        radioLimites = 0.20*arcRadio;
		break;
		case 3:
	          posPrimera   = posx - 0.86*arcRadio;
	          alturaPelota = posy - 0.12*arcRadio;
	          posUltima    = posx + 0.60*arcRadio;
	          posBC        = posx + 0.15*arcRadio;
	          radioLimites = 0.20*arcRadio;
		break;
		default:
			posPrimera = posx - 0.79*arcRadio;
	        alturaPelota = posy - 0.12*arcRadio;
	        posUltima = posx + 0.61*arcRadio;
	        posBC     = posx + 0.25*arcRadio;
	        radioLimites = 0.20*arcRadio;
	}
			
	c.font = 'Bold 6pt Calibri';
	c.fillStyle = LINECOLOR;
	c.fillText(parseInt(tag1) + 1,posPrimera,alturaPelota);// Write in circle 1 -
	c.fillText(parseInt(tag1) + parseInt(cantHost) - 2 ,posBC, alturaPelota);    // Write in circle 2 -
	c.fillText(parseInt(tag1) + parseInt(cantHost) - 1,posUltima, alturaPelota);// Write in circle 3 -		
}

function getVector1(canvas, posInitialY,numOfColumnsToShow, numOfNetworksToShow) {

var cont = 0;
var aux1 = [];
var aux2 = [];

for ( j = 0; j < numOfColumnsToShow; j++) {
 aux2.push(posInitialY*(j+1));
 for (i = 1; i <= numOfNetworksToShow ; i++ ) {
	dibujaArcos2(canvas,arcRadio*(1+0.5 + 2*(i-1)),posInitialY*(j+1));
	dibujaLimites(canvas,arcRadio*(1+0.5 + 2*(i-1)),posInitialY*(j+1));
   if( cont % numOfNetworksToShow == 0) {
	aux1.push(arcRadio*(1+0.5 + 2*(i-1)));
   }
 }
 cont++;

}	 
}

function concatenador(numOfColumnsToShow, numOfNetWorksToShow, canvas) {
	var k = numOfNetWorksToShow;
	var inicio = 0;
	var extremo = numOfNetWorksToShow - 1;
	var k2 = 0;
	var k3 = 0;
	for ( j = 0; j < numOfColumnsToShow -1 ; j++) {
		k2 = 100*(1+j); // calcula coordenadas de extremo en Y
		k3 = 103*(2+j);
		dibujaLineasVert(canvas, coordenadasX[extremo] + arcRadio, k2, 20,3);
		dibujaLineasVert(canvas, coordenadasX[inicio] - arcRadio, k3, -80,3);		 		
		dibujaLineasHoriz(canvas, coordenadasX[inicio] - arcRadio, k3 - 80, coordenadasX[extremo] + arcRadio,3);

	}
	
}

//*********************** Action *************************************
//var canvas = document.getElementById("tela");
// La accion se mudo para el boton de Esquema 


function dimensionaCanvas(tam_red) {	
	var t = parseInt(tam_red);
	var c = 30;
	var k1 = new Number();	
    if (t >= 8) {
	  k1 = (t / 8);
	} else {
          k1 = 170;
	}
	return k1*100 +70;	
}


// Operaciones del canvas2, para la tabla resumen.-

function fillTabla(fila, separador) {
  var canvas2 = document.getElementById("tela2");
  for (var j = 0; j < 8 ; j++) {
    writeTableRow(canvas2,fuenteNormal, fila[j],positionX[j],separador); 
  }
}

function colocaCabeceraTabla() {
var canvas2 = document.getElementById("tela2");
var tablaStartPosX = 20;
var tablaAnchoTotal = 642;
var cabeceraTabla = [24,59,131,206,293,383,458,558];
var cabecera2Tabla = [61,142];
var subCabeceraTabla = [61,130,288,383];
var lineaSuperior = 20;
var lineaSuperior2 = lineaSuperior + 28;

dibujaLineasHoriz(canvas2, tablaStartPosX, lineaSuperior, tablaAnchoTotal, lineaSuperior,2);
dibujaLineasHoriz(canvas2, tablaStartPosX, lineaSuperior2, tablaAnchoTotal, lineaSuperior2,2);

for (var j= 0; j < 8; j++) {
	writeTableRow(canvas2,fuenteHeader,datosCabecera[j],cabeceraTabla[j],35);
}
var subFuenteTabla = [fuenteHeader2, fuenteHeader2, fuenteHeader, fuenteHeader];

for (var j = 0; j < 4; j++) {
  writeTableRow(canvas2, subFuenteTabla[j], datos2Cabecera[j],subCabeceraTabla[j], 45);
  }

//  fillTabla(poskk, 65);
}

function dibujaCanvasScrollbar() {
 var canvas = document.getElemetById('tela');
 ctx = canvas.getContext('2d');
}

/*
var datos = createDataStruct(4);

datos[0][0]="X1";
datos[0][1]="XXX"; 
datos[0][2]="XXX";
datos[0][3]="255.255.255.255";
datos[0][4]="255.255.255.255";
datos[0][5]="255.255.255.255";
datos[0][6]="255.255.255.nu1";
datos[0][7]="255.255.255.nu2";
datos[1][0]="X1";
datos[1][1]="XXX"; 
datos[1][2]="XXX";
datos[1][3]="255.255.255.255";
datos[1][4]="255.255.255.255";
datos[1][5]="255.255.255.255";
datos[1][6]="255.255.255.nu";
datos[1][7]="255.255.255.nu2";
datos[2][0]="X1";
datos[2][1]="XXX"; 
datos[2][2]="XXX";
datos[2][3]="255.255.255.255";
datos[2][4]="255.255.255.255";
datos[2][5]="255.255.255.255";
datos[2][6]="255.255.255.nu";
datos[2][7]="255.255.255.nu2";
datos[3][0]="X10";
datos[3][1]="XXX1"; 
datos[3][2]="XXX2";
datos[3][3]="255.255.255.253";
datos[3][4]="255.255.255.254";
datos[3][5]="255.255.255.255";
datos[3][6]="255.255.255.nu";
datos[3][7]="255.255.255.nu2";

// 1eiro grupo
var posP = 60;

for (var i = 0; i < 4; i++) {
  var posS = posP + i*19;	
  for (var j= 0; j < 8; j++) {
	writeTableRow(canvas2,fuenteNormal,datos[i][j],poskk[j],posS);
	dibujaLineasHoriz(canvas2, tablaStartPosX, posS + 4, tablaAnchoTotal, posS + 4,2);
  }
}
*/

