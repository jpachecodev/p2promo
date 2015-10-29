//* **************************************
// Otra linea
// Script file for the SketchPad page
//***************************************

//	Globals constants and variables
const minSize      = 10;
const maxSize      = 125;
const minOctetoIP  = 0;
const maxOctetoIP  = 255;
const aa           = "11111111";
const mm           = 27;
const coordenadasX = [90,210,330,450,570,690,810,930];
const myHost = [2,4,8,16,32,64,128,256,512,1024,2048,8192,16384,32768,65536];
const myMessage1 = "Atencion no se puede crear la cantidad de redes.\nLas posiciones razones son: ";
const myMessage2 = "Verifique el numero de redes posibles.\n Verifique que el numero de hosts";



//const texto_mask = '--Msk Red --'; 

old_octeto1_IP = 190;
old_octeto2_IP = 170;
old_octeto3_IP = 116;
old_octeto4_IP = 224;

oldMASK = curMax = 16;
minMASK = 16;
maxMASK = 32;	


old_mask1_min = 16;
old_mask1_max = 32;

oldSize = curSize = 16;	
curDiv = true;
curColor       = '#0080C0';	
curPenType     = 'SOLID';
initMethod     = 'FLSM';
selectedMethod = initMethod;
base1          = "base";

$(document).ready(function() {
		
	$('#json-one').change(function() {

	var $dropdown = $(this);
				
	$.getJSON("js/data.json", function(data) {
	var key = $dropdown.val();
	var vals = [];

	switch(key) {
		case 'a':
			vals = data.a.split(",");
		break;
		case 'b':
			vals = data.b.split(",");
		break;
		case 'c':
			vals = data.c.split(",");
		break;
		case 'd':
			vals = data.d.split(",");
		break;
		case 'e':
			vals = data.e.split(",");
		break;
		case 'f':
			vals = data.f.split(",");
		break;
		case 'g':
			vals = data.g.split(",");
		break;
		case 'h':
			vals = data.h.split(",");
		break;
		case 'i':
			vals = data.i.split(",");
		break;
		case 'j':
			vals = data.j.split(",");
		break;
		case 'k':
			vals = data.k.split(",");
		break;
		case 'l':
			vals = data.l.split(",");
		break;
		case 'm':
			vals = data.m.split(",");
		break;
		case 'n':
			vals = data.n.split(",");
		break;
		case 'o':
			vals = data.o.split(",");
		break;
		case 'p':
			vals = data.p.split(",");
		break;																												
		case 'base':
			vals = ['Seleccione la m&aacute;scara de SR'];
	}
					
    var $jsontwo = $("#json-two");
    $jsontwo.empty();
	$.each(vals, function(index, value) {
		$jsontwo.append("<option>" + value + "</option>");
	});
	enableCheckDir();		
	});
    });
    
    // *****
    var counter = 2;

   $("#addButton").click(function () {
	   
	if(counter > 10){
            alert("Only 10 textboxes allow");
            return false;
	}   

    agregaRequisito(counter);        	
	counter++;
    });
   
    $("#removeButton").click(function () {
		 
	   if(counter == 1){
          alert("No more textbox to remove");
          return false;
       }   
        
	  counter--;
			
       $("#TextBoxDiv" + counter).remove();
			
     });

     $("#getButtonValue").click(function () {	
	   var msg = '';
       //datos = createDataStruct(counter);
       arreglo = arregloAux = [];
	   for(i=0; i< (counter - 1); i++){
   	      arreglo.push(parseInt($('#textbox' + (i+1)).val()));
   	      console.log("Esto es datos ("+ i+")--->"+ arreglo[i]);
	   }
	   console.log("REQUISITOS: ", counter);
       /* Si el metodo es VLSM ordeno al reves, bueno antes que se ajusten	 
        * copio el arreglo original, tambien si el FLSM sirve para
        * obtener el mayor requisito
        */
       arregloAux = arreglo;  
       arreglo.sort(descendingNumHosts);

       // caso Flsm
       var mayorRequisito = arreglo[0];
       arreglo = adjustValuesfromHostsValue(counter,arreglo);
       console.log("Mayor requisito es: " + mayorRequisito);
       console.log("Todas las redes seran de tamanho ", mayorRequisito);        
	   for(i=0; i< (counter - 1); i++){		   
   	      console.log("Esto es datos DEPOIS ("+ i+")"+ arreglo[i]);
	   }
	   console.log("Tambem eu conheco " + curMax);
       octeto3_IP = $('#ip_3').val();
	   octeto4_IP = $('#ip_4').val();  
       console.log("O quarto octeto e " + octeto4_IP);
       var calculo = determinador(curMax);
       var cam = generateNumbers(octeto3_IP, octeto4_IP, calculo.t, arreglo[0], arreglo.length);	
       var cont = 0;
       for (var j = 0; j < arreglo.length; j++) {
				console.log("SR#" + cont);
    			console.log("." + cam.penultimo_octeto[cont] + "." + cam.ultimo_octeto[cont]);
				cont++;
       }	
	   
       var habilitado = getAvailableNetworks(counter,mayorRequisito);
       console.log("Estou habilitado: ?", habilitado);
     });              
    
    // *****

	//	******************************* Primer octeto *******************************
	$('#ip_1').focus(function() {
		var value_a = $(this).val();
		if(!isNaN(value_a) && value_a >= minOctetoIP && value_a <= maxOctetoIP && value_a != ' ') {
			octeto1_IP = value_a;
		}
		//console.log('Primer octeto es: ' + octeto1_IP);
	});

	//	Para el segundo octeto
	$('#ip_1').blur(function() {
		var value1 = $(this).val();
		if(isNaN(value1) || value1 < minOctetoIP || value1 > maxOctetoIP)
			$(this).val(old_octeto1_IP);
	});
	
	//	 End o Primer octeto 
	//	 Para el segundo octeto ****************************
	$('#ip_2').focus(function() {
		var value_b = $(this).val();
		if(!isNaN(value_b) && value_b >= minOctetoIP && value_b <= maxOctetoIP && value_b != ' ') {
			octeto2_IP = value_b;
		}
		//console.log('Segundo octeto es: ' + octeto2_IP);
	});

	$('#ip_2').blur(function() {
		var value_k = $(this).val();
		if(isNaN(value_k) || value_k < minOctetoIP || value_k > maxOctetoIP)
			$(this).val(old_octeto2_IP);
	});

	//	End o Segundo octeto *****************************
	//	Para el 3rd octeto
	$('#ip_3').focus(function() {
		var value4 = $(this).val();
		if(!isNaN(value4) && value4 >= minOctetoIP && value4 <= maxOctetoIP && value4 != ' ') {
			octeto3_IP = value4;
		}
		//console.log('Tercer octeto es: ' + value4);
	});
	
	//	Callback function for validating the 3rd octet on losing focus
	$('#ip_3').blur(function() {
		var value5 = $(this).val();
		if(isNaN(value5) || value5 < minOctetoIP || value5 > maxOctetoIP)
			$(this).val(old_octeto3_IP);
	});
	//	End o 3rd octeto *****************************

	//	Para el 4th octeto
	$('#ip_4').focus(function() {
		var valueZ = $(this).val();
		if(!isNaN(valueZ) && valueZ >= minOctetoIP && valueZ <= maxOctetoIP && valueZ != ' ')  {
			octeto4_IP = valueZ;
		}
		//console.log('4th octeto es: ' + octeto4_IP);
	});
	
	//	Callback function for validating the 3rd octet on losing focus
	$('#ip_4').blur(function() {
		var value = $(this).val();
		if(isNaN(value) || value < minOctetoIP || value > maxOctetoIP)
			$(this).val(old_octeto4_IP);
	});
	//	End o 4th octeto *****************************
	// Callback function for changing the current pen color

	$('.met-type').change(function() {
		selectedMethod = $(this).val();
		console.log("Ok, selected method", selectedMethod);
	});	

	//	Callback function for building a new canvas' grid
	$('#new').click(function() {
		curMax = $("#json-one :selected").text();
		var IPs = new Array;
		IPs[0] = $('#ip_1').val();
		IPs[1] = $('#ip_2').val();
		IPs[2] = $('#ip_3').val();
		IPs[3] = $('#ip_4').val();

		var valeto = IPs[0] + "." + IPs[1] + "." + IPs[2] + "." + IPs[3];
		var kk = compruebaDirRed(IPs[2],IPs[3],curMax);		
		console.log('Compruebo con: Maskcara =' + curMax + "    Valeto= " + valeto + "Se llama a comparacion: " + kk);
        var campo = document.getElementById("una");
        var texto;
		if (kk == 1) {
		  $('#dividal').removeAttr('disabled');
				  var calculin = determinador(curMax);
				  texto = "Cantidad de redes=" + calculin.n + "<br>"; 
				  texto += "Cantidad de direcciones=" +  calculin.m + "<br>";
				  texto += "La base de esta msk es= /" + calculin.t + "<br>";
				  texto += "msk en bin (ultimo octeto) = " + mascara_a_bits(curMax);		  
		} else {
                texto = "Revise que la direcci&oacute;n de entrada sea ";
                texto += "una direcci&oacute;n de red" + "<br>";
                texto += "Direcci&oacute;n de prueba: " + valeto + "/" + curMax +"<br>";
                texto += "_NO_ es una direcci&oacute;n de red.";
                initInputElements();
                disableCheckDir();  // deshabilito el button si no hay video;
						        
        }
        campo.innerHTML = texto;

	});
	
    $('.selecciona_metodo').change(function() {
        var calon = $(this).val();
        console.log("Bueno",calon);
        if (calon == "via_req") {
			disableSegundoDropD();
			enableEntradaCantidades();
		} else if (calon == "via_msk") {
			enableSegundoDropD();
			enablemascaraSubnetting();
			disableEntradaCantidades();
	}	 
	});
	
	$('#dibuja').click(function() {
		//getAllRows("dataTable");
        limpiaTodoCanvas();        
		var horse = $("#json-two :selected").text(); // De aqui se obtiene un "XX" de la lista de abajo
		var vals         = horse.split(" ",2);
        var calculo      = determinador(vals[0]*1);
        var dimensionado = dimensionaCanvas(calculo.n);
		console.log("******** El alto del canvas sera [170]:", dimensionado);
        console.log("******** Cantidad de redes=", calculo.n);
        console.log("******** Cantidad de direcciones=", calculo.m);
        console.log("******** La base de esta msk es= ", calculo.t)
        console.log("********************************************");      
		var numOfColumnsToShow = calculo.n / 8;
		var numOfNetworksToShow = 8;
		// Llama al tamanho del canvas

        //if (dimensionado >= 800) {      
          redimensionaAltoCanvas(dimensionado);
        //}        
        
        octeto3_IP = $('#ip_3').val();
        octeto4_IP = $('#ip_4').val();
        var cam = generateNumbers(octeto3_IP, octeto4_IP, calculo.t, calculo.m, calculo.n);		
        var canvas = document.getElementById("tela"); 
		getVector1(canvas, posInitialY,numOfColumnsToShow, numOfNetworksToShow);
		var cont = 0;
		var coordenadasY;
        var veca = [];
		for (var i = 0; i < numOfColumnsToShow; i++) {
			coordenadasY = 100*(1+i);
			for (var j = 0; j < numOfNetworksToShow; j++) {
				writeMessage(canvas, "SR#" + cont, coordenadasX[j],coordenadasY);
    			var r = cam.penultimo_octeto[cont] + "." + cam.ultimo_octeto[cont];
                writeNetwork(canvas, "." + r, coordenadasX[j],coordenadasY);
				writeNetworkInternalValues(canvas, cam.ultimo_octeto[cont], coordenadasX[j],coordenadasY,calculo.m);
                veca.push(cont);      // numero de subred
                veca.push(calculo.m); // cantidad de direcciones requeridas
                veca.push(calculo.m); // cantidad de direcciones ajustadas
                veca.push(parseInt(cam.ultimo_octeto[cont])); // direccion de red
                veca.push(parseInt(cam.ultimo_octeto[cont])+1); // primera direccion
                veca.push(parseInt(cam.ultimo_octeto[cont])+ calculo.m - 2); //penultima dir
                veca.push(parseInt(cam.ultimo_octeto[cont])+ calculo.m - 1); //ultima dir
                veca.push(toDecimal(mascara_a_bits(calculo.t)));
                console.log("VECA:"+veca[0]+"#"+veca[1]+"#"+veca[2]+"#"+veca[3]+"#"+veca[4]+"#"+veca[5]+"#"+veca[6]+"#"+veca[7]);
                console.log("Valor cam.ultimo:", cam.ultimo_octeto[cont]+"#### " + calculo.m + "Cont:"+cont);
                cont++;
			}
		}
		/*
		//for (var j = 0; j < numOfNetworksToShow; j++) {
    		//writeNetwork(canvas, "." + cam.ultimo_octeto[j], coordenadas.x[j],coordenadas.y[i]);
			//writeNetworkInternalValues(canvas, 4, coordenadas.x[j],coordenadas.y[i]);
		}
		*/
				
		if (numOfColumnsToShow > 1) {
			concatenador(numOfColumnsToShow, numOfNetworksToShow, canvas);
		}
		var valeto = $('#ip_1').val() 
        valeto += "." 
        valeto += $('#ip_2').val() + "."
        valeto += "x.y" 
		valeto += "   *** No. Subredes (SR): " + calculo.n;
		valeto += " *** No. direcciones: " + calculo.m + " p/SR ***";
		writeMessage(canvas,valeto,100,48);
       // fin de la actividad en el canvas
       // Inicio de la actividad en la tabla resumen de resultados
        fillTabla(positionX, 65);
	});
});

//	Sets the UI input elements with initial values
// function initInputElements(size, show, color, style)
function initInputElements() {
	// Valores iniciales de la direccion IP
        $('#ip_1').val(old_octeto1_IP);
        $('#ip_2').val(old_octeto2_IP);
        $('#ip_3').val(old_octeto3_IP);
        $('#ip_4').val(old_octeto4_IP);
        //$("#selecciona_metodo").val("VLSM");
	    $('.met-type').filter("[value="+initMethod+"]").attr({'checked':true});        
        //$("#json-one :selected").value("base");
		$('#json-one').val(base1);
        //$('#json-one').val(texto_mask); // TODO. arreglar esto del valor inicial del combobox.
        //$('#mask1').val(mm);
	//	Show divisions - check box
	    disableEntradaCantidades();
	    enablemascaraSubnetting();
	    $('#textbox1').val('');
	
}


function compruebaDirRed(tercer, cuarto, msk) {
  var p1      = new Number(msk_base(msk)); // se obtiene la mask base, 16 o 24
  var tercer_ = new Number(tercer);
  var cuarto_ = new Number(cuarto);
  var res     = new Number();
  var prueba  = new Number();
  var dir_red = new Number();

/* Al principio no es una direccion de red */
  dir_red = 0;  
  var ultimo_num_msk = toDecimal(mascara_a_bits(msk)); // Obtiene el valor decimal del octeto != 255 en la msk
  console.log("Voy a comparar este octeto " + tercer_ + " con este otro " + cuarto_ + " y la mask " + msk);
  console.log("Mascara en bits(binario) " + mascara_a_bits(msk));

  if (p1 == '16') {
    prueba = tercer_; // trabajo el tercer octeto
    if (cuarto_ != '0') {
		prueba = -1; // condicion de este trabajo, las msk de /16 deben tener 4to octeto en _0_
		console.log("El cuarto octeto no es Cero");
	}	 
  } else if (p1 == '24') {
    prueba = cuarto_; 
  } else {prueba = -1;}
	 
  var res = prueba & ultimo_num_msk;
  console.log("Valor de la AND = " + res);
  if (res == prueba) {
    dir_red = 1;
  }
  return dir_red;	  	  
}

// ************************************************************ 
// Name: creaCeros
// argumentos: num_ceros
// Proposito: Crea una variable tipo cadena con el numero
//            de ceros indicados por <num_ceros>
// Retorna: variable b1 con la lista de ceros,
// ejemplo:
//       creaCeros(6)---> 000000
// ************************************************************

function creaCeros(num_ceros) {
  var b1 = new String();
  for ( var i = 0; i < num_ceros; i++ ) { b1 +=  0; }
  return b1;    
}

// ************************************************************ 
// Name: mascara_a_bits
// argumentos: msk
// Proposito: Convierte la mascara en el numero de bits
//            indicados por <num_bits>, solo se calcula el 
//            ultimo valor de msk distinto de 255
// Retorna: Ultimo valor de la mascara en bits,
// ejemplo:
//       mascara_a_bits(26)---> 1100 0000
// ************************************************************
function mascara_a_bits(msk) {

var num_bits = 0;
var bb = new String();
var aux1 = new String();
var aux2 = new String();
var p1 = new Number(msk_base(msk));    
//console.log("La MSK base es: " + p1);
    
  if (p1 == "16") {
     num_bits = (msk - 16); // Resta la cantidad de bits de base 16
     } else if (p1 == "24") {
     num_bits = (msk - 24);  // Resta la cantidad de bits de base 24      	    
     } else {
	  console.log("Error en la MSK: " + msk);
  }
  aux1 = aa.slice(0,num_bits); // Recorta de la variable 1111 1111
  aux2 = creaCeros(8-num_bits);
  aux2 = aux1.concat(aux2);     
  return aux2;
}

function determinador(msk) {

var num_bits_red = 0;
var num_bits_host = 0;
var p1 = new Number(msk_base(msk));    
//console.log("La MSK base es: " + p1);
var aux1 = new Number();
var aux2 = new Number();
var aux3 = new Number();
aux1 = aux2 = aux3 = -1; // inicializacion en caso de error
    
  if (p1 == "16") { 
     num_bits_red = (msk - 16); // Resta la cantidad de bits de base 16
     aux3 = 16;
     num_bits_host = 16 - num_bits_red;
     } else if (p1 == "24") {
     num_bits_red = (msk - 24);  // Resta la cantidad de bits de base 24
     aux3 = 24;
     num_bits_host = 8 - num_bits_red;
     } else {
	  console.log("Error en la MSK: " + msk);
      aux3 = -1;	  
  }
  aux1 =  Math.pow(2,num_bits_red);
  aux2 =  Math.pow(2,num_bits_host);
  
	return {
		n: aux1, // n, numero de redes
		m: aux2, // m, numero de direcciones/red	
	    t: aux3, // t, tipo de red, en base a /16 = 16, /24 = 24;
	};  	
}

// ************************************************************ 
// Name: msk_base
// argumentos: msk
// Proposito: Determina si la msk se encuentra en el intervalo
// si (16,24) entonces la base es 16
// si (24,32) entonces la base es 24
// si la base esta fuera de ese rango entonces la base es -1 
// Retorna: el valor de la base,
// ejemplo:
//       msk_base(26) -----> 
//       mascara_a_bits(26)---> 192
// ************************************************************
var msk_base = function(msk) {
  var base = new Number();
  	
  if (msk >= 16 && (msk < 24)) {
     base = 16;
  } else if (msk >= 24 && (msk < 32)){
     base =  24;  
  } else { base =  -1;}
  return base;      
}

var toBinary = function(decNum){
    return parseInt(decNum,10).toString(2);
}

var toDecimal = function(binary) {
    return parseInt(binary,2).toString(10);
}

function toHex(number) {
	var value = number.toString(16);
    if( (value.length % 2) > 0 ){ value = "0" + value; }
    return value;
}
function limpiaTodoCanvas() {         		
        var canvas = document.getElementById("tela");
        var c = canvas.getContext('2d');
        c.clearRect(0, 0, 1000, 1100);
        // Limpia la tabla de resumen de direcciones
        var can2 = document.getElementById("tela2");
        var d = can2.getContext('2d');
        d.clearRect(0,0,1000,1000);
        colocaCabeceraTabla();
        redimensionaAltoCanvas(400);
}

function disablemascaraSubnetting() {
  document.getElementById("mascaraSubnetting").disabled=true;
}

function enablemascaraSubnetting() {
  document.getElementById("mascaraSubnetting").disabled=false;
}
  
function disableEntradaCantidades() {
  document.getElementById("entradaCantidades").disabled=true;
}

function enableEntradaCantidades() {
  document.getElementById("entradaCantidades").disabled=false;
}

function disableSegundoDropD() {
    document.getElementById("json-two").disabled=true;
}

function enableSegundoDropD() {
    document.getElementById("json-two").disabled=false;
}

function disableCheckDir() {
    document.getElementById("new").disabled=true;
}

function enableCheckDir() {
    document.getElementById("new").disabled=false;
}

function redimensionaAltoCanvas(dimensionado) {
		var tf=parseInt(dimensionado);
        var cago = $('#lienzo');
		//cago.css({'height':tf});
		document.getElementById("tela").height=tf;
		
}
/* funcion: generateNumber
 * Argumento: terceiro, cuarto, base, numHost, numRed
 * salida: dos arreglos con
 */

function generateNumbers(terceiro, cuarto, base, numHost, numRed) {
     var aux1 = [];
     var aux2 = [];
     var j = 0;
     var cont = 0;
     aux1.push(cuarto);
     aux2.push(terceiro);
     var h;
     var p;
     if (base == "24") {
	   for ( var i = 1; i < numRed ; i++ ) {
		  j = parseInt(aux1[i-1]) + numHost;
		  if (j >= 256) {j=0;cont++;}
		     p = parseInt(terceiro) + cont;
		     //console.log("terceiro + p: ", p);
		     aux2.push(p);
			 aux1.push(j);
			 h = $('#ip_1').val() + "." + $('#ip_2').val() + "." + aux2[i] + "." + aux1[i]; 
			 console.log("Red: " + h);
	   }
     } else {
		 var m = numHost / 256; // Si el num de host > 256; divide / 256
	     for ( var i = 1; i < numRed ; i++ ) {
		  j = parseInt(terceiro) + m*i;
		  aux2.push(j);
		  aux1.push(0); // se agrega "0's" en el cuarto octeto
		   h = $('#ip_1').val() + "." + $('#ip_2').val() + "." + aux2[i] + "." + aux1[i];  
	      console.log("Red: " + h);
	    }		 
	 }	 
	return {
		ultimo_octeto: aux1,
		penultimo_octeto: aux2,	
	};     	 

}

function agregaRequisito(identifier) {

	var newTextBoxDiv = $(document.createElement('div'))
	     .attr("id", 'TextBoxDiv' + identifier); 
	var p = '<label class="normal-label">Red # ';
	p += identifier + ' : </label>';
	p += '<input type="text" name="textbox' + identifier;
	p += '" id="textbox' + identifier + '" value="" >';
    newTextBoxDiv.after().html(p);
    newTextBoxDiv.appendTo("#TextBoxesGroup");
}
initInputElements();

/*
 * funcion: getRealHostsValue
 * argumento: comp (numero)
 * Proposito: itera sobre el arreglo global myHost con la funcion
 * forEach y obtiene el numero que se encuentra entre el intervalo
 * minimo y maximo de los hosts, variable global myHost:
 * hosts: 2,4,8,16,32,64,128,256,512,1024,2048,4096...
 * Ejemplo: comp <-- 45
 * este numero se encuentra entre 32 y 64, el numero real para este host
 * seria 64.
 * Casos especiales cuando el numero se encuentra en el intervalo inferior
 * o superior hasta una distancia 1, en ese caso se resta 2 para la
 * comprobacion.
 * Ejemplo caso especial: 63
 * Se encuentra entre 32 y 64, se elige entonces el inmediato superior (128)
 * Salida: el numero real de hosts en la matematica de 8 bits
 * Llamado por: funcion adjustValuesfromHostsValue
 */

function getRealHostsValue(comp) {
var othHost = [];
for (var i = 0; i < myHost.length; i++) {
	//console.log("Comparo a "+ comp + " con: " + myHost[i]);
	if (comp < (myHost[i] - 2)) {
		//console.log("comp " + comp + " < " +  (myHost[i] - 2));
        othHost.push(myHost[i]); // obtengo todos los numeros q son mayores q "comp"
	}
}
	return othHost[0]; // el primer maximo esta en la posicion 0
}

/*
 * funcion: adjustValuesfromHostsValue
 * Argumentos : 
 * 
 */

function adjustValuesfromHostsValue(counter,arreglo) {
	//console.log("Enter here with counter= "+counter + " and an array of length " 
	// + arreglo.length);
	var arrAdjusted = [];  
	for (var i = 0; i < counter - 1; i++) {
		//console.log("Llamo al ajustador del dato: "+ i+ "con esto:"+ arreglo[i]);
    	arrAdjusted.push(getRealHostsValue(arreglo[i]));
    	//console.log("Ajustadin y hugo "+ arreglo[i] + " agora e " + arrAdjusted[i]);
	}
	return arrAdjusted;
}

function descendingNumHosts(a,b) {
   return b - a;	
}

function getAvailableNetworks(numReq, mayorRequisito) {
   var calculin = determinador(curMax);
   var texto;
   var cantidadRedes = calculin.n;
   var cantidadHost = calculin.m;

   // la condicion de prueba es si el numreq > cantidadRedes posibles
   // entonces se debe revisar las cantidades
   // O tambien si el mayorRequisito es > cantidadHost
   if ((numReq - 1) > cantidadRedes || (mayorRequisito > cantidadHost)) {
	  habilitado = 0; 
	  alert(myMessage1+myMessage2);
   } else {
	  habilitado = 1; 
	  console.log("Se puede");
   } 	   	    
   // debo comparar si sumando la cantidadHost al ultimo
   // o penultimo octeto se pasa de la mask base.
   return habilitado;	
}


