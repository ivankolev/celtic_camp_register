var CCR;
CCR = {
    initSlider:function () {
        CCR.sudoSlider = $("#slider").cycle({
//            prev:'#prev',
//            next:'#next',
            timeout:0,
            speed:150,
            fit:1,
            after:CCR.onAfter,
            before:CCR.onBefore
        });
    },
    initNavigation:function () {
        $("#prev").on("click", function () {
            $("#slider").cycle("prev");
        });
        $("#next").on("click", function () {
            var currentStep;
            $(".step").each(function () {
                if ($(this).css("display") !== "none") {
                    currentStep = $(this).attr("id")
                }
            });
            var stepIsValid = CCR.validateStep(currentStep);
            if (stepIsValid) {
                $("#slider").cycle("next");
            }
        });

    },
    validateStep:function (step) {
        var result = false;
        if (step === "step1") {
            result = CCR.validateStep1();
        }
        else if (step === "step2") {
            result = CCR.validateStep2();
        }
        else if (step === "step3") {
            result = CCR.validateStep3();
        }
        else if (step === "step4") {
            result = CCR.validateStep4();
        }
        else if (step === "step5") {
            result = CCR.validateStep5();
        }
        return result;
        //return true //TODO delete this
    },
    onAfter:function (curr, next, opts, fwd) {
        console.log("After going to" + next.id);
        if (next.id === "step1" || next.id === "step6") {
            $("#prev").css("visibility", "hidden");
        }
        else {
            $("#prev").css("visibility", "visible");
        }
        if (next.id === "step6") {
            $("#next").css("visibility", "hidden");
        }
        else {
            $("#next").css("visibility", "visible");
        }
        if (next.id === "step2") {
            CCR.initStep2Display();
            CCR.initStep2Select();
        }
        var $ht = $(this).height();
        $(this).parent().animate({height:$ht, speed:50});
    },
    onBefore:function (curr, next, opts, fwd) {
        console.log("Before going to" + next.id);
        if (next.id === "step6") {
            CCR.populateStep6();
        }
    },
    validateStep1:function () {
        var isSessionSelected = $("#step1Section1 input:checked").length +
            $("#step1Section2 input:checked").length +
            $("#step1Section3 input:checked").length +
            $("#step1Section4 input:checked").length;
        if (!isSessionSelected) {
            CCR.displayErrors("Please select at least one session above!");
            return false;
        }
        else if ($("#step1Section3 input:checked").length && ($("#step1group3CoachName").val().length === 0)) {
            CCR.displayErrors("Please enter Coach's Name");
            return false;
        }
        else {
            CCR.hideErrors();
            return true;
        }
    },
    validateStep2:function () {
        var step2Sessions = CCR.step2ActiveSessions();
        if (step2Sessions) {
            var numActivities = $("#step2 input:checked").length;
            if (numActivities === 0 || numActivities !== step2Sessions * 3) {
                CCR.displayErrors("Please choose three activities per session plus an alternate activity for each session")
                return false;
            }
            else {
                CCR.hideErrors();
                return true;
            }
        }
        return true;
    },
    validateStep3:function () {
        if (CCR.v.form()) {
            return true;
        }
        else {
            return false;
        }
    },
    validateStep4:function () {
        if (CCR.v.form()) {
            return true;
        }
        else {
            return false;
        }
    },
    validateStep5:function () {
        if (CCR.v.form()) {
            return true;
        }
        else {
            return false;
        }
    },
    populateStep6:function () {
        //clear all previously generated Info:
        $(".step6generatedInfo").remove();
        CCR.populateCampSession();
        CCR.populateBusTransport();
        CCR.populateActivities();
        CCR.populateCamperInfo();
        CCR.populateHealthInfo();
        CCR.populateParentInfo();

    },
    populateCampSession:function () {
        var campSession = $("#step1 input[name=step1group1]:checked").siblings("h2").html();
        var campSessionOrdinal = "";
        $("#step1 input[name=step1group1]:checked").each(function () {
            campSessionOrdinal += "<br/>" + $(this).val().split(" ")[1].replace(/(\d)/g, " $1 ");
        });
        $("#step6CampSessionConfirm")
            .append("<div class='step6generatedInfo'><br/>" + campSession + campSessionOrdinal+"</div>");
        if (campSessionOrdinal.match(/basketball/) || campSessionOrdinal.match(/volleyball/)) {
            $("#step6CampSessionConfirm").append("<br/>Coach's Name: " + $("#step1group3CoachName").val());
        }
    },
    populateBusTransport:function () {
        var busTransport = $("#step1 input[name=step1group2]:checked");
        var formattedOutput = "";
        if (busTransport.length) {
            $("#step6BusTransportationConfirm").prev(".solidBorder").css("display", "block");
            $("#step6BusTransportationConfirm").css("display", "block");
            busTransport.each(function(){
                    formattedOutput += "<br/>" + $(this).val().split(" ")[1].replace(/from/, "From ")
                        .replace(/to/, "To ")
                        .replace(/(\d)/g, " $1 ");
                });
            $("#step6BusTransportationConfirm").append(formattedOutput);
        }else{
            $("#step6BusTransportationConfirm").prev(".solidBorder").css("display", "none");
            $("#step6BusTransportationConfirm").css("display", "none");
        }
    },
    populateActivities:function () {

    },
    populateCamperInfo:function () {

    },
    populateHealthInfo:function () {

    },
    populateParentInfo:function () {

    },
    displayErrors:function (errorMessage) {
        $("#errors").css("display", "block");
        $("#errors").html("");
        $("#errors").append(errorMessage);
    },
    hideErrors:function () {
        $("#errors").html("");
        $("#errors").css("display", "none");
    },
    initStep1Events:function () {
        $("input:checkbox[name=step1group1]").change(function () {
            $("input:checkbox").each(function () {
                if ($(this).attr("checked")) {
                    $("#step1").find("input:radio[name=step1group1]").removeAttr("checked");
                    $("#step1Section5").fadeOut(250, function () {
                        var $ht = $("#step1").height();
                        $("#step1").parent().animate({height:$ht, speed:50});
                    });
                    CCR.hideErrors();
                }
            });
        });
        $("input:radio[name=step1group1]").change(function () {
            if ($(this).attr("checked")) {
                $("#step1").find("input:radio[name=step1group1]").removeAttr("checked");
                $("#step1").find("input:checkbox[name=step1group1]").removeAttr("checked");
                $(this).attr("checked", "checked");
                CCR.hideErrors();
            }
            if ($(this).val().match(/session2|session3|basketball|volleyball/)) {
                $("#step1Section5").fadeIn(300, function () {
                    var $ht = $("#step1").height();
                    $("#step1").parent().animate({height:$ht, speed:50});
                });
            }
            else {
                $("#step1Section5").fadeOut(250, function () {
                    var $ht = $("#step1").height();
                    $("#step1").parent().animate({height:$ht, speed:50});
                });
            }
        });
    },
    initStep2Display:function () {
        $("#step2 div").css("display", "none");
        $("input:checkbox:checked").each(function () {
            console.log($(this).attr("value"));
            if ($(this).attr("value") === "group1 session1") {
                $("#step2session1").css("display", "block");
            }
            else if ($(this).attr("value") === "group1 session2") {
                $("#step2session2").css("display", "block");
            }
            else if ($(this).attr("value") === "group1 session3") {
                $("#step2session3").css("display", "block");
            }
            else if ($(this).attr("value") === "group1 session4") {
                $("#step2session4").css("display", "block");
            }
            else if ($(this).attr("value") === "group1 session5") {
                $("#step2session5").css("display", "block");
            }
            else if ($(this).attr("value") === "group1 session6") {
                $("#step2session6").css("display", "block");
            }
        });
    },
    initStep2Select:function () {
        $("#step2 select").remove();
        $("#step2 label").remove();
        var $step2div = $("#step2 div");
        $step2div.each(function () {
            var $selectid = $(this).attr("id") + "select";
            var $inputArray = $('input', $(this));
            $(this).append("<label for='" + $selectid + "'>Alternate:</label>" +
                "<select name='" + $selectid + "' id='" + $selectid + "'></select>");
            $inputArray.each(function () {
                var $inputid = $(this).attr("value");
                var $select = $("select", $(this).parent());
                var $selectname = $inputid.replace(/session\d{1}/, "");
                $select.append("<option value='" + $inputid + "'>" + $selectname + "</option>");
            });
        });
    },
    initStep2Events:function () {
        CCR.step2firstRunCounter = 0;
        $("#step2 input:checkbox").change(function () {
            CCR.step2firstRun = CCR.step2ActiveSessions() * 3;
            CCR.step2firstRunCounter++;
            var $parentid = $(this).parent().attr("id");
            var queryStringChecked = "#" + $parentid + " input:checkbox:checked";
            var $qsc = $(queryStringChecked);
            //remove checked from select:
            $qsc.each(function () {
                var $id = $(this).attr("value");
                var $selectoptions = $(this).siblings("select").children();
                $selectoptions.each(function () {

                    if ($(this).attr("value") === $id) {
                        $(this).css("display", "none");
                        if ($(this).attr("selected")) {
                            $(this).siblings().attr("selected", "selected");
                            $(this).removeAttr("selected");
                        }
                    }
                });
                console.log($id);
            });
            var queryStringUnchecked = "#" + $parentid + " input[type=checkbox]:not(:checked)";
            var $qsu = $(queryStringUnchecked);
            $qsu.each(function () {
                var $id = $(this).attr("value");
                var $selectoptions = $(this).siblings("select").children();
                $selectoptions.each(function () {
                    if ($(this).attr("value") === $id) {
                        $(this).css("display", "block");
                    }
                });
                console.log($id);
            });
            if ($qsc.length > 2) {
                $qsu.attr("disabled", "disabled");
                if (CCR.step2firstRun < CCR.step2firstRunCounter) {
                    CCR.validateStep2();
                }
            }
            else if ($qsc.length < 3) {
                $qsu.removeAttr("disabled");
                if (CCR.step2firstRun < CCR.step2firstRunCounter) {
                    CCR.validateStep2();
                }
            }
        });
    },
    step2ActiveSessions:function () {
        var sessionsDisplayed = 0;
        $("#step2 div").each(function () {
            if ($(this).css("display") !== "none") {
                sessionsDisplayed++;
            }
        });
        return sessionsDisplayed;
    },
    initValidate:function () {
        jQuery.validator.setDefaults({
            errorPlacement:function (error, element) {
                error.appendTo("#errorsList");
            },
            errorContainer:"#errorsList",
            errorLabelContainer:"#errorsList",
            wrapper:"li"
        });
        CCR.v = $("#register_form").validate({
            rules:{
                step3group1:{
                    required:true
                },
                step3DateOfBirth:{
                    required:true,
                    dateITA:true
                },
                step3Province:{
                    required:true,
                    pattern:CCR.regexProvince
                },
                step3PostalCode:{
                    required:true,
                    pattern:CCR.regexPostalCode
                },
                step4FamilyDoctorTelephone:{
                    required:true,
                    phoneUS:true
                },
                step4DateOfLastTetanusShot:{
                    required:true,
                    dateITA:true
                },
                step5HomeTelephone1:{
                    required:true,
                    phoneUS:true
                },
                step5Email1:{
                    required:true,
                    email:true
                }
            },
            messages:{
                step3group1:{
                    required:"Please specify: male or female camper"
                },
                step3DateOfBirth:{
                    required:"Date of Birth is required",
                    dateITA:"Date of Birth should be in dd/mm/yyyy format"
                },
                step3Province:{
                    required:"Province is required",
                    pattern:"Please enter a valid province name or abbreviation"
                },
                step3PostalCode:{
                    required:"Postal Code is required",
                    pattern:"Please enter a valid Postal Code"
                },
                step4FamilyDoctorTelephone:{
                    required:"Family Doctor telephone is required",
                    phoneUS:"Please enter a valid phone number"
                },
                step4DateOfLastTetanusShot:{
                    required:"Date of last tetanus shot is required",
                    dateITA:"Please enter the date in dd/mm/yyyy format"
                },
                step5HomeTelephone1:{
                    required:"Home Telephone is required",
                    phoneUS:"Please enter a valid phone number"
                },
                step5Email1:{
                    required:"Email is required",
                    email:"Please enter a valid email address"
                }
            }
        });
    },
    initRegexPatterns:function () {
        CCR.regexProvince = new RegExp("AB|ALB|Alta|Alberta|BC|CB|British Columbia|LB|Labrador|MB|Man|Manitoba|" +
            "N[BLTSU]|Nfld|NF|Newfoundland|NWT|Northwest Territories|Nova Scotia|New Brunswick|Nunavut|ON|ONT|" +
            "Ontario|PE|PEI|IPE|Prince Edward Island|QC|PC|QUE|QU|Quebec|SK|Sask|Saskatchewan|YT|Yukon|" +
            "Yukon Territories");
        CCR.regexPostalCode = new RegExp("^(([ABCEGHJKLMNPRSTVXY]|[abceghjklmnprstvxy])\\d([ABCEGHJKLMNPRSTVWXYZ]|" +
            "[abceghjklmnprstvwxyz])(\\s|)\\d([ABCEGHJKLMNPRSTVWXYZ]|[abceghjklmnprstvwxyz])\\d)$");
    },
    gotoStep:function (stepNum) {
        while (stepNum < 6) {
            $("#slider").cycle("prev");
            stepNum++;
        }
    }
};


$(document).ready(function () {
    CCR.initSlider();
    CCR.initNavigation();
    CCR.initRegexPatterns();
    CCR.initValidate();
    CCR.initStep1Events();
    CCR.initStep2Events();
});
