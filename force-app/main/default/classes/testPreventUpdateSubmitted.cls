@isTest
public class testPreventUpdateSubmitted {
	
    static testmethod void testPreventUpdateSubmitted(){
        Contact c = new Contact(LastName='LastName');
        insert c;
        Compensation__c cmp = new Compensation__c(Name='Compensation-',
                                         Contact_Compensation__c = c.Id,
                                         Created_Date__c = Date.today());
        cmp.Submitted__c = True;
        cmp.Status__c = 'SUBMITTED';
        insert cmp;
        Test.startTest();
        try{
            cmp.Submitted__c = False;
            update cmp;
        }catch(DMLexception e){
            system.assert(e.getMessage() != null);
        }
        Test.stopTest();
    }
}