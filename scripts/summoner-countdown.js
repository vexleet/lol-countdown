function addSummonerSpellsEvent() {
  const summonerSpells = document.querySelectorAll('.summoner-spells .summoner-spell');

  summonerSpells.forEach((summonerSpell) => {
    summonerSpell.addEventListener('click', function (e) {
      const parent = e.target.parentNode
      if (!parent.classList.contains('has-countdown')) {
        parent.classList.add('has-countdown');
        let display = parent.querySelector('.has-countdown .time');

        addCountdown(60 * 10, display)
      } else {
        parent.classList.remove('has-countdown');
      }
    });
  });

  function addCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    const timeInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      if (--timer < 0) {
        // timer = duration;
        clearInterval(timeInterval);
        display.parentNode.classList.remove('has-countdown');
      }

      display.textContent = minutes + ":" + seconds;
    }, 1000);

    const checkForClass = setInterval(function () {
      if (!display.parentNode.classList.contains('has-countdown')) {
        clearInterval(timeInterval);
        clearInterval(checkForClass)
      }
    }, 100)
  }
}