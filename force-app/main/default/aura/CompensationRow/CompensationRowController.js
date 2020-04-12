({
	doInit : function(component, event, helper) {
        if(component.get("v.compensation.Status__c") === "NOT SUBMITTED"){
            component.set("v.notSubmitted", true);
        }
        else{
            component.set("v.notSubmitted", false);
        }
	},
    editRecord : function(component, event, helper) {
        helper.editRecord(component, event);
    }, 
    onCheck : function(component, event, helper) {
        helper.onCheck(component, event);
    }
})