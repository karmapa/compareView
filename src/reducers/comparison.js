import text1 from '../../assets/data/LJ001.js';
import text2 from '../../assets/data/DG001.js';
import comparePbList from '../../assets/data/comparePbList.js';

const textName1 = Object.keys(text1);
const textName2 = Object.keys(text2);
const oldPages = Object.keys(text1[textName1]);

const initialState = {
  comparePbList: comparePbList,
  tabKey: 1,
  currentPage1: oldPages[0],
  currentPage2: comparePbList[oldPages[0]][0],
  pageNumber: 0,
  pages: oldPages,
  warnNext: false,
  warnPre: false,
  textName1: textName1,
  text1: text1[textName1][oldPages[0]],
  textName2: textName2,
  text2: text2[textName2][oldPages[0]],
  comparePos: [comparePbList[oldPages[0]][1], comparePbList[oldPages[0]][2]],
  themeStyle: 'themeDefault',
  paneText1: true,
  paneText2: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PAGENEXT':
      if (state.pages.length < (state.pageNumber + 2)) {
        return {
          ...state,
          warnNext: true,
          wrongPageInput: false
        };
      } else {
        let compareText = text1[textName1][state.pages[state.pageNumber + 1]].match(/.+?[་ ]/)[0];
        return {
          ...state,
          warnPre: false,
          wrongPageInput: false,
          pageNumber: state.pageNumber + 1,
          currentPage1: state.pages[state.pageNumber + 1],
          currentPage2: state.comparePbList[state.pages[state.pageNumber + 1]][0],
          comparePos: [state.comparePbList[state.pages[state.pageNumber + 1]][1], state.comparePbList[state.pages[state.pageNumber + 1]][2]],
          text1: text1[textName1][state.pages[state.pageNumber + 1]],
          text2: text2[textName2][state.comparePbList[state.pages[state.pageNumber + 1]][0]],
          pageInput: state.pages[state.pageNumber + 1]
        };
      }
    case 'PAGEPRE':
      if (0 > (state.pageNumber - 1)) {
        return {
          ...state,
          warnPre: true,
          wrongPageInput: false
        };
      } else {
        let compareText = text1[textName1][state.pages[state.pageNumber - 1]].match(/.+?[་ ]/)[0];
        return {
          ...state,
          warnNext: false,
          wrongPageInput: false,
          pageNumber: state.pageNumber - 1,
          currentPage1: state.pages[state.pageNumber - 1],
          currentPage2: state.comparePbList[state.pages[state.pageNumber - 1]][0],
          comparePos: [state.comparePbList[state.pages[state.pageNumber - 1]][1], state.comparePbList[state.pages[state.pageNumber - 1]][2]],
          text1: text1[textName1][state.pages[state.pageNumber - 1]],
          text2: text2[textName2][state.comparePbList[state.pages[state.pageNumber - 1]][0]],
          pageInput: state.pages[state.pageNumber - 1]
        };
      }
    case 'THEMESWITCH':
      return {
        ...state,
        themeStyle: 'theme' + action.style
      };
    case 'TABSWITCH':
      return {
        ...state,
        tabKey: action.key
      };
    default:
      return state;
  }
};

export default reducer;

export function pageNext() {
  return {
    type: 'PAGENEXT'
  };
}

export function pagePre() {
  return {
    type: 'PAGEPRE'
  };
}

export function themeSwitch(style) {
  return {
    type: 'THEMESWITCH',
    style: style
  };
}

export function tabSwitch(key) {
  return {
    type: 'TABSWITCH',
    key: key
  };
}
