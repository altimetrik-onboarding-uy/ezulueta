public class CompensationTableController {
	@AuraEnabled    
    Public static list<Compensation__c> getCompensations(){
        return [SELECT id,
                Contact_Compensation__r.Name,
                Contact_Compensation__r.Birthdate,
                Contact_Compensation__c,
                Job_Category__c,
                RecordType.Name,
                Amount__c,
                Location__c,
                Office__c,
                Submitted__c,
                Status__c
                from Compensation__c limit 10];
    }
}