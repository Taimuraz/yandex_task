
var MyForm = {
    sleep :   function (milliseconds) {
              var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds){
                        break;
                    }
                }
    },
	validate : function(){
	     var phone_sum_limit = 30;
		 var isValid = true;
		 var res_arr = [];
		 var inv_elem_arr = [];
		 var pattern_1 = /^\+7\(([0-9]{3})\)([0-9]{3})[-. ]([0-9]{2})[-. ]([0-9]{2})$/;
         var pattern_2 = /\d/g ;
         var fio_pattern = / +/;///\w+ +\w+ +[a-z]+\g/;
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
         var fio_arr = fio.split(fio_pattern)
		 if(fio_arr.length !== 3 ){
             isValid = false;
             inv_elem_arr.push("input_fio");
         }else{
             for(var i = 0; i < fio_arr.length; i ++){
                 if( fio_arr[i].match(/[*/,.!?;:()\d]/)){
                     isValid = false;
                     inv_elem_arr.push("input_fio");
                 }
             }
         }

         //============================================================== EMAIL VALIDATION
         var email = document.forms["myForm"]["input_email"].value;
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


    submit   : function(event){
	    var val_arr = this.validate();
        var isValid = val_arr[0];
	    var invalid_inputs = val_arr[1];
	    var btn = document.getElementById("submit_button");
	    var div = document.getElementById("resultContainer");
        document.getElementById("input_fio").setAttribute("class","");
        document.getElementById("input_phone").setAttribute("class","");
        document.getElementById("input_email").setAttribute("class","");
        btn.disabled = false;
	    div.setAttribute("class","");
        if(isValid === false ){
            for(var i = 0; i < invalid_inputs.length; i ++){
                document.getElementById(invalid_inputs[i]).setAttribute("class","error");
            }
        }else{
            btn.disabled = true;
            var xhr = new XMLHttpRequest();
            var adress = document.getElementById("myForm").getAttribute("action");

            while(true) {
                xhr.open('GET', adress, false);
                xhr.send();
                var json = JSON.parse(xhr.response);
                var status = json["status"];
                if (status === "error") {
                    div.setAttribute("class", "error")
                    div.innerHTML = json["reason"];
                    document.getElementById("submit_button").setAttribute("disabled","false");
                    break;
                }
                if (status === "success") {
                    div.setAttribute("class","success");
                    div.innerHTML = "Success";
                    break;
                }
                if(status === "progress"){
                    var timeout = json["timeout"]
                    div.setAttribute("class","progress");
                    div.innerHTML = "Progress";
                    div.innerHTML = "Progress";
                    this.sleep(timeout);
                }

            }
            btn.disabled = false;
	    }

        event.preventDefault();
    }
};
