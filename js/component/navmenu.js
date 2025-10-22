export const initializeNavMenu = () => {
  const navMenu = document.querySelector(".js-nav-menu");
  const button = document.querySelector(".js-nav-menu-button");
  const closeButton = document.querySelector(".js-nav-menu-close-button");
  const navMenuItems = document.querySelectorAll(".js-nav-menu-item");

  if (!navMenu || !button) return;

  // bodyのスタイルをリセットしてスクロール位置を復元
  const restoreBodyScroll = () => {
    const scrollY = document.body.dataset.scrollY;
    document.body.style.overflowY = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo({
      top: parseInt(scrollY || "0"),
      behavior: "instant",
    });
  };

  // メニューを開く
  const openMenu = () => {
    const scrollY = window.scrollY;
    document.body.style.overflowY = "scroll";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.dataset.scrollY = scrollY;
    navMenu.showModal();
    gsap.fromTo(
      navMenu,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "power1.out" }
    );
  };

  // メニューを閉じる
  const closeMenu = (onCompleteCallback) => {
    gsap.to(navMenu, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.out",
      onComplete: () => {
        navMenu.close();
        restoreBodyScroll();
        if (onCompleteCallback) onCompleteCallback();
      },
    });
  };

  // ボタンクリックでopen
  button.addEventListener("click", () => {
    openMenu();
  });

  // クローズボタンクリックでclose
  closeButton.addEventListener("click", () => {
    closeMenu();
  });

  // メニュー項目クリック時の処理
  navMenuItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "a") {
        event.preventDefault();
        const targetHash = event.target.hash;
        const targetElement = targetHash
          ? document.querySelector(targetHash)
          : null;

        // メニューを閉じて、完了後にスクロール
        closeMenu(() => {
          requestAnimationFrame(() => {
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          });
        });
      }
    });
  });

  // Escapeキーを押すと非表示（メニューが開いている時のみ）
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navMenu.open) {
      event.preventDefault();
      closeMenu();
    }
  });
};
