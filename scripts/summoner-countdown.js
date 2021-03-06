const summonerSpellCountdowns = {
  Teleport: 360,
  Flash: 300,
  Heal: 240,
  Clarity: 240,
  Cleanse: 210,
  Exhaust: 210,
  Ghost: 210,
  Ignite: 180,
  Barrier: 180,
  Smite: 90,
}

function addSummonerSpellsEvent() {
  const summonerSpells = document.querySelectorAll('.summoner-spells .summoner-spell');

  summonerSpells.forEach((summonerSpell) => {
    summonerSpell.addEventListener('click', function (e) {
      const parent = e.target.parentNode;
      const summonerSpell = parent.dataset.spellname;

      if (!parent.classList.contains('has-countdown')) {
        parent.classList.add('has-countdown');
        let display = parent.querySelector('.has-countdown .time');

        addCountdown(summonerSpellCountdowns[summonerSpell], display)
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