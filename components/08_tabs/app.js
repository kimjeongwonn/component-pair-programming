const TAB_WIDTH = 200;

const fetchTabsData = () =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
          },
          {
            id: 2,
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`
          },
          {
            id: 3,
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          }
        ]),
      1000
    );
  });

let tabStatus = [];
let currentTabId = 1;

const $tabs = document.querySelector('.tabs');
const $loadingSpinner = document.querySelector('.spinner');

const createNavElement = () => {
  const $nav = document.createElement('nav');

  tabStatus.forEach(({ id, title }) => {
    const $input = document.createElement('input');
    $input.defaultChecked = id === currentTabId;
    $input.type = 'radio';
    $input.name = 'tab';
    $input.id = id + '';

    const $label = document.createElement('label');
    $label.classList.add('tab');
    $label.htmlFor = id + '';
    $label.textContent = title;

    $nav.append($input, $label);
  });

  const $glider = document.createElement('span');
  $glider.classList.add('glider');
  $nav.append($glider);
  return $nav;
};

const createTabElement = () => {
  const $fragment = document.createDocumentFragment();

  tabStatus.forEach(({ id, content }) => {
    const $tab = document.createElement('div');

    $tab.classList.add('tab-content');
    $tab.classList.toggle('active', id === currentTabId);
    $tab.textContent = content;
    $fragment.append($tab);
  });

  return $fragment;
};

const setTabStatus = _tabStatus => {
  tabStatus = _tabStatus;
  $tabs.style.setProperty('--tabs-length', tabStatus.length);
  $tabs.style.setProperty('--tab-width', TAB_WIDTH);
};

const getTabOrder = () => tabStatus.findIndex(({ id }) => currentTabId === id);

const changeTab = () => {
  const $glider = document.querySelector('.glider');
  $glider.style.transform = `translate3d(${TAB_WIDTH * getTabOrder()}px, 0, 0)`;

  [...document.querySelectorAll('.tab-content')].forEach((tab, idx) => {
    tab.classList.toggle('active', getTabOrder() === idx);
  });
};

const setCurrentTabId = _currentTabId => {
  currentTabId = _currentTabId;
  changeTab();
};

const initTabs = () => {
  $loadingSpinner.remove();

  const $nav = createNavElement();
  $nav.addEventListener('click', e => {
    setCurrentTabId(+e.target.id);
  });

  $tabs.append($nav, createTabElement());
};

document.addEventListener('DOMContentLoaded', () => {
  fetchTabsData().then(res => {
    setTabStatus(res.sort((tab1, tab2) => tab1.id - tab2.id));
    initTabs();
  });
});
