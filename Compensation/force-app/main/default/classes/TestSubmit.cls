@isTest
public class TestSubmit {
    
    @isTest
    public static void TestSchedule()
    {
        Test.startTest();
        ScheduledSubmit sch = new ScheduledSubmit();
        String tstamp = '0 17 16 * * ?';
        system.schedule('Schedule Name', tstamp, sch);
        Test.stopTest();
    }
    
    @isTest
    public static void TestAutomaticSubmit()
    {
        List<Compensation__c> cmps = new List<Compensation__c>();
        Contact c = new Contact(LastName='LastName');
        insert c;
        Integer expectedNumber = 10;
        
        for(Integer i = 0; i < expectedNumber; i++) 
        {
            cmps.add(new Compensation__c(Name='Compensation-'+i,
                                         Contact_Compensation__c = c.Id,
                                         Created_Date__c = Date.newInstance(2020, 2, 17)));
        } 
        insert cmps;
        
        Test.startTest();
        AutomaticSubmitCompensations obj = new AutomaticSubmitCompensations();
        Database.executeBatch(obj);
        Test.stopTest();
        
        Integer realNumber = [SELECT COUNT() FROM Compensation__c WHERE Submitted__c = True];
        System.assertEquals(expectedNumber, realNumber);
    }
}