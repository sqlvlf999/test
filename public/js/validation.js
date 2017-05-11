/*


*/


//If all required fields are not null, validate other conditions
  function validation(inputs){
    return validateRequires(inputs);
  }


  //Reset all input fields
  function resetForm(inputs){
    for(var i = 0; i < inputs.length; i++){
      $('input[name="'+ inputs[i].name +'"]').parent().removeClass('has-error');
      $('input[name="'+ inputs[i].name +'"]').val('');
    }
    $('#msg').text('');
  }

  //When modal has been hiddened ,clean all form fields 
  $('#formModal').on('hidden.bs.modal', function(event){
      resetForm($("#modal-form input[type=text]"));
      if($('#selectedProject')){
        $("#selectedProject").find("option").remove();
      }
  });

  function validateRequires(inputs){
    var inValids = [];
    var type =  /^[0-9]*[1-9][0-9]*$/;
    var re = new RegExp(type);

    //fill all invalid fields to array
    var input;
    for(var i=0; i < inputs.length; i++){
      input = $('input[name="'+ inputs[i].name +'"]');
      if(!inputs[i].value){
        inValids.push({target: inputs[i].placeholder, msg:'必须填写'});
        input.parent().addClass('has-error');
      }else{
        //validate inputs whether are numbers
        console.log('validation number');
        if(input[0].dataset.inputtype=='integer'){
          if(input.val().match(re) == null){
            inValids.push({target: inputs[i].placeholder, msg:'不是数值'});
            input.parent().addClass('has-error');
          }
        }
      }
    }
  
    //Set invalid fields styles
    var errorHtml = '';
    for(var i = 0; i < inValids.length; i++){
      errorHtml += inValids[i].target + ' ' + inValids[i].msg + '<br />';
    }
    $('#msg').html(errorHtml);
    //$('#msg').addClass('text-red');

    if(inValids.length > 0)
      return false;
    else
      return true;
  }





