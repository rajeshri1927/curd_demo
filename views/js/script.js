//showing data to modal for edit record
      $(document).ready(function(){
        $('#mytable').on('click','.edit',function(){
          var product_id    = $(this).data('id');
          var product_name  = $(this).data('product_name');
          var product_price = $(this).data('product_price');
          var product_email = $(this).data('product_email');
          var product_image = $(this).data('product-image');
          //alert(product_image);
          $('#EditModal').modal('show');
          $('.product_name').val(product_name);
          $('.price').val(product_price);
          $('.product_email').val(product_email);
          // $('.product_image').val(product_image);
          // $('#profile-img-tag').src = "./upload/" + product_image;
          document.getElementById("profile-img-tag").src = "./upload/" + product_image;
          console.log("'./upload/" + product_image + "'");
          //html('<img src="./upload/'+ product_image+ '" alt="test" height="100" width="150">');
          $('.product_id').val(product_id);
        });

//showing data to modal for delete record
          $('#mytable').on('click','.delete',function(){
            var product_id = $(this).data('id');
            $('#DeleteModal').modal('show');
            $('.product_id2').val(product_id);
        });
        });
//showing data to modal for Image/File Upload record
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                   document.getElementById("profile-img-tag").src = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
       $(".product_image").change(function(){
        //alert('test');
        readURL(this);
        });
       function readURL2(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                   document.getElementById("profile-img-tag1").src = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
       $(".add_image").change(function(){
        //alert('test');
        readURL2(this);
        });
/*Validation number*/
$(document).ready(function () {
  //called when key is pressed in textbox
  $(".price").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("Digits Only").show().fadeOut("slow");
        return false;

    }
   });
   $(".product_name").keypress(function (event) {
     //if the letter is not digit then display error and don't type anything
   if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 8)
   return true;
   else
   {
      // alert("Please enter only char");
       $("#errortext").html("Please enter only char").show().fadeOut("slow");
       return false;
   }
   });
});
/*Validation text*/
function validateEmail(emailField){
var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

if (reg.test(emailField.value) == false) 
{
$("#erroremail").html("Please Enter Valid Email").show().fadeOut("slow");
return false;
}

return true;

}