import { ProfileProps } from '@pages/within-people/types';
import eg from '@shared/assets/images/egc.jpeg';
import sdh from '@shared/assets/images/sdh.jpeg';
import mj from '@shared/assets/images/mj.jpeg';
import partyParrot from '@shared/assets/images/partyparrot.gif';
import smartNewbie from '@shared/assets/images/smartnewbie.png';
import easyjoin from '@shared/assets/images/easyjoin.png';
import epson from '@shared/assets/images/epson.png';
import multicampus from '@shared/assets/images/m.png';
import handu from '@shared/assets/images/handu.png';
import coc from '@shared/assets/images/coc.png';
import cm from '@shared/assets/images/cm.png';
import seoul42 from '@shared/assets/images/42.png';
import charmander from '@shared/assets/images/charmander_dancing.gif';
import kirby from '@shared/assets/images/kirbyrun.gif';
import topcit from '@shared/assets/images/topcit.png';
import rd from '@shared/assets/images/rd.png';
import atomic from '@shared/assets/images/atomic.png';

export const peopleConfig: Record<string, ProfileProps> = {
  manjong: {
    announcement: {
      src: mj,
      profile: {
        name: {
          kor: '김만종',
          eng: 'MANJONG KIM',
          styleName: 'kmj',
        },
        description: '네트워크 개발자',
        subDescription: 'Network Developer',
        email: '20227126@edu.hanbat.ac.kr',
        prefixSrc: kirby,
      },
    },
    greet:
      '안녕하세요? 반갑습니다.\n' +
      '컴퓨터공학과 김만종입니다.\n' +
      '감사합니다.',
    tasks: [
      {
        iconSrc: topcit,
        text: 'TOPCIT 상위 15%',
      },
      {
        iconSrc: rd,
        text: '정보처리산업기사',
      },
      {
        iconSrc: atomic,
        text: '원자력관련 기업 SW개발직 1년차',
      },
    ],
  },
  donghyeon: {
    announcement: {
      src: sdh,
      profile: {
        name: {
          kor: '서동현',
          eng: 'DONGHYEON SEO',
          styleName: 'sdh',
        },
        description: 'Java Spring 백엔드 개발자',
        subDescription: 'Spring Developer',
        email: '20227131@edu.hanbat.ac.kr',
        prefixSrc: charmander,
      },
    },
    greet:
      '저는 새로운 것을 배우고 성장하는 과정에서 진정한 즐거움을 찾는 개발자입니다.',
    tasks: [
      {
        iconSrc: seoul42,
        text: '42SEOUL 9기 수료',
      },
      {
        iconSrc: epson,
        text: '2024 EPSON Innovation 본선 진출',
      },
    ],
  },
  eungi: {
    announcement: {
      src: eg,
      profile: {
        name: {
          kor: '최은기',
          eng: 'EUNGI CHOI',
          styleName: 'egc',
        },
        description: '잡부.',
        subDescription: '시키는 건 웬만큼은 할지도..',
        email: '20197123@edu.hanbat.ac.kr',
        prefixSrc: partyParrot,
      },
    },
    greet:
      '멋있는 제품을 개발하는 것보다 멋있는 사람들이랑\n' +
      '제품을 개발하는게 가장 재밌는 사람.\n' +
      '\n' +
      '웹 개발 범주 내에서는 기본은 할 수 있도록\n' +
      '노력 중이에요!',
    tasks: [
      {
        iconSrc: smartNewbie,
        text: '스마트뉴비 FE Developer',
      },
      {
        iconSrc: epson,
        text: '2024 EPSON Innovation 본선 진출',
      },
      {
        iconSrc: easyjoin,
        text: 'MCG SW AWS 서버 인프라 구축 및 관리',
      },
      {
        iconSrc: easyjoin,
        text: '현장계약체결 서비스 Node.js 서버 개발',
      },
      {
        iconSrc: easyjoin,
        text: '현장계약체결 서비스 React 앱 개발',
      },
      {
        iconSrc: multicampus,
        text: '멀티캠퍼스 19기 프로젝트 멘토링',
      },
      {
        iconSrc: handu,
        text: '(주)핸듀 트리디 AI 서비스 풀스택 개발',
      },
      {
        iconSrc: coc,
        text: '사이버작전센터 파이썬 자동화, 웹 체계 개발',
      },
      {
        iconSrc: cm,
        text: '(주)씨엠유니버스 근태관리 앱 FE 개발',
      },
    ],
  },
};
