function checkY(valY) {
    const maxY = 5;
    const minY = -5;
    return valY !== "" && isFinite(valY) && valY < maxY && valY > minY;

}

function submit() {
    const valY = $("#y_arg").val();
    const valX = $("#x_arg").val();
    const valR = $("#r_arg").val();
    if (checkY(valY)) {
        $.get('php/main.php', {
            'x': valX,
            'y': valY,
            'r': valR
        }).done(function(data) {
            arr = JSON.parse(data);
            if (arr.err_msg == '') {
                row = '<tr>';
                row += '<td><b>' + arr.x + '</b></td>';
                row += '<td><b>' + arr.y + '</b></td>';
                row += '<td><b>' + arr.r + '</b></td>';
                row += '<td><b>' + arr.check + '</b></td>';
                row += '<td><b>' + arr.exec_time + '</b></td>';
                row += '<td><b>' + arr.time + '</b></td>';
                row += '</tr>';
                $('#history-table tr:first').after(row);
            } else {
                alert(err_msg);
            }
        }).fail(function(err) {
            alert(err)
        });
    } else {
        alert('Y должен лежать в интервал (-5;5)')
    }
}

function clear_table() {
    $.get('php/clear.php')
        .fail(function(err) {
            alert('Что-то пошло не так!')
        });


    for (var i = document.getElementById("history-table").rows.length; i > 1; i--) {
        document.getElementById("history-table").deleteRow(i - 1);
    }
}