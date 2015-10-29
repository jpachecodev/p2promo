$(function() {
		
$("#json-one").change(function() {

	var $dropdown = $(this);
				
	$.getJSON("js/data.json", function(data) {
	var key = $dropdown.val();
	var vals = [];

	switch(key) {
		case 'beverages':
			vals = data.beverages.split(",");
		break;
		case 'snacks':
			vals = data.snacks.split(",");
		break;
		case 'base':
			vals = ['Seleccione la m&aacute;scara de SR'];
	}
					
    var $jsontwo = $("#json-two");
    $jsontwo.empty();
	$.each(vals, function(index, value) {
		$jsontwo.append("<option>" + value + "</option>");
	});
			
				});
});

		});
