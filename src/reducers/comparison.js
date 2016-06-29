import text1 from '../../assets/data/LJ001.js';
import text2 from '../../assets/data/DG001.js';
import comparePbList from '../../assets/data/comparePbList.js';

const textName1 = Object.keys(text1);
const textName2 = Object.keys(text2);
const oldPages = Object.keys(text1[textName1]);

const initialState = {
  comparePbList: comparePbList,
  tabKey: 1,
  pageInput: oldPages[0],
  currentPage1: oldPages[0],
  currentPage2: comparePbList[oldPages[0]][0],
  pageNumber: 0,
  pages: oldPages,
  wrongPageInput: false,
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
        let obj = {};
        let pageInput = 'currentPage' + state.tabKey;
        obj.currentPage1 = state.pages[state.pageNumber + 1];
        obj.currentPage2 = state.comparePbList[state.pages[state.pageNumber + 1]][0];
        return {
          ...state,
          warnPre: false,
          wrongPageInput: false,
          pageNumber: state.pageNumber + 1,
          currentPage1: obj.currentPage1,
          currentPage2: obj.currentPage2,
          comparePos: [state.comparePbList[state.pages[state.pageNumber + 1]][1], state.comparePbList[state.pages[state.pageNumber + 1]][2]],
          text1: text1[textName1][state.pages[state.pageNumber + 1]],
          text2: text2[textName2][state.comparePbList[state.pages[state.pageNumber + 1]][0]],
          pageInput: obj[pageInput]
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
        let obj = {};
        let pageInput = 'currentPage' + state.tabKey;
        obj.currentPage1 = state.pages[state.pageNumber - 1];
        obj.currentPage2 = state.comparePbList[state.pages[state.pageNumber - 1]][0];
        return {
          ...state,
          warnNext: false,
          wrongPageInput: false,
          pageNumber: state.pageNumber - 1,
          currentPage1: obj.currentPage1,
          currentPage2: obj.currentPage2,
          comparePos: [state.comparePbList[state.pages[state.pageNumber - 1]][1], state.comparePbList[state.pages[state.pageNumber - 1]][2]],
          text1: text1[textName1][state.pages[state.pageNumber - 1]],
          text2: text2[textName2][state.comparePbList[state.pages[state.pageNumber - 1]][0]],
          pageInput: obj[pageInput]
        };
      }
    case 'PAGEINPUT':
      return {
        ...state,
        pageInput: action.input,
        wrongPageInput: false
      };
    case 'PAGEKEYPRESS':
      if (('Enter' === action.key) && (state.pages.some(pb => state.pageInput === pb)) && (1 === state.tabKey)) {
        let pageNumber = state.pages.indexOf(state.pageInput);
        return {
          ...state,
          pageNumber: pageNumber,
          text1: text1[textName1][state.pages[pageNumber]],
          text2: text2[textName2][state.comparePbList[state.pages[pageNumber]][0]],
          currentPage1: state.pageInput,
          currentPage2: state.comparePbList[state.pageInput][0],
          comparePos: [comparePbList[state.pageInput][1], comparePbList[state.pageInput][2]],
          wrongPageInput: false
        };
      } else if (('Enter' === action.key) && (1 !== state.tabKey)) {
        for (let key in state.comparePbList) {
          if (state.pageInput === state.comparePbList[key][state.tabKey - 2]) {
            let pageNumber = state.pages.indexOf(key);
            return {
              ...state,
              pageNumber: pageNumber,
              text1: text1[textName1][key],
              text2: text2[textName2][state.pageInput],
              currentPage1: key,
              currentPage2: state.pageInput,
              comparePos: [comparePbList[key][1], comparePbList[key][2]],
              wrongPageInput: false
            };
          }
        }
      } else {
        return {
          ...state,
          pageInput: state.pageInput,
          wrongPageInput: true
        };
      }
      break;
    case 'THEMESWITCH':
      return {
        ...state,
        themeStyle: 'theme' + action.style
      };
    case 'TABSWITCH':
      let currentPage = 'currentPage' + action.key;
      return {
        ...state,
        tabKey: action.key,
        pageInput: state[currentPage]
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

export function pageInput(input) {
  return {
    type: 'PAGEINPUT',
    input: input
  };
}

export function pageKeyPress(key) {
  return {
    type: 'PAGEKEYPRESS',
    key: key
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
