
var MyForm = {
	validate : function(){
	     var phone_sum_limit = 30;
		 var isValid = true;
		 var res_arr = [];
		 var inv_elem_arr = [];
		 var pattern_1 = /^\+7\(([0-9]{3})\)([0-9]{3})[-. ]([0-9]{2})[-. ]([0-9]{2})$/;
         var pattern_2 = /\d/g ;

		 var phone = document.forms["myForm"]["input_phone"].value;
		 if( !phone.match(pattern_1)){
		     isValid = false;
		     inv_elem_arr.push("input_phone");
         }else{
             var digits = phone.match(pattern_2);
             var sum = 0;
             if( digits != null){
                 for(var i = 0; i < digits.length; i ++){
                     sum = sum + Number(digits[i]);
                 }
                 if(sum > phone_sum_limit){
                     isValid = false;
                     inv_elem_arr.push("input_phone");
                 }
             }
         }



		 res_arr.push(isValid);
		 res_arr.push(inv_elem_arr);
		return res_arr;
	},
	getData  : function(){ },
	setData  : function(Object){ },


    submit   : function(){
	    alert(this.validate())
    }
};
