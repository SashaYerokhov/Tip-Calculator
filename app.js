const form = document.querySelector("form");
const tipsBill = document.getElementById("tipsBill");
const btnPercents = document.querySelectorAll(".btn");
const tipsPerson = document.getElementById("tipsPerson");
const amountPrice = document.querySelector(".amount-price-sum");
const totalPrice = document.querySelector(".total-price-sum");
const custom = document.getElementById("custom");
const resetBtn = document.querySelector(".reset");
// console.log(resetBtn);

// Переменная для хранения текущего процента
let currentPercent = 0;

form.addEventListener("change", (event) => {
  event.preventDefault();
});

// Функция расчета чаевых
function calculate() {
  const bill = parseFloat(tipsBill.value) || 0;
  // const person = parseFloat(tipsPerson.value) || 0;
  const person = parseFloat(tipsPerson.value);
  // через input - обращаемся к тексту с ошибкой
  // .previousElementSibling: находит ближайший соседний элемент, который стоит прямо перед текущим на том же уровне вложенности.
  const errorText = tipsPerson.previousElementSibling;
  // console.log(errorText);

  // Если количество людей 0 - ошибка
  if (person === 0) {
    tipsPerson.classList.add("invalid");
    errorText.classList.add("invalid");
  } else {
    tipsPerson.classList.remove("invalid");
    errorText.classList.remove("invalid");
  }

  // Используем currentPercent вместо percent из custom
  const percent = currentPercent;

  if (person > 0) {
    var totalTip = (bill * (percent / 100)) / person;
    const total = totalTip + bill / person;

    amountPrice.textContent = totalTip.toFixed(2);
    totalPrice.textContent = total.toFixed(2);
  } else {
    amountPrice.textContent = "0.00";
    totalPrice.textContent = "0.00";
  }
}

// Обработчики для кнопок с процентами
btnPercents.forEach((btnPercent) => {
  btnPercent.addEventListener("click", () => {
    // Получаем процент из текста кнопки (убираем символ %)
    // const percentValue = parseFloat(btnPercent.textContent);
    // Дополнительный совет: Если на кнопках текст с символом "%", например "15%", используйте:
    const percentValue = parseFloat(btnPercent.textContent.replace("%", ""));
    // console.log(percentValue);

    currentPercent = percentValue;

    // Обновляем поле custom (опционально)
    custom.value = percentValue;

    // Вызываем пересчет
    calculate();
  });
});

// Обработчик для поля custom (ручной ввод процента)
custom.addEventListener("input", () => {
  currentPercent = parseFloat(custom.value) || 0;
  calculate();
});

// Основные обработчики
tipsBill.addEventListener("input", calculate);
tipsPerson.addEventListener("input", calculate);

resetBtn.addEventListener("click", () => {
  //   continueBtn.addEventListener("click", () => location.reload());
  location.reload();

  calculate();
});

// Первоначальный расчет (если нужно)
calculate();


/**
Формула рассчета чаевых 

1-я сумма - (Общая сумма * (проценты / 100)) / разделить на количество людей

2-я сумма 1-я сумма добавить + общую сумму / разделить на количество людей


Обработчик событий: Использование addEventListener('input', ...) гарантирует, что вычисления будут выполняться в режиме реального времени по мере ввода данных пользователем в поля.
Проверка: Поскольку нет кнопки для запуска проверки, используйте проверки || 0 или isNaN(), чтобы калькулятор не отображал NaN, если пользователь очистит поле ввода.
Форматирование: Используйте .toFixed(2), чтобы результаты всегда выглядели как валюта (например, $10,50 вместо $10,5).
 * 
 * Событие input в JavaScript срабатывает моментально при любом изменении значения текстового поля (<input type="text">, <textarea>), включая вставку мышью, автозаполнение или диктовку. В отличие от change, оно не ждет потери фокуса, что идеально для валидации «на лету» или подсчета символов. 
Основные характеристики
Моментальное срабатывание: Вызывается сразу после изменения значения.
Сфера применения: Работает для <input> (text, number, password и др.), <textarea> и при contenteditable.
Отличие от change: change срабатывает, когда элемент теряет фокус (после изменения), а input — при каждом нажатии клавиши или вставке.

const input = document.querySelector('input');
input.addEventListener('input', (event) => {
  console.log('Текущее значение:', event.target.value);
});

 */


