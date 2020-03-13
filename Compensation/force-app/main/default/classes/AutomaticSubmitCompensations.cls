global class AutomaticSubmitCompensations implements Database.batchable<sObject> 
{
    global Database.QueryLocator start(Database.BatchableContext BC)
    {
        String query = 'Select Submitted__c From Compensation__c Where Submitted__c = False AND Created_Date__c < LAST_N_DAYS:2';
        return Database.getQueryLocator(query);
    }
   
    global void execute(Database.BatchableContext BC, List<Compensation__c> scope)
    {
        List<Compensation__c> cmps = new List<Compensation__c>();
        for(Compensation__c s : scope)
         {
             s.Submitted__c = True;
             cmps.add(s);
         }
         update scope;
    }
   
    global void finish(Database.BatchableContext BC)
    {
    }
   
}