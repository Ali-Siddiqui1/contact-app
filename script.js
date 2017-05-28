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
    // get values of first name and last name
    firstName = $('#create_first_name').val();
    // http post to create user
    $.ajax({
        type: "POST",
        url: apiEndPoint + '/contacts',
        data: JSON.stringify({
            'first_name': firstName
        }
        ),
        success: function () {
            $('#createModal').modal('toggle');
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

function updateUser() {
    $.ajax({
        type: "PUT",
        url: apiEndPoint + '/contacts/' + 1,
        data: JSON.stringify({
            'first_name': 'changed'
        }
        ),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}

function deleteUser(id) {
    $.ajax({
        type: "DELETE",
        url: apiEndPoint + '/contacts/' + id,
    });
}

function showCreateModal() {
    $('#createModal').modal({ show: true });
}
$(document).ready(function () {
    getUsers(apiEndPoint);
    $("#save_user_details").click(createUser);
    $("#update_user_details").click(updateUser);
});