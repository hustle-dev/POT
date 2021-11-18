const $detailboardButton = document.querySelector('.detailboard-button');

const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');

// TypeScript / ES6:
// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

const renderMyRequest = isMyRequest => {
  $detailboardButton.innerText = isMyRequest ? '이미 신청한 POT' : '신청하기';
  isMyRequest
    ? $detailboardButton.setAttribute('disabled', 'disabled')
    : $detailboardButton.removeAttribute('disabled');
};

const render = (board, isMyRequest = false) => {
  const { userId, type, title, content, position, regDate } = board;

  // TODO: 로그인 아이디 라우터에서 auth 로 확인 후 작성자인지 bool값 받기
  // const myBoard = true || false; 와 같이 받을 예정
  const loginUserId = 3;
  const myBoard = +userId === +loginUserId;
  if (myBoard) {
    $detailboardButton.innerText = '참여자 관리';
    $detailboardButton.classList.add('myBoard');
    $detailboardButton.removeAttribute('disabled');
  } else {
    renderMyRequest(isMyRequest);
  }

  document.querySelector('.pot-tag').textContent = type;
  document.querySelector('.pot-title').textContent = title;
  document.querySelector('time').dateTime = regDate;
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

export { render, renderMyRequest };
