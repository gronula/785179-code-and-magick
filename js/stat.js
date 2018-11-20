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

// функция отрисовки облака
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

// функция поиска максимального элемента
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// функция получения случайного числа в диапазоне (min, 1)
function getRandomColor(hue) {
  var s = Math.floor(Math.random() * 100);
  var color = 'hsl(' + hue + ', ' + s + '%, ' + '50%)';
  return color;
}

// функция отрисовки статистики
var renderHistogram = function (ctx, i, textLinesLength, players, times) {
  var maxTime = getMaxElement(times);

  // выводятся результаты в милисекундах
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText(Math.round(times[i - textLinesLength]), CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - textLinesLength), CLOUD_HEIGHT - GAP - (barHeight - TEXT_HEIGHT * (textLinesLength - 1)) * times[i - textLinesLength] / maxTime);

  // выводятся имена игроков
  ctx.fillText(players[i - textLinesLength], CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - textLinesLength), CLOUD_HEIGHT - TEXT_HEIGHT);

  if (players[i - textLinesLength] === 'Вы') {
    // окрашивания столбца с именем 'Вы' в красный цвет
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    // окрашивания остальных столбцов в синий цвет (hue = 240) со случайной насыщенностью
    ctx.fillStyle = getRandomColor(240);
  }

  // отрисовываются столбцы
  ctx.fillRect(CLOUD_X + FONT_GAP + (GAP + BAR_WIDTH) * (i - textLinesLength), CLOUD_HEIGHT - TEXT_HEIGHT * 2, BAR_WIDTH, (TEXT_HEIGHT * (textLinesLength - 1) - barHeight) * times[i - textLinesLength] / maxTime); // 2 - это коэффициент для правильного отступа стобцов
};

// функция отрисовки статистики и текста перед ней
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#ffffff');

  // массив с текстом перед статистикой
  var textLines = [
    'Ура вы победили!',
    'Список результатов:'
  ];

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';

  // проверка на равенство длин массивов players и times
  if (times.length < players.length) {
    // урезание длины массива players до длины массива times
    players.length = times.length;
  } else {
    // урезание длины массива times до длины массива players
    times.length = players.length;
  }

  // цикл для вывода текста и статистики независимо от количества строк в тексте перед статистикой
  for (var i = 0; i < players.length + textLines.length; i++) {
    // условие проверяет количество строк текста перед статистикой и выводит только первые 3 строки
    if (i < textLines.length && i < 3) {
      ctx.fillText(textLines[i], CLOUD_X, CLOUD_Y + TEXT_HEIGHT * (i + 1));
    } else if (i < players.length + textLines.length && i < textLines.length + 4 && i < 7) {
      // условие для проверки количества строк в тексте перед статистикой
      if (textLines.length <= 3) {
        renderHistogram(ctx, i, textLines.length, players, times);
      } else if (i < players.length + 3) {
        renderHistogram(ctx, i, 3, players, times);
      }
    }
  }
};
