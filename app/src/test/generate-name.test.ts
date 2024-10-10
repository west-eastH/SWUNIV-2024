import { generateRandomNickname } from "@features/nickname";

describe('랜덤 닉네임 테스트', () => {

  it('닉네임을 100회 발급한다.', () => {
    for (let i = 0; i < 100; i++) {
      const nickname = generateRandomNickname();
      console.log(`[Test Case ${i + 1}]: ${nickname}`);
    }
  });

});
