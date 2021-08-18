var firebaseConfig = {
      apiKey: "AIzaSyDQp5AmDCu6T6RM5XGEIZExEjay6Rql8zU",
      authDomain: "kwitter-20df5.firebaseapp.com",
      databaseURL: "https://kwitter-20df5-default-rtdb.firebaseio.com",
      projectId: "kwitter-20df5",
      storageBucket: "kwitter-20df5.appspot.com",
      messagingSenderId: "46770199928",
      appId: "1:46770199928:web:7ec01cc9fb27515b753c8d",
      measurementId: "G-1FKRK5FE1V"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    post_id = "Post_db"

    user = localStorage.getItem("post_user_name");

    document.getElementById("user_name").innerHTML = "What's Your New message " + user + "!";

    firebase.database().ref("/").child(post_id).update({
        purpose : "Adding Post"
    });

function getData() { firebase.database().ref("/"+post_id).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_post_id = childKey;
         post_data = childData;

         title = post_data["title"];
         message = post_data["message"];
         name = post_data["name"];
         like = post_data["like"];

         title_with_tag = "<div class='post_container'><h2>"+title+"</h2>";
         message_with_tag = "<h4>" + message + "</h4><br>";
         name_with_tag = "<h5 style='float: right'> By- " + name + "</h5><br><hr>";
         like_button = "<button class='btn btn-warning' id="+firebase_post_id+" value="+like+" onclick='update_like(this.id)'>"
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button></div><br>";
         row = title_with_tag + message_with_tag +  name_with_tag + like_button + span_with_tag;
         document.getElementById("output").innerHTML += row;
         document.getElementById("notification_sound").play();
      } });  }); }
getData();

function update_like(postid){
    button_id = postid;
    likes = document.getElementById(button_id).value;
    upadate_likes = Number(likes) + 1;
    firebase.database().ref(post_id).child(postid).update({
        like : upadate_likes
    });
}

function upload(){
    message_input = document.getElementById("message").value;
    title_input = document.getElementById("postTitle").value;

    if(title_input == ""){
        document.getElementById("title_erro").innerHTML = "Enter Title Of Your Post";
        document.getElementById("message_erro").innerHTML = "";
    }
    else if(message_input == ""){
        document.getElementById("message_erro").innerHTML = "Enter Message";
        document.getElementById("title_erro").innerHTML = "";
    }
    else{
        document.getElementById("message_erro").innerHTML = "";
        document.getElementById("title_erro").innerHTML = "";
        firebase.database().ref(post_id).push({
            title : title_input,
            message : message_input,
            name : user,
            like : 0
        });
    }
}

function logout(){
    localStorage.removeItem("post_user_name");

    window.location = "login.html";
}