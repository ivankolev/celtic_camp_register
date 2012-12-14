var CCR;
CCR = {
    initSlider:function () {
        CCR.sudoSlider = $("#slider").cycle({
            timeout:0,
            speed:150,
            fit:1,
            after:CCR.onAfter,
            before:CCR.onBefore
        });
    },
    initNavigation:function () {
        $("#prev").on("click", function () {
            CCR.hideErrors();
            $("#slider").cycle("prev");

        });
        $("#next").on("click", function () {
            CCR.hideErrors();
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
    },
    onAfter:function (curr, next, opts, fwd) {
        if (next.id === "step1" || next.id === "step6" || next.id === "step7") {
            $("#prev").css("visibility", "hidden");
        }
        else {
            $("#prev").css("visibility", "visible");
        }
        if (next.id === "step6" || next.id === "step7") {
            $("#next").css("visibility", "hidden");
        }
        else {
            $("#next").css("visibility", "visible");
        }
    },
    onBefore:function (curr, next, opts, fwd) {
        if(next.id === "step1"){
            CCR.initStep1Events();
        }
        if (next.id === "step2") {
            CCR.initStep2Display();
            CCR.initStep2Select();
            CCR.initStep2Events();
            $("#step2 div").each(function(){
                var $qsc = $("#" + $(this).attr("id") + " input:checkbox:checked");
                CCR.step2RemoveCheckedFromSelect($qsc);
            });
        }
        if (next.id === "step6") {
            CCR.populateStep6();
        }
        if(next.id === "step7") {
            $("#register_instructions").hide();
        }
        else{
            $("#register_instructions").show();
        }
        var $ht = $(this).height();
        $(this).parent().animate({height:$ht, speed:50});
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
//        else if ($("#step1Section3 input:checked").length && ($("#step1group3CoachName").val().length === 0)) {
//            CCR.displayErrors("Please enter Coach's Name");
//            return false;
//        }
        else {
            CCR.hideErrors();
            return true;
        }
    },
    validateStep2:function () {
        var step2TotalAllowedActivities = CCR.step2TotalAllowedActivities();
        if (step2TotalAllowedActivities) {
            var numActivities = $("#step2 input:checked").length;
            if (numActivities === 0 || numActivities !== step2TotalAllowedActivities) {
                CCR.displayErrors("Please choose the designated amount of activities per " +
                    "session plus an alternate activity for each session")
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
        CCR.populateHiddenFields();

    },
    populateHiddenFields: function(){
        //clear all previously generated hidden fields:
        $("input[type='hidden']").remove();
        $(".step6generatedInfo").each(function(i){
            var parentID = $(this).parent().attr("id");
            var textID = "";
            if(parentID === "step6CampSessionConfirm"){
                textID = $(this).parent().attr("id") + "Text" + i;
            }
            else{
                textID = $(this).parent().attr("id") + "Text";
            }
            var payload =  $(this).html().replace(/"|'/g, "`").replace(/Session/g, "<br>Session");
            var encoded_payload = encodeURIComponent(payload);
            $("#register_form").append("<input type='hidden'" +
                " id='"+textID+"' name='"+textID+"' value='"+ encoded_payload +"'/>");

        });
    },
    populateCampSession:function () {
        if($("#step1 input[name=step1group1]:checked").length !== 0){//Summer Camp
            var campSession = $("#step1 input[name=step1group1]:checked").siblings("h2").html();
            var campSessionOrdinal = "";
            $("#step1 input[name=step1group1]:checked").each(function () {
                campSessionOrdinal += "<br/>" + $(this).val().split(" ")[1].replace(/(\d)/g, " $1 ");
            });
            $("#step6CampSessionConfirm")
                .append("<div class='step6generatedInfo'><br/>" + campSession + campSessionOrdinal + "</div>");
        }
        if($("#step1 input[name=step1group2]:checked").length !== 0){//Leadership Camp
            var campSession = $("#step1 input[name=step1group2]:checked").siblings("h2").html();
            var campSessionOrdinal = "";
            $("#step1 input[name=step1group2]:checked").each(function () {
                campSessionOrdinal += "<br/>" + $(this).val().split(" ")[1].replace(/(\d)/g, " $1 ");
            });
            $("#step6CampSessionConfirm")
                .append("<div class='step6generatedInfo'><br/>" + campSession + campSessionOrdinal + "</div>");
        }
        if($("#step1 input[name=step1group3]:checked").length !== 0){//Sports Camp
            var campSession = $("#step1 input[name=step1group3]:checked").siblings("h2").html();
            var campSessionOrdinal = "";
            $("#step1 input[name=step1group3]:checked").each(function () {
                campSessionOrdinal += "<br/>" + $(this).val().split(" ")[1].replace(/(\d)/g, " $1 ");
            });
            $("#step6CampSessionConfirm")
                .append("<div class='step6generatedInfo'><br/>" + campSession + campSessionOrdinal + "</div>");
            var coachName = $("#step1group3CoachName").val();
            if(coachName !== ""){
                $("#step6CampSessionConfirm").append("<br/>Coach's Name: " + $("#step1group3CoachName").val());
            }
        }
        if($("#step1 input[name=step1group4]:checked").length !== 0){//Killarney canoe Camp
            var campSession = $("#step1 input[name=step1group4]:checked").siblings("h2").html();
            var campSessionOrdinal = "";
            $("#step1 input[name=step1group4]:checked").each(function () {
                campSessionOrdinal += "<br/>" + $(this).val().split(" ")[1].replace(/(\d)/g, " $1 ");
            });
            $("#step6CampSessionConfirm")
                .append("<div class='step6generatedInfo'><br/>" + campSession + campSessionOrdinal + "</div>");
        }
    },
    populateBusTransport:function () {
        var busTransport = $("#step1 input[name=step1group5]:checked");
        var formattedOutput = "";
        if (busTransport.length) {
            $("#step6BusTransportationConfirm").prev(".solidBorder").show();
            $("#step6BusTransportationConfirm").show();
            busTransport.each(function () {
                formattedOutput += "<br/>" + $(this).val().split(" ")[1].replace(/from/, "From ")
                    .replace(/to/, "To ")
                    .replace(/(\d)/g, " $1 ");
            });
            $("#step6BusTransportationConfirm").append(formattedOutput);
        } else {
            $("#step6BusTransportationConfirm").prev(".solidBorder").hide();
            $("#step6BusTransportationConfirm").hide();
        }
    },
    populateActivities:function () {
        if (CCR.step2Activities) {
            $("#step6ActivitiesConfirm").prev(".solidBorder").show();
            $("#step6ActivitiesConfirm").show();
            var displayActivities = "";
            $("#step2 div").each(function () {
                if ($(this).css("display") === "block") {
                    var sessionID = "<div class='sessionHeader'>" + $(this).attr("id").replace(/step\d/, "")
                        .replace(/(\d)/, " $1").replace(/session/, "Session") + ":&nbsp;</div>";
                    displayActivities += sessionID;
                    $(this).children("input:checkbox:checked").each(function () {
                        displayActivities += $(this).next().html() + "<br/>";
                    });
                    //strip the last breakline:
                    displayActivities.replace(/<br\/>$/, "");
                    displayActivities += "Alternate:" + $(this).children("select").children("option:selected").html();
                }
            });
            $("#step6ActivitiesConfirm").append("<div class='step6generatedInfo'>" + displayActivities + "</div>");
        }
        else {
            $("#step6ActivitiesConfirm").prev(".solidBorder").hide();
            $("#step6ActivitiesConfirm").hide();
        }
    },
    populateCamperInfo:function () {
        var camperInfo = "";
        camperInfo += $("#step3FirstName").val() + " " + $("#step3LastName").val() + ", " +
            $("input[name='step3group1']:checked").val() + "<br/>";
        camperInfo += "Date of Birth: " + $("#step3DateOfBirth").val() + "<br/>";
        camperInfo += $("#step3Address1").val() + " " + $("#step3Address2").val();
        camperInfo += $("#step3City").val() + ", " + $("#step3Province").val() + "<br/>";
        camperInfo += $("#step3PostalCode").val() + "<br/>";
        camperInfo += "School attended: " + $("#step3SchoolAttended").val() + "<br/>";
        var cabinMateReq = $("#step3CabinMateRequested").val();
        if (cabinMateReq.length) {
            camperInfo += "Cabin Mate Requested: " + cabinMateReq;
        }
        $("#step6CamperInfoConfirm").append("<div class='step6generatedInfo'>" + camperInfo + "</div>");

    },
    populateHealthInfo:function () {
        var healthInfo = "";
        healthInfo += "Family Doctor: " + $("#step4FamilyDoctor").val() + "<br/>";
        healthInfo += "Doctor's phone: " + $("#step4FamilyDoctorTelephone").val() + "<br/>";
        healthInfo += "Health Card No.: " + $("#step4HealthCard\\#").val() + "<br/>";
        healthInfo += "Date of Last Tetanus Shot: " + $("#step4DateOfLastTetanusShot").val() + "<br/>";
        var medicalHistory = $("#step4MedicalHistory").val();
        if(medicalHistory.length){
            healthInfo += "Medical History: " + medicalHistory + "<br/>";
        }
        var AllergiesDisabilities = $("#step4AllergiesPhysicalDisabilities").val();
        if(AllergiesDisabilities.length){
            healthInfo += "Alergies, Physical Disabilities: " + AllergiesDisabilities + "<br/>";
        }
        var medications = $("#step4MedicationsTaken").val();
        if(medications.length){
            healthInfo += "Medications taken: " + medications + "<br/>";
        }
        $("#step6HealthInfoConfirm").append("<div class='step6generatedInfo'>" + healthInfo + "</div>");
    },
    populateParentInfo:function () {
        var parentInfo = "";
        parentInfo += $("#step5FirstName1").val() + " " + $("#step5LastName1").val() + "<br/>";
        var aparentName = $("#step5FirstName2").val();
        if(aparentName.length){
           parentInfo += $("#step5FirstName2").val() + " " + $("#step5LastName2").val() + "<br/>";
        }
        parentInfo += "Home phone 1: " + $("#step5HomeTelephone1").val() + "<br/>";
        var alterPhone1 = $("#step5AlternateTelephone1").val();
        if(alterPhone1.length){
            parentInfo += "Alternate phone 1: " + alterPhone1 + "<br/>";
        }
        var homePhone2 = $("#step5HomeTelephone2").val();
        if(homePhone2.length){
            parentInfo += "Home phone 2: " + homePhone2 + "<br/>";
        }
        var alterPhone2 = $("#step5AlternateTelephone2").val();
        if(alterPhone2.length){
            parentInfo += "Alternate phone 2: " + alterPhone2 + "<br/>";
        }
        parentInfo += "Email 1: " + $("#step5Email1").val() + "<br/>";
        var aemail = $("#step5Email2").val();
        if(aemail.length){
            parentInfo += "Email 2: " + aemail + "<br/>";
        }
        var additionalInfo = $("#step5AdditionalInfo").val();
        if(additionalInfo.length){
            parentInfo += "Additional Info: " + additionalInfo + "<br/>";
        }
        var referer = $("#step5HowDidYouHear").val();
        if(referer.length){
            parentInfo += "How did you hear about camp celtic: " + referer + "<br/>";
        }
        $("#step6ParentInfoConfirm").append("<div class='step6generatedInfo'>" + parentInfo + "</div>");
    },
    displayErrors:function (errorMessage) {
        $("#errors").show();
        $("#errors").html("");
        $("#errors").append(errorMessage);
    },
    hideErrors:function () {
        $("#errors").html("");
        $("#errors").hide();
        //hide also the validation plugin errors:
        $("#errorsList").hide();
    },
    initStep1Events:function () {
        $("input:checkbox[name=step1group1]").change(function () {
            CCR.displayBusSectionGroup1 = false;
            var session5or6checked = 0;

            $("input:checkbox[name=step1group1]").each(function () {
                if ($(this).attr("checked")) {
                    var busEnabledSectionsSelected = $(this).val().match(/session2|session3/)? true:false;
                    CCR.displayBusSectionGroup1 |= busEnabledSectionsSelected;//Beware the bitwise OR assignment here :)
                    CCR.hideErrors();
                    //if session 2 or 3 selected, disable corresponding one in Leadership camp:
                    if($(this).val().match(/session2/)){
                        var a = $("input:checkbox[name=step1group2]");
                        $(a[0]).attr("disabled", "disabled");
                    }
                    if($(this).val().match(/session3/)){
                        var a = $("input:checkbox[name=step1group2]");
                        $(a[1]).attr("disabled", "disabled");
                    }
                    if($(this).val().match(/session5|session6/)){
                        $("input:checkbox[name=step1group4]").attr("disabled", "disabled");
                    }
                }
                else{
                    if($(this).val().match(/session2/)){
                        var a = $("input:checkbox[name=step1group2]");
                        $(a[0]).removeAttr("disabled");
                    }
                    if($(this).val().match(/session3/)){
                        var a = $("input:checkbox[name=step1group2]");
                        $(a[1]).removeAttr("disabled");
                    }
                    if($(this).val().match(/session5/)){
                        session5or6checked++;
                    }
                    if($(this).val().match(/session6/)){
                        session5or6checked++;
                    }
                    CCR.clearStep2Selections($(this).val());
                }
            });
            console.log(session5or6checked);
            if(session5or6checked === 2){
                $("input:checkbox[name=step1group4]").removeAttr("disabled");
            }
            CCR.toggleBusSection();
        });
        $("input:checkbox[name=step1group2]").change(function () {
            CCR.displayBusSectionGroup2 = false;
            $("input:checkbox[name=step1group2]").each(function () {
                if ($(this).attr("checked")) {
                    if($(this).val().match(/session2/)){
                        var a = $("input:checkbox[name=step1group1]");
                        $(a[1]).attr("disabled", "disabled");
                    }
                    if($(this).val().match(/session3/)){
                        var a = $("input:checkbox[name=step1group1]");
                        $(a[2]).attr("disabled", "disabled");
                    }
                    CCR.displayBusSectionGroup2 = true;
                    CCR.hideErrors();
                }
                else {
                    if($(this).val().match(/session2/)){
                        var a = $("input:checkbox[name=step1group1]");
                        $(a[1]).removeAttr("disabled");
                    }
                    if($(this).val().match(/session3/)){
                        var a = $("input:checkbox[name=step1group1]");
                        $(a[2]).removeAttr("disabled");
                    }
                }
            });
            CCR.toggleBusSection();
        });
        $("input:checkbox[name=step1group3]").change(function () {
            CCR.displayBusSectionGroup3 = false;
            var sportcamps = $("input:checkbox[name=step1group3]");
            sportcamps.each(function () {
                if ($(this).attr("checked")) {
                    if($(this).val().match(/volleyball/)){
                        $(sportcamps[0]).attr("disabled", "disabled");
                    }
                    if($(this).val().match(/basketball/)){
                        $(sportcamps[1]).attr("disabled", "disabled");
                    }
                    CCR.displayBusSectionGroup3 = true;
                    CCR.hideErrors();
                }
                else {
                    if($(this).val().match(/volleyball/)){
                        $(sportcamps[0]).removeAttr("disabled");
                    }
                    if($(this).val().match(/basketball/)){
                        $(sportcamps[1]).removeAttr("disabled");
                    }
                }
            });
            CCR.toggleBusSection();
        });
        $("input:checkbox[name=step1group4]").change(function(){
          if($(this).attr("checked")){
            var summercamps = $("input:checkbox[name=step1group1]");
              $(summercamps[4]).attr("disabled", "disabled");
              $(summercamps[5]).attr("disabled", "disabled");
          }
          else{
              var summercamps = $("input:checkbox[name=step1group1]");
              $(summercamps[4]).removeAttr("disabled");
              $(summercamps[5]).removeAttr("disabled");
          }
        });

    },
    toggleBusSection:function(){
        if(CCR.displayBusSectionGroup1 || CCR.displayBusSectionGroup2 || CCR.displayBusSectionGroup3){
            $("#step1Section5").fadeIn(10, function () {
                var $ht = $("#step1").height();
                $("#step1").parent().animate({height:$ht, speed:10});
            });
        }
        else{
            $("#step1Section5").fadeOut(150, function () {
                var $ht = $("#step1").height();
                $("#step1").parent().animate({height:$ht, speed:20});
            });
        }
    },
    initStep2Display:function () {
        $("#step2 div").hide();
        $("#step2notneeded").hide();
        $("input:checkbox[name=step1group1]:checked").each(function () {
            //console.log($(this).attr("value"));
            if ($(this).attr("value") === "group1 session1") {
                $("#step2session1").show();
            }
            else if ($(this).attr("value") === "group1 session2") {
                $("#step2session2").show();
            }
            else if ($(this).attr("value") === "group1 session3") {
                $("#step2session3").show();
            }
            else if ($(this).attr("value") === "group1 session4") {
                $("#step2session4").show();
            }
            else if ($(this).attr("value") === "group1 session5") {
                $("#step2session5").show();
            }
            else if ($(this).attr("value") === "group1 session6") {
                $("#step2session6").show();
            }
        });
        if($("input:checkbox[name=step1group1]:checked").length == 0 ){
            $("#step2notneeded").show();
            CCR.step2Activities = false;
        }
        else {
            CCR.step2Activities = true;
        }
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
            CCR.step2firstRun = CCR.step2TotalAllowedActivities();
            CCR.step2firstRunCounter++;

            var $qsc = $("#" + $(this).parent().attr("id") + " input:checkbox:checked");
            //remove checked from select:
            CCR.step2RemoveCheckedFromSelect($qsc);

            var $qsu = $("#" + $(this).parent().attr("id") + " input[type=checkbox]:not(:checked)");
            //add unchecked to select:
            CCR.step2AddUncheckedToSelect($qsu);

            //Sessions 2 and 3 have limit of 4 + alternate, all others have 3 + alternate
            var activitiesLimit = $(this).attr("value").match(/session2|session3/g)? 3: 2;

            if ($qsc.length > activitiesLimit) {
                $qsu.attr("disabled", "disabled");
                if (CCR.step2firstRun < CCR.step2firstRunCounter) {
                    CCR.validateStep2();
                }
            }
            else if ($qsc.length < activitiesLimit + 1) {
                $qsu.removeAttr("disabled");
                if (CCR.step2firstRun < CCR.step2firstRunCounter) {
                    CCR.validateStep2();
                }
            }
        });
    },
    clearStep2Selections: function(sessionNum){
        if(sessionNum.match(/session1/)){
            $("#step2session1").find("input[type=checkbox]").each(function(){
               $(this).removeAttr("checked");
            });
        }
        else if(sessionNum.match(/session2/)){
            $("#step2session2").find("input[type=checkbox]").each(function(){
                $(this).removeAttr("checked");
            });
        }
        else if(sessionNum.match(/session3/)){
            $("#step2session3").find("input[type=checkbox]").each(function(){
                $(this).removeAttr("checked");
            });
        }
        else if(sessionNum.match(/session4/)){
            $("#step2session4").find("input[type=checkbox]").each(function(){
                $(this).removeAttr("checked");
            });
        }
        else if(sessionNum.match(/session5/)){
            $("#step2session5").find("input[type=checkbox]").each(function(){
                $(this).removeAttr("checked");
            });
        }
        else if(sessionNum.match(/session6/)){
            $("#step2session6").find("input[type=checkbox]").each(function(){
                $(this).removeAttr("checked");
            });
        }

    },
    step2RemoveCheckedFromSelect:function($qsc){
        $qsc.each(function () {
            var $id = $(this).attr("value");
            var $selectoptions = $(this).siblings("select").children();
            $selectoptions.each(function () {
                if ($(this).attr("value") === $id) {
                    $(this).hide();
                    if ($(this).attr("selected")) {
                        //TODO Clean this code smell:
                        CCR.step2SelectAlternate($(this));
                        //$(this).siblings().attr("selected", "selected");
                        $(this).removeAttr("selected");
                    }
                }
            });
            //console.log($id);
        });
    },
    step2SelectAlternate: function (option){
        if(option.next()){
            if(option.next().css("display") !== "none"){
                option.next().attr("selected", "selected");
            }
            else {
                CCR.step2SelectAlternate(option.next());
            }
        }
        else if(option.prev()){
            if(option.prev().css("display") !== "none"){
                option.prev().attr("selected", "selected");
            }
            else {
                CCR.step2SelectAlternate(option.prev());
            }
        }
    },
    step2AddUncheckedToSelect:function($qsu){
        $qsu.each(function () {
            var $id = $(this).attr("value");
            var $selectoptions = $(this).siblings("select").children();
            $selectoptions.each(function () {
                if ($(this).attr("value") === $id) {
                    $(this).show();
                }
            });
            //console.log($id);
        });
    },
    step2TotalAllowedActivities:function () {
        var TotalAllowedActivities = 0;
        $("#step2 div").each(function () {
            if ($(this).css("display") !== "none") {
                if($(this).attr("id") === "step2session2" || $(this).attr("id") === "step2session3"){
                    TotalAllowedActivities+=4;
                }
                else {
                    TotalAllowedActivities +=3;
                }
            }
        });
        return TotalAllowedActivities;
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
                    required:false,
                    phoneUS:true
                },
                step4DateOfLastTetanusShot:{
                    required:false,
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
            },
            submitHandler: function(form) {

                jQuery(form).ajaxSubmit({
                    target: "#register_form_result",
                    success: CCR.showResponse
                });
            }
        });
    },
    initRegexPatterns:function () {
        CCR.regexProvince = new RegExp("AB|ALB|Alta|Alberta|BC|CB|British Columbia|LB|Labrador|MB|Man|Manitoba|" +
            "Nfld|NF|Newfoundland|NWT|Northwest Territories|Nova Scotia|New Brunswick|Nunavut|ON|ONT|" +
            "Ontario|PE|PEI|IPE|Prince Edward Island|QC|PC|QUE|QU|Quebec|SK|Sask|Saskatchewan|YT|Yukon|" +
            "Yukon Territories", "i");
        CCR.regexPostalCode = new RegExp("^(([ABCEGHJKLMNPRSTVXY]|[abceghjklmnprstvxy])\\d([ABCEGHJKLMNPRSTVWXYZ]|" +
            "[abceghjklmnprstvwxyz])(\\s|)\\d([ABCEGHJKLMNPRSTVWXYZ]|[abceghjklmnprstvwxyz])\\d)$");
    },
    gotoStep:function (stepNum) {
        while (stepNum < 6) {
            $("#slider").cycle("prev");
            stepNum++;
        }
    },
    showResponse: function(){
        $("#slider").cycle("next");
    }
};
$(document).ready(function () {
    CCR.initSlider();
    CCR.initNavigation();
    CCR.initRegexPatterns();
    CCR.initValidate();
    //CCR.initStep1Events();
    //CCR.initStep2Events();
});
