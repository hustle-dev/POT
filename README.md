블로그 회고 링크: https://velog.io/@hustle-dev/%EB%AF%B8%EB%8B%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-POT
> 11월 6일부터 11월 13일까지 약 1주일 시간동안 진행한 미니프로젝트입니다.

## 🏁 프로젝트 시작

앞선 1주일의 미니프로젝트가 끝나고 곧바로 2주짜리 미니프로젝트를 진행하였습니다. 이번 프로젝트에서는 무조건 로그인 기능이 있어야 한다는 조건이 있었고 완성도 있는 프로젝트를 위해 라이브러리를 최대한 사용해보라고 하셔서 그 부분을 고려하여 어떤 것을 만들까 고민을 하였습니다. 

아이디어를 고민하던 중, 최근 넷플릭스에 롤 애니메이션 아케인도 나오고 갈수록 증가하는 롤의 인기와 최근 롤드컵의 인기로 **5:5 게임을 하고 싶어하는 유저들을 위해 팀원들을 모집할 수 있는 플랫폼**을 만들면 어떨까 생각을 하였습니다. 이 기획에 팀원들 모두 동의하여 이 플랫폼을 만들게 되었습니다. 

## 🤘 프로젝트 소개
> POT: 롤 팀 게임을 하고 싶은 유저들이 포지션별 필터링을 통해 팀원들을 모집할 수 있는 플랫폼 입니다.

### 🖼 프로젝트 서비스 아키텍처
![](https://images.velog.io/images/hustle-dev/post/a228cfa1-54a1-4a80-85cd-4243f0099c32/image.png)

프로젝트 서비스 아키텍처는 위와 같습니다. 

- 메인
- 로그인
- 회원가입
- 상세 게시글
- 게시글 작성
- 설정
- 참여자 관리
- 자신이 생성한 팟

이 8가지 페이지를 구현하였고 유저인지 게스트인지에 따라 다른 화면을 보게 됩니다.

백엔드 측에서는 Node.js의 fs모듈을 사용하여 직접 구현하였으며 Auth와 관련한 부분에선 Jwt, Bcrypt, Joi를 Utils 부분에서는 게시글 에디터인 Quill과 Nodemailer를, Server에서는 Node.js express 라우팅을 사용하였습니다.

Riot API로는 Summoner, Champion-masteries API를 사용하였습니다.


### 📌 주요 기능들

#### 무한 스크롤 기능
![](https://images.velog.io/images/hustle-dev/post/86c6013e-402c-4098-abfa-afd50b5e1829/%E1%84%86%E1%85%AE%E1%84%92%E1%85%A1%E1%86%AB%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AF.gif)

메인 페이지에 들어오게 되면 위 gif와 같이 사용자들이 플랫폼에 적어둔 게시글들을 확인할 수 있습니다. 게시글을 POT 생성이라는 버튼을 통해서 작성할 수 있으며, 로그인이 된 유저들만 작성할 수 있고, 로그인이 되지 않은 유저들은 게시글을 확인할 수는 있습니다.


#### 게시글 작성 기능
![boardwrite](https://user-images.githubusercontent.com/53992007/142788033-8d5e93eb-5cce-44bd-af92-ef1bc3cd9ce3.gif)


게시글 작성은 앞서 언급드렸듯이, 로그인 된 유저들만 게시글을 작성할 수 있으며 게시글 작성 후 자신이 작성한 게시글 상세 페이지로 이동하게 됩니다.


#### 참여자 관리와 메일링 기능
![participate](https://user-images.githubusercontent.com/53992007/142788282-1501a8e8-f00e-4f0d-9567-e88cae243289.gif)

참여자 관리 기능은 자신이 작성한 게시물에서 참여자 관리 버튼을 누르게 되면 이동할 수 있는데, 자신의 게시물에 참여신청을 한 유저들의 목록을 확인할 수 있습니다. 유저들의 목록을 보고 같이하고 싶은 유저가 존재한다면 수락 버튼을 눌러서 메일을 보내 수락되었음을 알릴 수 있습니다.

![](https://images.velog.io/images/hustle-dev/post/ea4a3d46-7a55-417f-94ff-aeafe18b4947/%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BC2.gif)



## 🎯 프로젝트에서 맡은 역할

이번 프로젝트에서 저는 로그인, 회원가입, 설정 페이지를 담당하였습니다. 또한 데이터베이스 아키텍처를 어떤 방식으로 설계할지 고민하고 구현하였습니다.

### 회원가입


<p align="center">
  <img src="https://user-images.githubusercontent.com/53992007/142788640-ea90b87c-fc58-4a43-809f-7ffe38b77b23.gif">
</p>

이메일의 경우 존재하는 이메일이 있으면 중복확인 버튼 누를 시 사용중인 이메일이라고 뜨며 소환사명 또한 존재하지 않는 소환사명일 시 제대로된 소환사명을 적으라고 경고 메시지가 나옵니다. 소환사 명의 유무는 riot api를 사용하여 검증하였습니다.

모든 입력칸들의 validate가 true가 되면 회원가입 버튼이 활성화 되면서 회원가입이 진행됩니다.

회원가입 부분에서는 클라이언트 측에서 정규표현식으로 유효성 검사를 한번 해주고, 데이터를 서버로 보낼 때 Joi를 활용하여 유효성 검사를 해주었습니다. 

```js
/**
 * @description Simple check register validation using Joi.
 * @param {object} data - register form data
 * @returns {boolean}
 */
const registerValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$')),
    summoner: Joi.string().min(1).required(),
    imageUrl: Joi.string().min(1).required(),
    encryptedId: Joi.string().min(1).required(),
  });

  return schema.validate(data);
};
```

검사 이후 정보를 저장할 때, password의 경우 암호화를 위해 bcrypt를 사용하여 해싱한뒤 저장하였습니다.

```js
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);
```


### 로그인

<p align="center">
  <img src="https://user-images.githubusercontent.com/53992007/142788800-2c40e82e-053a-4328-bd7c-a3d814ef40d6.gif">
</p>



로그인도 마찬가지로 클라이언트 측에서 입력칸에 대한 유효성 검사를 하여 모든 유효성 값이 true가 되면 로그인 버튼을 활성화 시켜주었습니다.

이후 데이터를 서버로 보내 Joi로 받아온 데이터를 확인하여 옳지 않은 값이라면 로그인 화면에 실패 메시지와 toast를 띄워주었습니다.


```js
/**
 * @description Simpple check login validation using Joi.
 * @param {object} data - login form data
 * @returns {boolean}
 */
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$')),
  });

  return schema.validate(data);
};
```

암호화된 비밀번호 비교의 경우 다음과 같은 bcrypt의 compare메서드를 사용하여 비교해 주었습니다.

```js
const validPass = await bcrypt.compare(password, user.password);
if (!validPass) return res.status(401).send('Invalid password');
```

<p align="center">
  <img src="https://user-images.githubusercontent.com/53992007/142788934-88b05a78-6e84-4b4d-96a4-bad075e6a407.gif">
</p>




로그인의 유효성 검사가 서버측에서도 다 완료되면 jwt 토큰을 만들고 메인 페이지로 이동시켜주었습니다.

```js
  const { userId } = user;
  // Create and assign a token
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
  // 쿠키에 토큰 설정(http://expressjs.com/ko/api.html#res.cookie)
  res.cookie('jwtToken', jwtToken, {
    maxAge: 1000 * 60 * 60 * 24, // 1d
    httpOnly: true,
  });
```
> 보통 jwt를 생성할 때 email을 주로 담는데 다른 곳에서 userId를 사용하는 부분이 있어서 jwt토큰을 복호화해서 userId를 사용하려고 위와 같이 코드를 작성하였습니다. 
쿠키는 자바스크립트로 탈취당할 위험이 존재하기 때문에 XSS공격을 방지하기 위해 httpOnly를 추가하여 이 부분을 방지합니다.


### 설정

<p align="center">
  <img src="https://images.velog.io/images/hustle-dev/post/b1740b0b-b3a5-4acf-a20c-088e7cafe2ef/setting.gif">
</p>



설정 부분에서는 회원가입 부분과 마찬가지로 riot summoner api를 사용하여 유저정보가 존재한다면 이름을 바꿀 수 있게 만들었고, 만약 존재하지 않는 유저의 경우 존재하지 않는다고 뜨면서 완료 버튼을 누를 수 없게 만들었습니다.


### 서버 측

서버 측에서 작업한 내용은 크게 jwt토큰 관련 부분과 데이터베이스 관련 부분이 있습니다.

#### jwt를 이용한 미들웨어

`verifyToken.js`

```js
/**
 * @description Redirect ('/') when jwt token expired.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns {redirect} ('/login')
 */
const blockGuestAuth = (req, res, next) => {
  // Token set using headers or cookies
  const jwtToken = req.headers.authorization || req.cookies.jwtToken;

  try {
    const verified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    req.userId = verified.userId;
    next();
  } catch (e) {
    return res.redirect('/login');
  }
};
```

> jwt토큰을 확인하여 jwt토큰이 존재하지 않는다면(게스트인 경우) 로그인 페이지로 이동시키는 미들웨어를 작성하여 게스트와 유저를 구분하여 할 수 있는 행동을 나누었습니다.


#### 데이터베이스

<p align="center">
  <img src="https://images.velog.io/images/hustle-dev/post/86414136-4bbd-41eb-bf82-668045bc2445/image.png">
</p>

데이터 베이스 구조는 다음과 같이 되어있는데 관계형 데이터베이스처럼 사용하기 위해 fs모듈을 사용하여 user, request, boards로 나누어 관리하였습니다. 

이 중 로그인과 회원가입에 관련된 부분은 users.json과 userQuery.js부분이라 이 부분을 맡아서 작업하였습니다.



## ☠️ 프젝중에 생긴 기술적 어려움

### 1. 로그인 이후 필요한 정보를 어떠한 방식으로 전달해야 할지?
로그인 이후 다른 페이지에서 requests와 boards에 접근하기 위해서는 userId가 필요하였는데 이것을 전달하는 방법이 여러가지 존재하였습니다.

1. 로그인 이후 JWT 생성 후 쿠키에 userId를 담아서 사용할 수 있게 하는 방법

2. JWT를 생성할 때 userId를 payload에 담아서 필요한 곳에서 서버측에서 복호화해서 사용하는 방법

이 문제를 해결하기 위해 **2번 방법을 선택**하였습니다.

이 방법을 선택한 이유는 클라이언트 측에서 보여주지 않고 **서버측에서 정보를 주기 때문에 가장 안전하다고 판단**하였습니다.

1번 방법의 경우 클라이언트 측에서 조작하거나 해킹당하는 확률이 높다고 생각되어 안전하지 않은 방법이라고 생각했습니다.


### 2. 라우팅을 어떠한 방식으로 진행할 지(정적 파일 내려주는 방법 VS PJAX)
페이지를 보여주는데에 있어서 정적파일 html을 sendFile로 주는 방법과 Pjax를 사용하여 SPA방식으로 구현하는 방법이 있었습니다.

처음에는 사용자 경험을 위해 SPA 방식으로 구현해보려고 하였는데 순수 자바스크립트로 SPA를 구현하는 방법이 꽤 까다롭다는 것을 알았고 시간안에 기능을 구현하기엔 부족할 것 같았습니다. 따라서 **정적 파일을 내려주는 방법을 선택**하여 진행하였습니다.



### 3. 데이터 베이스 관련 문제(데이터 구조를 꺼내오기 편리한 방법 vs 관계형 데이터베이스 형태)
모든 user에 requests와 boards배열을 만들어 관리하면 꺼내오기는 편하였지만 데이터의 중복이 너무 많이 발생할 여지가 있었습니다. 따라서 추후 확장성을 고려한다면, **데이터가 늘어나 중복이 기하급수적으로 늘어나기 때문에 관계형 데이터베이스 형태로 구성하는 것이 효율적**이라고 판단하였습니다.



## ☕️ 프로젝트 회고

### 배운점

#### 사전 조사의 중요성

개발을 진행하다 보니 riot api는 초당 20회, 분당 100회의 호출 제한이 있었습니다. 이 부분에 대해서 모르고 개발을 진행하다보니 처음에 고려하지 못해 정상적으로 기능을 구현하지 못한 부분이 있어서 개발을 진행하기 전, 사용할 API의 자세한 명세 확인의 중요성을 알게 되었습니다. 

#### 의사소통의 중요성과 설득하는 방법

데이터 베이스를 어떤 식으로 정할지와 관련하여 서로의 언쟁이 높아지는 등의 트러블이 있었습니다. 이 과정에서 남의 의견을 끝까지 잘 들어주고, 왜 관계형 데이터베이스 쪽으로 가는 것이 추후 확장성을 고려할 수 있는 방법인지 설명해 가면서 남을 설득하는 방법과 결과적으로 공통되고 더 좋은 방향으로 나아갈 수 있게 만드는 의사소통의 중요성을 알게되었습니다. 


#### 새로운 라이브러리의 학습

회원가입과 로그인에 필요한 Jwt, Joi, Bcrypt와 같은 새로운 라이브러리들에 대해서 자세하게 공부할 수 있는 시간이 되었습니다. 또한 라우팅과 관련하여 순수 자바스크립트로 SPA를 구현하는 방법으로 Pjax 방식에 대해서 알게 되었습니다.


**Jwt**: 토큰 기반 인증으로 json객체를 사용하여 웹의 사용자 인증을 위해 사용하는 암호화된 토큰, header, payload, signature로 이루어져 있음(sign, verify등의 메서드 사용법)

**Joi**: 서버측에서 유효성 검사를 쉽게 해주는 도구로 안의 메서드 min, required, email 등을 사용하여 유효성 검사하는 방법

**Bcrypt**: 단방향 암호화 해시 함수로 비밀번호를 데이터베이스에 저장 시에 암호화해서 저장함 기존 해시 함수의 취약점을 개선하여 salting(추가적으로 무작위 데이터를 더해서 해시 값을 계산)을 통해 암호화(genSalt, hash, compare등의 메서드 사용법)

--> rainbow table attack을 방지(해시 함수를 사용하여 변환 가능한 모든 해시 값을 저장시켜 놓은 표)

**Pjax**: HTML5의 PushState와 PopState 이벤트를 사용하여 ajax와 합친 방식으로 서버에 요청을 보내지 않으면서 페이지마다 고유의 url을 가짐(PushState는 IE 10 이상에서만 지원)



### 아쉬운점

온전한 2주가 아닌 짧은 시간동안 기능 구현을 하려다 보니 아쉬운점 또한 많았습니다.

#### 1. 페이지수를 너무 많이 계획했던 것

처음에 계획하였던 페이지 수가 너무 많아 깊고 완성도 있게 구현하지 못한 것이 조금 아쉬웠습니다. 차라리 페이지수를 조금 줄여서 한 페이지에 시간을 기울여 완성도를 높이는 방향으로 진행하였다면 어땠을까 하는 아쉬움이 남습니다.


#### 2. 로그인 상태유지 관련한 버튼 처리

<p align="center">
  <img src="https://images.velog.io/images/hustle-dev/post/b98aa0b4-2c51-4b2f-ac40-1ad0d924e1fb/image.png">
</p>

로그인 부분을 보면 위와 같이 로그인 상태 유지라는 버튼이 있습니다. 개인적으로 이 부분과 관련하여 로그인 상태 유지 버튼을 누르지 않는다면 access Token의 유효기간을 짧게 주고 이후 Refresh Token을 사용하여 다시 재갱신 해주는 방향으로 진행하려고 하였습니다. 그러나 시간이 부족하여 이 부분을 완성하지 못한것이 아쉬웠습니다. 또한 네이버에도 로그인을 할 시에 이러한 버튼이 있는데 어떤식으로 이 부분을 관리하는 지 궁금하였습니다.


#### 3. LightHouse검사 및 최적화 처리

전의 Free Gallery에서 한 것처럼 웹 페이지 사용자 경험 개선을 위해 LightHouse로 검사를 하여 최적화를 하고 싶었지만 못해준것 또한 아쉬운것 같습니다. 다음에는 시간 배분을 넉넉히 하여 최적화 부분에도 신경을 써서 구현을 하면 좋겠다는 생각이 들었습니다.
