const ipc = require('electron').ipcRenderer;
(() => {
  const body = document.querySelector('body');

  ipc.sendSync('hasLoaded');

  ipc.on('asynReply', (event, args) => {
    const allPlayers = args.allPlayers;

    allPlayers.forEach((player) => {
      const summonerSpellsKeys = Object.keys(player.summonerSpells);
      let summonerSpells = '';
      const championName = player.championName.split(' ').join('');

      summonerSpellsKeys.forEach((key) => {
        summonerSpells +=`
        <div class="summoner-spell">
            <img src="images/summoner-icons/Summoner${player.summonerSpells[key].displayName}.png" alt="Summoner icon">
            <span class="time">05:00</span>
        </div>`
      })

      body.insertAdjacentHTML('beforeend', `
         <div class="champion" id="${championName}">
            <img src="images/champion/${championName}.png" alt="Champion image"/>
    
            <div class="summoner-spells">
                ${summonerSpells}
            </div>
        </div>
     `)
    })

    addSummonerSpellsEvent()
  });
})()