function addRow(tableID) {
	var table = document.getElementById(tableID);
	var rowCount = table.rows.length;
	console.log("Aqui el valor de rowCount es: ",rowCount );
	var row = table.insertRow(rowCount);
	
	var cell1 = row.insertCell(0);
	var element1 = document.createElement("input");
	element1.type = "checkbox";
	element1.name = "chkbox[]";
	cell1.appendChild(element1);
	
	var cell2 = row.insertCell(1);
	cell2.innerHTML =  rowCount;
	
	var cell3 = row.insertCell(2);
	var element2 = document.createElement("input");
	element2.type = "text";
	element2.name = "net";	
	element2.id = "cajon";	
	cell3.appendChild(element2);		
}

function deleteRow(tableID) {
	
	try {
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;
		
		for (var i = 0; i < rowCount; i++) {
			var row = table.rows[i];
			var chkbox = row.cells[0].childNodes[0];
			if(null != chkbox && true == chkbox.checked) {
				table.deleteRow(i);
				rowCount--;
				i--;
		}
	}
} catch (e) {alert(e);}
}



function writeTableRow(canvas, tipoFuente, message,posx, posy) {
	var c = canvas.getContext('2d');
	c.font      = tipoFuente;
	c.fillStyle = 'black';
	c.fillText(message,posx,posy);
}


