var apiEndPoint = "http://localhost:5000"

function getUsers(apiEndPoint) {
    $.get(apiEndPoint + '/todos', function (response) {
        for (res in response) {
            console.log(res);
            $("#attach").append("<p>" + response[res]["task"] + "</p>");
        }
    });
}

(function () {
    getUsers(apiEndPoint);
})();
