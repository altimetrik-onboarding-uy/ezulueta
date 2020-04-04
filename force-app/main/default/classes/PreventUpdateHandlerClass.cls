public class PreventUpdateHandlerClass {
    
    public static void PreventUpdateMethod(List<Compensation__c> compensations){
        for(Compensation__c cmp : compensations){
            if(cmp.Status__c == 'SUBMITTED' || cmp.Status__c == 'APPROVED'){
                cmp.adderror('Sorry, you can´t edit a compensation that is already submitted.');
            }
        }
    }
}