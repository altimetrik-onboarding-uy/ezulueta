({
	doInit : function(component, event, helper) {
        helper.getCompensations(component);
        var options = ["All compensations", "Salary", "Study", "Research"];
        component.set("v.filterOptions", options);
    },
    filter : function(component, event, helper) {
        helper.filter(component, event);
    },
})