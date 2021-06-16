const $accordion = document.querySelector('.accordion');

const getSubmenuHeight = $submenu => {
  const [$item, ...items] = [...$submenu.children];
  return $item.offsetHeight * (items.length + 1) - 1;
};

const initAccordion = () => {
  const $activeSubmenu = $accordion.querySelector(
    '.menu-container.active > .submenu'
  );

  $activeSubmenu.style.height = getSubmenuHeight($activeSubmenu) + 'px';
  $accordion.addEventListener('transitionend', function appearAccordion() {
    $accordion.style.opacity = 1;
    $accordion.removeEventListener('transitionend', appearAccordion);
  });
};

const openSubmenu = $menuContainer => {
  const $willOpenSubmenu = $menuContainer.querySelector('.submenu');
  [...$accordion.children].forEach($menu => {
    $menu.classList.toggle('active', $menu === $menuContainer);
    $menu.querySelector('.submenu').style.height =
      $menu === $menuContainer
        ? `${getSubmenuHeight($willOpenSubmenu)}px`
        : '0';
  });
};

const closeSubmenu = $menuContainer => {
  const $willCloseSubmenu = $menuContainer.querySelector('.submenu');
  $menuContainer.classList.remove('active');
  $willCloseSubmenu.style.height = '0';
};

const toggleSubmenu = $menuContainer => {
  $menuContainer.classList.contains('active')
    ? closeSubmenu($menuContainer)
    : openSubmenu($menuContainer);
};

$accordion.addEventListener('click', e => {
  if (e.target.matches('.submenu, .submenu *')) return;
  const $menuContainer = e.target.closest('.menu-container');

  toggleSubmenu($menuContainer);
});

document.addEventListener('DOMContentLoaded', initAccordion);
