trigger PreventUpdateSubmitted on Compensation__c (before update) {
	for(Compensation__c cmp : trigger.old){
        if(cmp.Status__c == 'SUBMITTED' || cmp.Status__c == 'APPROVED'){
            cmp.adderror('Sorry, you can´t update a compensation that is already submitted.');
        }
    }
}