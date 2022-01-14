const ipc = require('electron').ipcRenderer;
(() => {
  const championsDiv = document.querySelector('.champions');


  ipc.sendSync('hasLoaded');

  ipc.on('asynReply', (event, args) => {
    const allPlayers = args.allPlayers;
    const activePlayer = args.activePlayer;
    const playerTeam = findPlayerTeam(activePlayer, allPlayers);

    allPlayers.filter((player) => player.team !== playerTeam).forEach((player) => {
      const summonerSpellsKeys = Object.keys(player.summonerSpells);
      let summonerSpells = '';
      const championName = player.championName.split(' ').join('');

      summonerSpellsKeys.forEach((key) => {
        const summonerSpellName = player.summonerSpells[key].displayName;
        summonerSpells +=`
        <div class="summoner-spell" data-spellname="${summonerSpellName}">
            <img src="images/summoner-icons/Summoner${summonerSpellName}.png" alt="Summoner icon">
            <span class="time">${summonerSpellCountdowns[summonerSpellName]}</span>
        </div>`
      })

      championsDiv.insertAdjacentHTML('beforeend', `
         <div class="champion" id="${championName}">
            <img src="images/champion/${championName}.png" alt="${championName} Image"/>
    
            <div class="summoner-spells">
                ${summonerSpells}
            </div>
        </div>
     `)
    })

    addSummonerSpellsEvent()
  });

  function findPlayerTeam(activePlayer, champions) {
    return champions.find((champion) => champion.summonerName === activePlayer.summonerName).team;
  }
})()