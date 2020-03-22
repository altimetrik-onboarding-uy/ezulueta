trigger PreventDeleteSubmitted on Compensation__c (before delete) {
	for(Compensation__c cmp : trigger.old){
        if(cmp.Status__c == 'SUBMITTED' || cmp.Status__c == 'APPROVED'){
            cmp.adderror('Sorry, you can´t delete a compensation that is already submitted.');
        }
    }
}