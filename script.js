
var appLists = [
 {
   company: 'Morgan Stanley',
   position: '2017 full-time',
   appliedMethod: 'MorganStanley online',
   appliedTime: '2016/09/25',
   progress: 'Fail'
 },
 {
   company: 'Morgan Stanley',
   position: '2017 Winter Intern',
   appliedMethod: 'MorganStanley Online',
   appliedTime: '2016/10/12',
   progress: '2nd 2017/02/16'
 },

 {
   company: 'Nuance',
   position: 'Software Eng Intern',
   appliedMethod: 'McGill TechFair',
   appliedTime: '2016/09/28',
   progress: 'Fail'
 },
 {
   company: 'Nuance',
   position: 'QA Eng Intern',
   appliedMethod: 'McGill TechFair',
   appliedTime: '2016/09/28',
   progress: 'Fail'
 }
];

$(function(){
   var app = {
     showAppList: function(){
        var appListEl = $('#apps-list');
        appListEl.html('');

        appLists.forEach(function(application,index){
            appListEl.append('\
            <tr class="click-row">\
                <td> '+ ++index + '</td>\
                <td> '+ application.company +'</td>\
                <td> '+ application.position +'</td>\
                <td> '+ application.appliedMethod +'</td>\
                <td> '+ application.appliedTime +'</td>\
                <td> '+ application.progress +'</td>\
                <td>\
                    <button class="edit-button">Edit</button>\
                    <button class="delete-button">Delete</button>\
                    <button class="save-button">Save</button>\
                    <button class="cancel-button">Cancel</button>\
                </td>\
             </tr>\
            ');
        });
        // didn't get it why it doesn't work here
        appListEl.append('\
         <tr class="add-row">\
           <td></td>\
           <td><input type="text" class="edit-input" value=""/></td>\
           <td><input type="text" class="edit-input" value=""/></td>\
           <td><input type="text" class="edit-input" value=""/></td>\
           <td><input type="text" class="edit-input" value=""/></td>\
           <td><input type="text" class="edit-input" value=""/></td>\
           <td>\
             <button class="add-button">Add</button>\
             <button class="clear-button">Clear</button>\
             <button class="edit-button">Edit</button>\
             <button class="delete-button">Delete</button>\
           </td>\
        </tr>\
       ');

     },

     editTodo: function(){
       var actionCell = $(this).parent('td');

       actionCell.find('.edit-button').hide();
       actionCell.find('.delete-button').hide();
       actionCell.find('.save-button').show();
       actionCell.find('.cancel-button').show();
       var temp = actionCell;
       var i = 0;
       var appCell = {};

       while ( i < 5){
          appCell[i] = temp.prev();

          temp = temp.prev();
          temp.html('<input type="text" class="edit-input" value="'+ temp.text() +'"/>');
          temp.find('input').data('val', temp.find('.edit-input').val());
          i++;
       }


     },

     saveTodo: function(){
         var actionCell = $(this).parent('td');
         var i = 0;
         var appCell = {};
         var temp = actionCell;
         while( i < 5 ){

            temp = temp.prev();
            var newValue = temp.find('.edit-input').val();
            appCell[i] = newValue;
            temp.html(newValue);
            i++;

         }
         // move the pointer to first td on that tr
         temp = temp.prev();
         if(i === 5){
            appLists.forEach(function(application, index){

                if( parseInt(temp.text(),10) === index+1){

                  // how to get the length of jQuery length
                  application.progress = appCell[0];
                  application.appliedTime = appCell[1];
                  application.appliedMethod = appCell[2];
                  application.position = appCell[3];
                  application.company = appCell[4];

                }
            });
          }
          actionCell.find('.edit-button').show();
          actionCell.find('.delete-button').show();
          actionCell.find('.save-button').hide();
          actionCell.find('.cancel-button').hide();

      },

    exitEditMode: function(){
       var actionCell = $(this).parent('td');
       var i = 0;
       var temp = actionCell;
       while( i < 5){
          temp = temp.prev();
          var oldValue = temp.find('input').data('val');
          temp.html(oldValue);
          i++;
       };

       actionCell.find('.edit-button').show();
       actionCell.find('.delete-button').show();
       actionCell.find('.save-button').hide();
       actionCell.find('.cancel-button').hide();
    },

    deleteTodo: function(){
       // once the row which triggers the event is removed it cannot be found
       $('.displayError').hide();
       // previous rows in the table doesn't include the row in thead
       // $(this) selector doesn't exist any more when this row is deleted
       var currentRow = $(this).closest('tr').prevAll('tr').length;
       $(this).parent('td').parent().remove();
       var value = $(this).closest('tr').find('td:nth-child(1)').text();
       // is that 'tr' doesn't work?
       //var testValue = $(this).parent('td').prev().parent('tr').next('tr');
       appLists.forEach(function(application, index){
          if( index+1 === parseInt(value, 10)){
               appLists.splice(index, 1);
          }
       });
        var searchTable = document.getElementById('appsTable');
       // to get the next row isn't correct
       var i = 1;
       while($(searchTable.rows[currentRow+i].cells[0]).text()!==''){
            var oldIndex = $(searchTable.rows[currentRow+i].cells[0]).text();
            console.log(oldIndex);
            $(searchTable.rows[currentRow+i].cells[0]).html(parseInt(oldIndex,10)-1);
            i++;
       }
       /*var oldIndex = $(searchTable.rows[currentRow+1].cells[0]).text();
       var oldIndex2= $(searchTable.rows[currentRow+2].cells[0]).text();
       $(searchTable.rows[currentRow+1].cells[0]).html(parseInt(oldIndex,10)-1);
       $(searchTable.rows[currentRow+2].cells[0]).html(parseInt(oldIndex2,10)-1);*/

       //$(searchTable.rows[0].cells[1]).text()

    },

   // how to distinguish undefined, null, 0, false, NaN and "" empty string
    updateIndex: function(obj){
      var currentRow = obj.next('tr');
      console.log(currentRow );
      console.log(currentRow.find('td:nth-child(1)').text());
      //while(currentRow){
      //   var indexTd = currentRow.find('td:nth-child(1)');
      //   indexTd.html(parseInt(indexTd.text(),10)-1);
      //   console.log(parseInt(indexTd.text(),10));
      //   currentRow = currentRow.next('tr');
      //}
    },

    clearAppContent: function(){
      var actionCell = $(this).parent('td');
      var currentRow = $(this).closest('tr');
      // either can clear the value in text field
      //currentRow.find('td:nth-child(2)').find('.edit-input').val('');
      //currentRow.find('td:nth-child(3)').find('.edit-input').val('');
      currentRow.find('.edit-input').val('');
      $('.displayError').hide();
    },

    addTodo: function(){
       // clear the error message first
       var actionCell = $(this).parent('td');
       var currentRow = $(this).closest('tr');
       var newAppValues = {};
       var i = 0;
       var qualified = true;
       while( i <5){
         newAppValues[i] = currentRow.find('td:nth-child('+ (i+2)+')').find('.edit-input').val() ;
         console.log(newAppValues[i]);
         qualified = qualified && (newAppValues[i] != '');
         i++;
       }
       console.log('The result of input is qualified? ' + qualified);
      if(qualified){
         appLists.push({
            company: newAppValues[0],
            position: newAppValues[1],
            appliedMethod: newAppValues[2],
            appliedTime: newAppValues[3],
            progress: newAppValues[4]
         });
          $('.displayError').hide();
          app.showAppList();
      }else{
         var errorDisplay = $('.error-list');
         errorDisplay.html('');
         var searchTable = document.getElementById('appsTable');
          if(newAppValues[0]===''){
             var message = $(searchTable.rows[0].cells[1]).text()+': Please enter a value';
             errorDisplay.append('<li>'+ message +'</li>');
          }
          if(newAppValues[1]===''){
            var message = $(searchTable.rows[0].cells[2]).text()+': Please enter a value';
            errorDisplay.append('<li>'+ message +'</li>');
          }
          if(newAppValues[2]===''){
            var message = $(searchTable.rows[0].cells[3]).text()+': Please enter a value';
            errorDisplay.append('<li>'+ message +'</li>');
          }
          if(newAppValues[3]===''){
            var message = $(this).closest('table').find('tr:nth-child(1)').find('th:nth-child(5)').text()+': Please enter a value';
            errorDisplay.append('<li>'+ message +'</li>');
          }
          if(newAppValues[4]===''){
            var message = $('#appsTable').find('tr:nth-child(1)').find('th:nth-child(6)').text()+': Please enter a value';
            errorDisplay.append('<li>'+ message +'</li>');
          }

          $('.displayError').show();
      }
    }


  };
  app.showAppList();

  $('table').on('click', '.edit-button', app.editTodo);
  $('table').on('click', '.save-button', app.saveTodo);
  $('table').on('click', '.cancel-button', app.exitEditMode);
  $('table').on('click', '.delete-button', app.deleteTodo);
  $('table').on('click', '.add-button', app.addTodo);
  $('table').on('click', '.clear-button', app.clearAppContent);
});
