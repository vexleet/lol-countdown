(() => {
  const summonerSpells = document.querySelectorAll('.summoner-spells img');

  summonerSpells.forEach((summonerSpell) => {
    summonerSpell.addEventListener('click', function (e) {
      e.target.classList.add('has-countdown');
      let display = document.querySelector('#time');

      addCountdown(10, display);
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
      }

      display.textContent = minutes + ":" + seconds;
      }, 1000);


  }
})()
