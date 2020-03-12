global class ScheduledSubmit implements Schedulable 
{
	global void execute(SchedulableContext SC) {
      	AutomaticSubmitCompensations obj = new AutomaticSubmitCompensations();
		Database.executeBatch(obj);
    }
}