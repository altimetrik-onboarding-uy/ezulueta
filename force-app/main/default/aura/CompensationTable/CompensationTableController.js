({
	doInit : function(component, event, helper) {
        helper.getCompensations(component);
        helper.filter(component);
    },
    filter : function(component, event, helper) {
        helper.filter(component);
    },
})