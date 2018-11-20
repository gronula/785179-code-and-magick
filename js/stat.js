'use strict';

var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака
var CLOUD_X = 120; // координата x для отрисовки текста
var CLOUD_Y = 25; // координата y для отрисовки текста
var GAP = 50; // промежуток между стобцами
var FONT_GAP = 15; // отступ слева для столбцов
var TEXT_HEIGHT = 20; // высота строки текста
var BAR_WIDTH = 40; // ширина столбца
var barHeight = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP; // высота столбца = высота облака - промежуток сверху - высота строки - промежуток снизу

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  // цикл для отрисовки по горизонтали
  for (var i = 0; i <= CLOUD_WIDTH; i += 10) {
    // цикл для отрисовки по вертикали
    for (var j = 0; j <= CLOUD_HEIGHT - 10; j += 10) {
      ctx.moveTo(x + i, y + j);
      ctx.arc(x + i, y + j, 10, 0, Math.PI * 2, false); // отрисовка окружности радиусом 10
    }
  }
  ctx.closePath();
  ctx.fill();
};

var renderHistogram = function (ctx, i, textLinesLength, players, times) {
  // сначала выводятся результаты в милисекундах
  ctx.fillText(Math.round(times[i - textLinesLength]), CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - textLinesLength), CLOUD_Y + TEXT_HEIGHT * (textLinesLength + 1.5));

  // затем отрисовываются столбцы
  ctx.fillRect(CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - textLinesLength), CLOUD_HEIGHT - TEXT_HEIGHT * 2, BAR_WIDTH, TEXT_HEIGHT * (textLinesLength - 1) - barHeight); // 2 - это коэффициент для правильного отступа стобцов

  // в конце выводятся имена игроков
  ctx.fillText(players[i - textLinesLength], CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - textLinesLength), CLOUD_HEIGHT - TEXT_HEIGHT);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#ffffff');

  // массив с текстом перед статистикой
  var textLines = [
    'Ура вы победили!',
    'Список результатов:'
  ];
  // var players = ['1', '2', '3', '4', '5'];
  // var times = ['1', '2', '3', '4', '5'];

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';

  // цикл для вывода текста и статистики независимо от количества строк в тексте перед статистикой
  for (var i = 0; i < players.length + textLines.length; i++) {
    // условие проверяет количество строк текста перед статистикой и выводит только первые 3 строки
    if (i < textLines.length && i < 3) {
      ctx.fillText(textLines[i], CLOUD_X, CLOUD_Y + TEXT_HEIGHT * (i + 1));
    } else if (players.length <= 4) {
      // условие для проверки количества строк в тексте перед статистикой
      if (textLines.length <= 3) {
        renderHistogram(ctx, i, textLines.length, players, times);
        // // отрисовка столбцов результатов с учетом длины массива textLines
        // // сначала выводятся результаты в милисекундах
        // ctx.fillText(Math.round(times[i - textLines.length]), CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - textLines.length), CLOUD_Y + TEXT_HEIGHT * (textLines.length + 1.5));

        // // затем отрисовываются столбцы
        // ctx.fillRect(CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - textLines.length), CLOUD_HEIGHT - TEXT_HEIGHT * 2, BAR_WIDTH, TEXT_HEIGHT * (textLines.length - 1) - barHeight); // 2 - это коэффициент для правильного отступа стобцов

        // // в конце выводятся имена игроков
        // ctx.fillText(players[i - textLines.length], CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - textLines.length), CLOUD_HEIGHT - TEXT_HEIGHT);
      } else if (i < players.length + 3) {
        renderHistogram(ctx, i, 3, players, times);
        // // отрисовка столбцов результатов в случае, если длина массива textLines больше 3
        // // ограничение (i < players.length + 3) нужно, чтобы не выводились несуществующие элементы массивов
        // // сначала выводятся результаты в милисекундах
        // ctx.fillText(Math.round(times[i - 3]), CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - 3), CLOUD_Y + TEXT_HEIGHT * 4.5); // 4.5 - это коэффициент для правильного позиционирования верхней границы текста

        // // затем отрисовываются столбцы
        // ctx.fillRect(CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - 3), CLOUD_HEIGHT - TEXT_HEIGHT * 2, BAR_WIDTH, TEXT_HEIGHT * 2 - barHeight); // 2 - это коэффициент для правильного отступа стобцов

        // // в конце выводятся имена игроков
        // ctx.fillText(players[i - 3], CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - 3), CLOUD_HEIGHT - TEXT_HEIGHT);
      }
    } else {
      this.alert('!!!');
    }
  }
};
