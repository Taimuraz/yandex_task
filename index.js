
var MyForm = {
	validate : function(){
	     var phone_sum_limit = 30;
		 var isValid = true;
		 var res_arr = [];
		 var inv_elem_arr = [];
		 var pattern_1 = /^\+7\(([0-9]{3})\)([0-9]{3})[-. ]([0-9]{2})[-. ]([0-9]{2})$/;
         var pattern_2 = /\d/g ;
         var pattern_3 = /\w+ +\w+ +[a-z]+\g/;
         var email_1 = /^\w+([\.-]?\w+)*@ya.ru/; //\w+([\.-]?\w+)*(\.\w{2,3})+$
         var email_2 = /^\w+([\.-]?\w+)*@yandex.ru/;
         var email_3 = /^\w+([\.-]?\w+)*@yandex.ua/;
         var email_4 = /^\w+([\.-]?\w+)*@yandex.by/;
         var email_5 = /^\w+([\.-]?\w+)*@yandex.kz/;
         var email_6 = /^\w+([\.-]?\w+)*@yandex.com/;

        //=============================================================== PHONE VLIDATION
         var phone = document.forms["myForm"]["input_phone"].value;
		 if( !phone.match(pattern_1)){
		     isValid = false;
		     inv_elem_arr.push("input_phone");
         }else{
             var digits = phone.match(pattern_2);
             var sum = 0;
             if( digits !== null){
                 for(var i = 0; i < digits.length; i ++){
                     sum = sum + Number(digits[i]);
                 }
                 if(sum > phone_sum_limit){
                     isValid = false;
                     inv_elem_arr.push("input_phone");
                 }
             }
         }
         //============================================================== NAME VALIDATION
         var fio = document.forms["myForm"]["input_fio"].value;
         // console.log(fio.match(pattern_3));
		 // if(fio.match(pattern_3)){
         //     console.log("GOOD");
         // }else{
         //     console.log("BAD");
         // }
         //============================================================== EMAIL VALIDATION
         var email = document.forms["myForm"]["input_email"].value;
         console.log(email);
         if(!(email.match(email_1)||email.match(email_2)||email.match(email_3)||email.match(email_4)||email.match(email_5)||email.match(email_6)) ){
             isValid = false;
             inv_elem_arr.push("input_email");
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
