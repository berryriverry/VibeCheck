// const loginFormHandler = async (event) => {
//     event.preventDefault();
  
//     const email = document.querySelector('#email-login').value.trim();
//     const password = document.querySelector('#password-login').value.trim();
  
//     if (email && password) {
//       const response = await fetch('/api/users/login', {
//         method: 'POST',
//         body: JSON.stringify({ email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/');
//       } else {
//         alert('Failed to log in');
//       }
//     }
//   };
  
//   document
//     .querySelector('.login-form')
//     .addEventListener('submit', loginFormHandler);





var Login = function() {
  this.client_id = process.env.CLIENT_ID;
  this.access_token = process.env.CLIENT_SECRET;
  this.redirect = 'http://localhost:8888/callback';
}

Login.prototype.getAccessToken = function() {
  return localStorage.getItem('access_token') || '';
}

Login.prototype.setAccessToken = function(access_token) {
  localStorage.setItem('access_token', access_token);
}

Login.prototype.getUsername = function() {
  return localStorage.getItem('username') || '';
}

Login.prototype.setUsername = function(username) {
  localStorage.setItem('username', username);
}

Login.prototype.setClientId = function(client_id) {
  this.client_id = client_id;
}

Login.prototype.getClientId = function() {
  return this.client_id;
}

Login.prototype.setRedirect = function(redirect) {
  this.redirect = redirect;
}

Login.prototype.getRedirect = function() {
  return this.redirect;
}

Login.prototype.getLoginURL = function(scopes, state) {
  return 'https://accounts.spotify.com/authorize?client_id=' + this.client_id
    + '&redirect_uri=' + encodeURIComponent(this.redirect)
    + '&scope=' + encodeURIComponent(scopes.join(' '))
    + '&response_type=token';
}

Login.prototype.openLogin = function(oldstate) {
  var url = this.getLoginURL(['playlist-read-private','user-read-private'], oldstate);
  location = url;

}

Login.prototype.getAuthHeader = function() {
  return 'Bearer ' + this.getAccessToken();
}

Login.prototype.getUserInfo = function(callback) {
  var url = 'https://api.spotify.com/v1/me';
  $.ajax(url, {
    dataType: 'json',
    headers: {
      'Authorization': this.getAuthHeader()
    },
    success: function(r) {
      console.log('userinfo', r);
      callback(r);
    }
  });
}