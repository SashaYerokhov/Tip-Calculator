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
  // const errorText = tipsPerson.previousElementSibling;
  const errorText = document.querySelector(".error");
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
    const totalTip = (bill * (percent / 100)) / person;
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

    // Активное состояние кнопки (визуальный фидбек)
    btnPercents.forEach((btn) => btn.classList.remove("active"));
    btnPercent.classList.add("active");
  });
});

// // Обработчик для поля custom (ручной ввод процента)
// custom.addEventListener("input", () => {
//   currentPercent = parseFloat(custom.value) || 0;
//   calculate();
// });

// Ручной ввод процента с debounce
let customTimeout;
custom.addEventListener("input", () => {
  clearTimeout(customTimeout);
  customTimeout = setTimeout(() => {
    let value = parseFloat(custom.value);
    if (isNaN(value)) value = 0;
    if (value > 100) value = 100; // Ограничение
    currentPercent = Math.min(value, 100);
    custom.value = currentPercent;
    calculate();
  }, 300);
});

// Основные обработчики с debounce для производительности
let calculateTimeout;
function debouncedCalculate() {
  clearTimeout(calculateTimeout);
  calculateTimeout = setTimeout(calculate, 100);
}

// Основные обработчики
tipsBill.addEventListener("input", calculate);
tipsPerson.addEventListener("input", calculate);

// Сброс без перезагрузки страницы
resetBtn.addEventListener("click", () => {
  tipsBill.value = "";
  tipsPerson.value = "";
  custom.value = "";
  currentPercent = 0;

  // Сброс активного состояния кнопок
  btnPercents.forEach((btn) => btn.classList.remove("active"));

  // Сброс ошибки
  tipsPerson.classList.remove("invalid");
  document.querySelector(".error")?.classList.remove("invalid");

  calculate();
});

// Первоначальный расчет (если нужно)
calculate();
