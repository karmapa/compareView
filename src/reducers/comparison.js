import text1 from '../../assets/data/LJ001.js';
import text2 from '../../assets/data/DG001.js';

const textName1 = Object.keys(text1)[1];
const textName2 = Object.keys(text2)[1];
const oldPages = Object.keys(text1[textName1]);

const initialState = {
  tabKey: 1,
  currentPage: oldPages[0],
  pageNumber: 0,
  pages: oldPages,
  warnNext: false,
  warnPre: false,
  textName1: textName1,
  text1: text1[textName1][oldPages[0]],
  textName2: textName2,
  text2: text2[textName2][oldPages[0]],
  pageInput: oldPages[0],
  wrongPageInput: false,
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
        return {
          ...state,
          warnPre: false,
          wrongPageInput: false,
          pageNumber: state.pageNumber + 1,
          currentPage: state.pages[state.pageNumber + 1],
          text1: text1[textName1][state.pages[state.pageNumber + 1]],
          text2: text2[textName2][state.pages[state.pageNumber + 1]],
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
        return {
          ...state,
          warnNext: false,
          wrongPageInput: false,
          pageNumber: state.pageNumber - 1,
          currentPage: state.pages[state.pageNumber - 1],
          text1: text1[textName1][state.pages[state.pageNumber - 1]],
          text2: text2[textName2][state.pages[state.pageNumber - 1]],
          pageInput: state.pages[state.pageNumber - 1]
        };
      }
    case 'PAGEINPUT':
      return {
        ...state,
        pageInput: action.input,
        wrongPageInput: false
      };
    case 'PAGEKEYPRESS':
      if (('Enter' === action.key) && (state.pages.some(pb => state.pageInput === pb))) {
        return {
          ...state,
          pageNumber: state.pages.indexOf(state.pageInput),
          text1: text1[textName1][state.pageInput],
          text2: text2[textName2][state.pageInput],
          currentPage: state.pageInput,
          pageInput: state.pageInput,
          wrongPageInput: false
        };
      } else {
        return {
          ...state,
          pageInput: state.pageInput,
          wrongPageInput: true
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

