function add_user(){
    user_name = document.getElementById("user_name").value;

    if(user_name == ""){
        document.getElementById("user_name_erro").innerHTML = "Enter Username";
    }else{
        document.getElementById("user_name_erro").innerHTML = "";
        localStorage.setItem("post_user_name", user_name);
        window.location = "post_page.html";
    }
}
