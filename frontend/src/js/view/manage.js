const render = manageData => {
  const participants = manageData.participantList
    .map(
      ({ tier, rank, summoner, mainChamp, position }) => `
    <li class="participant">
    <img src="./images/position/${position}.png" alt="" class="participant__position">
    <div class="participant__main-wrapper">
      <img class="participant-tier" src="./images/emblem/${tier}.png" alt="${tier}">
      <div class="participant__check-wrapper">
        <button class="approve-participant">
          <box-icon name="check" color="#9182f6"></box-icon>
        </button>
        <button class="refuse-participant">
          <box-icon name="x" color="#ff3838"></box-icon>
      </div>
    </div>
    <div class="participant__info">
      <ul class="participant__info-list">
        <li class="participant__info-summoner-name">
          <span class="participant__info-title">소환사 명</span>
          <span class="participant__info-description">${summoner}</span>
        </li>
        <li class="participant__info-summoner-tier">
          <span class="participant__info-title">티어</span>
          <span class="participant__info-description">${tier} ${rank}</span>
        </li>
        <li class="participant__info-summoner-main-champ">
          <span class="participant__info-title">주요챔프</span>
          <ul class="participant__info-summoner-champ-list">
          ${mainChamp
            .map(
              champ => `
            <li class="participant__info-summoner-champ">
              <img src="https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${champ}.png" alt="${champ}">
            </li>
          `
            )
            .join('')}
          </ul>
        </li>
      </ul>
    </div>
    </button>
  </li>
  `
    )
    .join('');
  return participants;
};

export default render;
