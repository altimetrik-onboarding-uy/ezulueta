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
    var filter = event.getSource().get('v.value');
    var rows = document.getElementById("table").rows;
    for (var i = 1; i < rows.length; i++) {
      if (
        filter === "All compensations" ||
        rows[i].cells[3].innerHTML === filter
      )
        rows[i].style.display = "table-row";
      else rows[i].style.display = "none";
    }
  }
});