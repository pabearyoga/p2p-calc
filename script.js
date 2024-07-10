document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');
  const formThem = document.getElementById('numberForm');

  if (currentTheme) {
    document.body.classList.add(currentTheme);
    formThem.classList.add(currentTheme);
  }

  toggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    formThem.classList.toggle('form-dark-mode');

    let theme = 'light';
    if (document.body.classList.contains('dark-mode')) {
      theme = 'dark';
    }
    localStorage.setItem('theme', theme);
  });
});

function getMonoApi() {
  fetch('https://api.monobank.ua/bank/currency')
    .then(response => response.json())
    .then(data => {
      // Знаходимо курс UAH/EUR
      const uahEur = data.find(
        currency => currency.currencyCodeA === 978 && currency.currencyCodeB === 980
      );
      if (uahEur) {
        document.getElementById('number2').value = uahEur.rateSell;
      }
    })
    .catch(error => console.error('Error fetching Monobank API:', error));
}

function calculateSum() {
  // Отримуємо значення з полів форми
  const number1 = parseFloat(document.getElementById('number1').value);
  const number2 = parseFloat(document.getElementById('number2').value);
  const commission = parseFloat(document.getElementById('commission').value);
  const number3 = parseFloat(document.getElementById('number3').value);
  const number4 = parseFloat(document.getElementById('number4').value);

  // Виконуємо обчислення
  const monoEUR = number1 / number2;
  const commissionPercent = (monoEUR / 100) * commission;
  const monoEURWISE = monoEUR - Number(commissionPercent.toFixed(2));
  const EURo = !commission ? monoEUR : monoEURWISE;

  const bybitEURUSD = EURo / number3;
  const bybitUAHUSD = bybitEURUSD * number4;
  const sum = bybitUAHUSD - number1;

  // Відображаємо результат
  document.getElementById('mono').innerText = monoEUR.toFixed(2);
  document.getElementById('bybit').innerText = bybitEURUSD.toFixed(2);
  document.getElementById('result-wise').innerText = sum.toFixed(2);
}
