({
	doInit : function(component, event, helper) {
        helper.getCompensations(component);
        var options = ["All Compensations Types", "Salary", "Study", "Research"];
        var options_2 = ["All Compensations Status", "SUBMITTED", "NOT SUBMITTED", "APPROVED", "REJECTED"];
        component.set("v.filterOptions", options);
        component.set("v.filterOptions_2", options_2);
    },
    filter : function(component, event, helper) {
        helper.filter(component, event);
    },
    submitSelected : function(component, event, helper) {
		helper.submitSelected(component);       
    },
    exportTableToCSV : function(component, event, helper) {
		helper.exportTableToCSV(component);       
    },
})