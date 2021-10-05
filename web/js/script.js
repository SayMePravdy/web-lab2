function checkY(valY) {
    const maxY = 5;
    const minY = -5;
    return valY !== "" && isFinite(valY) && valY < maxY && valY > minY;

}

function clickOnChart(canvas, event) {
    let rect = canvas.getBoundingClientRect()
    let width = canvas.width;
    let height = canvas.height;
    let x = (event.clientX - rect.left - width / 2) / scale;
    let y = (height / 2 - event.clientY + rect.top) / scale;
    let r = $("#r_arg").val();
    let ans = new Answer('', '');
    shoot(x, y, r);
    // console.log(ans);
    drawShoot(event.clientX - rect.left, event.clientY - rect.top, ans.isHit);
}

function changeR() {
    drawAxis();
}


function shoot(valX, valY, valR) {
    let isHit = false;
    if (checkY(valY)) {
        snd = new Audio('sounds/Pivo_sound_last.mp3');
        snd.play();
        $.get('/filter', {
            'x': valX,
            'y': valY,
            'r': valR
        }).done(function (data) {
            arr = JSON.parse(data);
            isHit = arr.check;
            row = '<tr>';
            row += '<td><b>' + arr.x + '</b></td>';
            row += '<td><b>' + arr.y + '</b></td>';
            row += '<td><b>' + arr.r + '</b></td>';
            row += '<td><b>' + arr.check + '</b></td>';
            row += '<td><b>' + arr.exec_time + '</b></td>';
            row += '<td><b>' + arr.time + '</b></td>';
            row += '</tr>';
            $('#history-table tr:first').after(row);
            console.log(isHit);
            // ans = new Answer('', isHit);
            // console.log(ans);
            // return ans;
        }).fail(function (err) {
            alert(err);
            // return new Answer(err, isHit);
        });
    } else {
        return 'Y должен лежать в интервал (-5;5)';
    }
}

function submit() {
    const valY = $("#y_arg").val();
    const valX = $("#x_arg").val();
    const valR = $("#r_arg").val();
    let ans = shoot(valX, valY, valR);
    if (ans !== '') {
        alert(ans[0]);
    }
}

function clear_table() {
    snd = new Audio('sounds/otkryvajut-banku-s-pivom.mp3');
    snd.play();
    $.get('/filter', {
        'clear': true
    }).fail(function (err) {
        alert('Что-то пошло не так!')
    });


    for (var i = document.getElementById("history-table").rows.length; i > 1; i--) {
        document.getElementById("history-table").deleteRow(i - 1);
    }
}

class Answer {
    constructor(errMsg, isHit) {
        this.errMsg = errMsg;
        this.isHit = isHit;
    }
}