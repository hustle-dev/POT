const $detailboardButton = document.querySelector('.detailboard-button');

const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');

const renderMyRequest = isMyRequest => {
  $detailboardButton.innerText = isMyRequest ? '이미 신청한 POT' : '신청하기';
  isMyRequest
    ? $detailboardButton.setAttribute('disabled', 'disabled')
    : $detailboardButton.removeAttribute('disabled');
};

const renderMyBoard = () => {
  $detailboardButton.innerText = '참여자 관리';
  $detailboardButton.classList.add('myBoard');
  $detailboardButton.removeAttribute('disabled');
};

const render = (board, state) => {
  const { type, title, content, position, regDate, summonerName } = board;
  // state
  state.myBoard ? renderMyBoard() : renderMyRequest(state.myRequest);
  document.querySelector('.pot-tag').textContent = type;
  document.querySelector('.pot-title').textContent = title;
  document.querySelector('time').dateTime = regDate;
  document.querySelector('.pot-info-user-summoner-name').textContent = summonerName;
  // eslint-disable-next-line prefer-destructuring
  document.querySelector('time').textContent = regDate.split(' ')[0];

  [...Object.entries(position)].forEach(([positionClass, request]) => {
    request
      ? document.querySelector(`.${positionClass}`).removeAttribute('disabled')
      : document.querySelector(`.${positionClass}`).setAttribute('disabled', 'disabled');
  });

  const qdc = new QuillDeltaToHtmlConverter(content.ops, {});
  const html = qdc.convert();
  document.querySelector('.form__content').innerHTML = html;
};

export { render, renderMyBoard, renderMyRequest };
