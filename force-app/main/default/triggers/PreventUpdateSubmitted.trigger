trigger PreventUpdateSubmitted on Compensation__c (before delete, before update) {
	if (trigger.isBefore ){
        if( trigger.isDelete || trigger.isUpdate)
        {
            PreventUpdateHandlerClass.PreventUpdateMethod(trigger.old);
        }
    }
}