const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const { User } = require("../models");

module.exports = passport => {
  // req.session 객체에 어떤 데이터를 저장할지 선택 함.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 매 요청시 실행
  // 세션에 저장했던 아이드를 받아사용자 정보 조회
  // 조회한 정보를 req.user에저장하여 req.user를 통해 로그인한 사용자의 정보를 가져올 수 있음
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
  kakao(passport);
};
