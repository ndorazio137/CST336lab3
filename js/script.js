$(document).ready(function() {

    var usernameAvailable = false;
    var validPasswordLength = 6;

    $("#zip").on("change", function() {
        $.ajax({
            method: "GET",
            url: "https://itcdland.csumb.edu/~milara/ajax/cityInfoByZip.php",
            dataType: "json",
            data: { "zip": $("#zip").val()},
            success: function(result, status) {
                $("#city").html(result.city);
                $("#latitude").html(result.latitude);
                $("#longitude").html(result.longitude);
            }
        }); // ajax
    }); // zip

    $(window).on("load", function() {
       $.ajax({
            method: "GET",
            url: "https://cst336.herokuapp.com/projects/api/state_abbrAPI.php",
            dataType:"json",
            data: { "state": $("#state").val() },
            success: function(result, status) {
                
                result.forEach( function(i) {
                    $("#state").append("<option value='" + i.usps + "' >" + i.state + "</option>");
                });
            }
        }); // ajax
    }); // window
    
    $("#state").on("change", function() {
        $.ajax({
            method: "GET",
            url: "https://itcdland.csumb.edu/~milara/ajax/countyList.php",
            dataType:"json",
            data: { "state": $("#state").val() },
            success: function(result, status) {
                
                $("#county").html("<option> Select One </option>");
                result.forEach( function(i) {  
                   $("#county").append("<option>" + i.county + "</option");
                });
            }
        }); // ajax
    }); // state
    
    $("#username").change(function() {
        $.ajax({
            method: "GET",
            url: "https://cst336.herokuapp.com/projects/api/usernamesAPI.php",
            dataType: "json",
            data: { "username": $("#username").val() },
            success: function(result, status) {
                if(result.available) {
                    $("#usernameError").html("Username is available!");
                    $("#usernameError").css("color", "green");
                    usernameAvailable = true;
                }
                else {
                    $("#usernameError").html("Username is unavailable!");
                    $("#usernameError").css("color", "red");
                    usernameAvailable = false;
                }
            }
        });
    }); // username
        
    $("#signUpForm").on("submit", function(event) {
        if (!isFormValid()) {
            event.preventDefault();
        }
    });
    
    function isFormValid() {
        var isValid = true;
        if (!usernameAvailable) {
            isValid = false;
        }
        
        if ($("#username").val().length == 0) {
            isValid = false;
            $("#usernameError").html("Username is required");
        }
        
        if ($("#password").val().length <= validPasswordLength) {
            ($("#passwordError").html("Password must be at least 6 characters"))
            isValid = false;
        }
        
        if ($("#password").val() != $("#passwordAgain").val()) {
            $("#passwordAgainError").html("Passwords don't match");
            isValid = false;
        }
        
        return isValid;
    }
    
}); // end
