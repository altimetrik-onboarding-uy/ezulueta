({
	helperMethod : function() {
		
	},
    editRecord : function (component, event){
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
             "recordId": event.currentTarget.id
       	});
        editRecordEvent.fire();
    },
})