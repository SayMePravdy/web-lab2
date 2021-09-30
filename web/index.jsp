<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Лаба 1</title>
    <link rel="stylesheet" href="styles/style.css">
</head>

<body>
<div class="header">
    <b>
        <span id="left-header">Соснило Михаил Александрович P3213 </span>
        <span id="right-header">Вариант: 13210 </span>
    </b>
</div>

<div id="box">
    <div class="arg">
        <img src='img/task.png'>
    </div>
    <div class="arg">
            <span>
					<label for='x_arg'><b>Введите X:</b></label>
					<br>
                	<select id='x_arg'>
						<option name="x" value="-3">-3</option>
						<option name="x" value="-2">-2</option>
						<option name="x" value="-1">-1</option>
						<option name="x" value="0">0</option>
						<option name="x" value="1">1</option>
						<option name="x" value="2">2</option>
						<option name="x" value="3">3</option>
						<option name="x" value="4">4</option>
						<option name="x" value="5">5</option>
					</select>
				</span>
    </div>
    <div class="arg">
            <span>
					<label for="y_arg"><b>Введите Y:<br></b></label>
					<textarea id="y_arg" name="Y" placeholder="Введите число ∈ (-5;5)" maxlength="10"></textarea>
				</span>
    </div>
    <div class="arg">
            <span>
					<label for='r_arg'><b>Введите R:</b></label>
					<br>
					<select id='r_arg'>
						<option name="r" value="1">1</option>
						<option name="r" value="2">2</option>
						<option name="r" value="3">3</option>
						<option name="r" value="4">4</option>
						<option name="r" value="5">5</option>
					</select>
				</span>
    </div>
</div>

<div class="submitter">
    <button id="submit_button" type="submit" onclick="submit()" formmethod="get" formaction="index.html">Отправить
    </button>
</div>

<div>
    <table id="history-table">
        <tr>
            <td>
                <b>X</b>
            </td>

            <td>
                <b>Y</b>
            </td>

            <td>
                <b>R</b>
            </td>

            <td>
                <b>Попадание</b>
            </td>

            <td>
                <b>Время исполнения</b>
            </td>

            <td>
                <b>Текущее время</b>
            </td>
        </tr>
    </table>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="js/script.js"></script>
</body>

</html>