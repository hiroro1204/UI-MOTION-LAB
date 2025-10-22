import { initializeThemeToggle } from "./component/themeToggle.js";
import { initializeStickyHeader } from "./component/stickyHeader.js";
import { initializeDropdownMenu } from "./component/dropdownmenu.js";
import { initializeAccordion } from "./component/accordion.js";
import { initializeNavMenu } from "./component/navmenu.js";
import { initializeTabMenu } from "./component/tabmenu.js";
import { initializeModal } from "./component/modal.js";
import { switchViewport } from "./utility/switch-viewport.js";

// 画面の幅に応じてビューポートの設定を切り替え
switchViewport();
window.addEventListener("resize", switchViewport);

// 各機能の初期化
initializeStickyHeader();
initializeDropdownMenu();
initializeNavMenu();
initializeThemeToggle();
initializeAccordion();
initializeTabMenu();
initializeModal();
