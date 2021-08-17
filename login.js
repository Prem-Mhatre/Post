function add_user(){
    user_name = document.getElementById("user_name").value;

    localStorage.setItem("post_user_name", user_name);

    window.location = "post_page.html";
}
