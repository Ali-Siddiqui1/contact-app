var apiEndPoint = "http://localhost:5000"

function getUsers(apiEndPoint) {
    $.get(apiEndPoint + '/todos', function (response) {
        console.log("response: ", response);
    });
}

(function() {
    getUsers(apiEndPoint);
})();