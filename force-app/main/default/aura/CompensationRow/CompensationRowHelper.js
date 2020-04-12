({
	editRecord : function (component, event){
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
             "recordId": event.currentTarget.id
       	});
        editRecordEvent.fire();
    },
    onCheck : function(component, event){
        var cmp = component.get("v.compensation");
        if(event.getSource().get("v.checked") === true){
            cmp.Submitted__c = true;
        }
        else{
            cmp.Submitted__c = false;
        }
        component.set("v.compensation", cmp);
    }
})