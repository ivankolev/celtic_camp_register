var CCR;
CCR = {
    initSlider:function () {
        var sudoSlider = $("#slider").cycle({
            prev:   '#prev',
            next:   '#next',
            timeout: 0,
            speed: 150,
            fit:1,
            after: CCR.onAfter
        });
    },
    onAfter: function (curr, next, opts, fwd) {
      console.log(next.id);
      if(next.id === "step1"){
          $("#prev").css("visibility", "hidden");
      }
      else{
          $("#prev").css("visibility", "visible");
      }
      if(next.id === "step2"){
          CCR.initStep2Display();
          CCR.initStep2Select();
      }
      var $ht = $(this).height();
      $(this).parent().animate({height: $ht,speed: 100});
    },
    initStep1Events: function () {
        $("input:checkbox").change(function(){
            $("input:checkbox").each(function(){
                if($(this).attr("checked")){
                    $("#step1").find("input:radio[name=step1group1]").removeAttr("checked");
                }
            });
        });
        $("input:radio[name=step1group1]").change(function(){
            if($(this).attr("checked")){
                $("#step1").find("input:radio[name=step1group1]").removeAttr("checked");
                $("#step1").find("input:checkbox").removeAttr("checked");
                $(this).attr("checked","checked");
            }
        });
    },
    initStep2Display: function () {
        $("#step2 div").css("display", "none");
        $("input:checkbox:checked").each(function(){
            console.log($(this).attr("value"));
            if($(this).attr("value") == "group1 session1"){
                $("#step2session1").css("display", "block");
            }
            else if($(this).attr("value") == "group1 session2"){
                $("#step2session2").css("display", "block");
            }
            else if($(this).attr("value") == "group1 session3"){
                $("#step2session3").css("display", "block");
            }
            else if($(this).attr("value") == "group1 session4"){
                $("#step2session4").css("display", "block");
            }
            else if($(this).attr("value") == "group1 session5"){
                $("#step2session5").css("display", "block");
            }
            else if($(this).attr("value") == "group1 session6"){
                $("#step2session6").css("display", "block");
            }
        });
    },
    initStep2Select:function(){
        $("#step2 select").remove();

        var $step2div = $("#step2 div");
        $step2div.each(function(){
            var $selectid = $(this).attr("id") + "select";
            var $inputArray = $('input', $(this));
            $(this).append("<select name='"+ $selectid +"' id='"+$selectid+"'></select>");
            $inputArray.each(function(){
              var $inputid = $(this).attr("value");
                var $select = $("select", $(this).parent());
                var $selectname = $inputid.replace(/session\d{1}/, "");
                $select.append("<option value='"+$inputid+"'>"+ $selectname+"</option>");
            });
        });
    },
    initStep2Events: function () {
        $("#step2 input:checkbox").change(function(){
            var $parentid =  $(this).parent().attr("id");
            var queryStringChecked = "#" + $parentid + " input:checkbox:checked";
            var $qsc = $(queryStringChecked);
            //remove checked from select:
            $qsc.each(function(){
                var $id = $(this).attr("value");
                var $selectoptions = $(this).siblings("select").children();
                $selectoptions.each(function(){

                     if($(this).attr("value") == $id){
                         $(this).css("display", "none");
                         if($(this).attr("selected")){
                             $(this).siblings().attr("selected", "selected");
                             $(this).removeAttr("selected");
                         }
                     }
                })  ;
                console.log($id);
            });
            var queryStringUnchecked =  "#" + $parentid + " input[type=checkbox]:not(:checked)";
            var $qsu = $(queryStringUnchecked);
            $qsu.each(function(){
                var $id = $(this).attr("value");
                var $selectoptions = $(this).siblings("select").children();
                $selectoptions.each(function(){
                    if($(this).attr("value") == $id){
                        $(this).css("display", "block");
                    }
                })  ;
                console.log($id);
            });
            if($qsc.length > 2){
                $qsu.attr("disabled", "disabled");
            }
            else if($qsc.length < 3){
                $qsu.removeAttr("disabled");

            }
        });
    },
    initValidate: function(){
        $("#register_form").validate({
            rules: {
            }
        });
    }
};


$(document).ready(function () {
    CCR.initSlider();
    CCR.initValidate();
    CCR.initStep1Events();
    CCR.initStep2Events();
});
