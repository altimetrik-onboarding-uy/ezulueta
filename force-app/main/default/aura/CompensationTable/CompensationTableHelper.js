({
	getCompensations : function (component) {
		var action = component.get("c.getCompensations");
        action.setCallback(this,function(response){
            if (response.getState() === "SUCCESS"){
                component.set("v.compensationDetails",response.getReturnValue());
            }
            else
            {
                alert('Error retrieving compensation details.');
            }
        });
        $A.enqueueAction(action);
	},
    filter : function (cmp){
        var x = component.get("v.compensationDetails");
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        //input = document.getElementById("myInput");
        input = "Janet";
        //filter = input.value.toUpperCase();
        filter = input.toUpperCase();
        //console.log("div1: ", cmp.find("myTable").getElement());
        table = cmp.find('myTable');
        //tr = table.get('v.value');
        tr = table.get('v.value');
        alert(tr);
        
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    },
})