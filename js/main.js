import { initializeThemeToggle } from "./component/themeToggle.js";
import { initializeStickyHeader } from "./component/stickyHeader.js";
import { initializeDropdownMenu } from "./component/dropdownmenu.js";
import { initializeAccordion } from "./component/accordion.js";
import { initializeNavMenu } from "./component/navmenu.js";
import { initializeTabMenu } from "./component/tabmenu.js";
import { initializeModal } from "./component/modal.js";
import { initializeThumbnailSlider } from "./component/thumbnail-slider.js";
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

// Splideが読み込まれるまで待ってから初期化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    // Splideライブラリの読み込み完了を待つ
    if (typeof window.Splide !== "undefined") {
      initializeThumbnailSlider();
    } else {
      window.addEventListener("load", initializeThumbnailSlider);
    }
  });
} else {
  // DOMContentLoadedが既に発火済みの場合
  if (typeof window.Splide !== "undefined") {
    initializeThumbnailSlider();
  } else {
    window.addEventListener("load", initializeThumbnailSlider);
  }
}
