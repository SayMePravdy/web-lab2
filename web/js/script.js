function checkY(valY) {
    const maxY = 5;
    const minY = -5;
    return valY !== "" && isFinite(valY) && valY < maxY && valY > minY;
}

function checkX(valX) {
    const maxX = 5;
    const minX = -3;
    return valX <= maxX && valX >= minX;
}

function clickOnChart(canvas, event) {
    let rect = canvas.getBoundingClientRect()
    let width = canvas.width;
    let height = canvas.height;
    let x = (event.clientX - rect.left - width / 2) / scale;
    let y = (height / 2 - event.clientY + rect.top) / scale;
    let r = $("#r_arg").val();
    shoot(x, y, r).then(function (answer) {
        drawShoot(event.clientX - rect.left, event.clientY - rect.top, answer.isHit);
    });

}

function changeR() {
    drawAxis();
}

function getData(valX, valY, valR) {
    return new Promise(function (resolve) {
        $.get('/filter', {
            'x': valX,
            'y': valY,
            'r': valR
        }).done(function (data) {
            arr = JSON.parse(data);
            row = '<tr>';
            row += '<td><b>' + parseFloat(arr.x.toFixed(8)) + '</b></td>';
            row += '<td><b>' + parseFloat(arr.y.toFixed(8)) + '</b></td>';
            row += '<td><b>' + parseFloat(arr.r.toFixed(8)) + '</b></td>';
            row += '<td><b>' + arr.check + '</b></td>';
            row += '<td><b>' + parseFloat(arr.exec_time.toFixed(8)) + '</b></td>';
            row += '<td><b>' + arr.time + '</b></td>';
            row += '</tr>';
            $('#history-table tr:first').after(row);
            resolve(arr.check);
        }).fail(function (err) {
            alert(err);
        });
    });
}

async function shoot(valX, valY, valR) {
    let isHit = 'Нет';
    if (checkY(valY) && checkX(valX)) {
        snd = new Audio('sounds/Pivo_sound_last.mp3');
        snd.play();
        isHit = await getData(valX, valY, valR);
        console.log(isHit + '0');
    } else {
        return new Answer('Y должен лежать в интервале (-5;5)', isHit);
    }
    console.log(isHit + '1');
    return new Answer('', isHit);
}

function submit() {
    const valY = $("#y_arg").val();
    const valX = $("#x_arg").val();
    const valR = $("#r_arg").val();
    shoot(valX, valY, valR).
    then(function (answer) {
        if (answer.errMsg !== '') {
            alert(answer.errMsg);
        } else {
            let coordinates = mapCoordinates(valX, valY);
            drawShoot(coordinates.x, coordinates.y, answer.isHit);
        }
    });

}

function clear_table() {
    snd = new Audio('sounds/otkryvajut-banku-s-pivom.mp3');
    snd.play();
    $.get('/filter', {
        'clear': true
    }).fail(function (err) {
        alert('Что-то пошло не так!')
    });
    drawAxis();
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