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
    filter : function (component){
        var filter = component.find("select").get("v.value");
        var rows = document.getElementById("table").rows;
        for(var i=1; i<rows.length; i++){
            if(filter === "All compensations" || rows[i].cells[3].innerHTML === filter)
                rows[i].style.display = "table-row";
            else
                rows[i].style.display = "none";
        }
    },
    editRecord : function (component, event){
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
             "recordId": event.currentTarget.id
       	});
        editRecordEvent.fire();
    }
})