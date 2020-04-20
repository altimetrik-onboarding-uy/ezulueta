({
    getCompensations: function(component) {
        var action = component.get("c.getCompensations");
        try {
            action.setCallback(this, function(response) {
                if (response.getState() === "SUCCESS") {
                    component.set("v.compensationDetails", response.getReturnValue());
                } else {
                    throw new Error("Error retrieving compensation details.");
                }
            });
            $A.enqueueAction(action);
        } catch (e) {
            console.error(e);
        }
    },
    filter: function(component, event) {
        var filter, filter_2;
        if (event.getSource().getLocalId() === "select") {
            filter = event.getSource().get("v.value");
            if (!component.find("select_2").get("v.value")) {
                filter_2 = "All Compensations Status";
            } else {
                filter_2 = component.find("select_2").get("v.value");
            }
        } else {
            filter_2 = event.getSource().get("v.value");
            if (!component.find("select").get("v.value")) {
                filter = "All Compensations Types";
            } else {
                filter = component.find("select").get("v.value");
            }
        }
        var rows = document.getElementById("table").rows;
        for (var i = 1; i < rows.length; i++) {
            if (
                (filter === "All Compensations Types" ||
                 rows[i].cells[3].innerHTML === filter) &&
                (filter_2 === "All Compensations Status" ||
                 rows[i].cells[8].innerHTML === filter_2)
            ){
                rows[i].style.display = "table-row";
            }
            else {
                rows[i].style.display = "none";
            }
        }
    },
    submitSelected : function(component){
        var cmpList = component.get("v.compensationDetails");
        var cmpUpdated = [];
        for(var i = 0; i<cmpList.length; i++){
            if(cmpList[i].Status__c === "NOT SUBMITTED" && cmpList[i].Submitted__c === true){
                cmpUpdated.push(cmpList[i]);
            }
        }
        if (cmpUpdated.length > 0){
            this.sendToServer(component, cmpUpdated);
        }        
    },
    sendToServer : function(component, cmpUpdated){
        var action = component.get("c.updateCompensation");
        action.setParams({"cmps" :cmpUpdated});
        try {
            action.setCallback(this, function(response) {
                if (response.getState() === "SUCCESS") {
                    $A.get('e.force:refreshView').fire();
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "",
                        "type": "success",
                        "message": "The records has been submitted successfully!" 
                    });
                    toastEvent.fire();
                } else {
                    throw new Error("Error updating compensations.");
                }
            });
            $A.enqueueAction(action);
        } catch (e) {
            console.error(e);
        }
    },
    exportTableToCSV : function(component, event){
        var finalListToDownload=component.get("v.compensationDetails");
        var csv=this.convertArrayOfObjectsToCSV(component,finalListToDownload); 
        if(csv==null)
        {
          return ;
        }                         
        var elementLink=document.createElement('a');
        elementLink.href='data:text/csv;charset=utf-8,'+encodeURI(csv);
        elementLink.target='_self';
        elementLink.download='ExportDataTable.csv';
        document.body.appendChild(elementLink);
        elementLink.click();
        $A.get('e.force:refreshView').fire();
    },
    convertArrayOfObjectsToCSV : function(component, objRecords) {
        var csvStringResult,counter,keys,lineDivider,columnDivider;
        if(objRecords==null || !objRecords.length)
        {
            return null;         
        }
        columnDivider=',';
        lineDivider='\n';
        keys=['Contact_Compensation__r','Contact_Compensation__r', 
        'Job_Category__c', 'RecordType', 'Amount__c', 'Location__c', 
        'Office__c', 'Submitted__c', 'Status__c'];
        csvStringResult='';
        csvStringResult+=keys.join(columnDivider);
        csvStringResult+=lineDivider;
        for(var i=0;i<objRecords.length;i++)
        {
            counter=0;
            for(var tempKey in keys)
            {
                var skey=keys[tempKey];
                if(counter>0)
                {
                    csvStringResult+=columnDivider;
                }
                if(typeof objRecords[i][skey] === 'object' && (skey === 'Contact_Compensation__r')){
                    if(counter == 0){
                        csvStringResult+='"'+objRecords[i][skey].Name+'"';
                    }
                    else{
                        csvStringResult+='"'+objRecords[i][skey].Birthdate+'"';
                    }
                    counter ++;
                }
                else if(typeof objRecords[i][skey] === 'object' &&  skey === 'RecordType'){
                    csvStringResult+='"'+objRecords[i][skey].Name+'"';
                    counter ++;
                }
                    else{
                        csvStringResult+='"'+objRecords[i][skey]+'"';
                        counter ++;
                    }
            }
            csvStringResult+=lineDivider;
        }     
        return csvStringResult
    },
});