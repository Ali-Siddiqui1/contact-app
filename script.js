var apiEndPoint = "http://localhost:5000"

function getUsers(apiEndPoint) {
    $.get(apiEndPoint + '/contacts', function (response) {
        $('#contacts').html("");
        response.forEach(function (res) {
            $('#contacts').append('<div>' + res.first_name + '</div>');
            $('#contacts').append('<button type="button" class="btn btn-primary btn-sm" onclick=deleteUser(' + res.id + ')> Delete </button>');
        });
    });
}

function createUser() {
    firstName = $('#create_first_name').val();
    $.ajax({
        type: "POST",
        url: apiEndPoint + '/contacts',
        data: JSON.stringify({
            'first_name': firstName
        }),
        success: function () {
            $('#createModal').modal('toggle');
            getUsers(apiEndPoint);
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

function deleteUser(id) {
    $.ajax({
        type: "DELETE",
        url: apiEndPoint + '/contacts/' + id,
        success: function() {
            getUsers(apiEndPoint);
        }
    });
}

function showCreateModal() {
    $('#createModal').modal({ show: true });
}
$(document).ready(function () {
    getUsers(apiEndPoint);
    $("#save_user_details").click(createUser);
});