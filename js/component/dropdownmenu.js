/**
 * ドロップダウンメニュー
 */

export const initializeDropdownMenu = () => {
  const button = document.querySelector(".js-user-button");
  const menu = document.querySelector(".js-dropdownmenu");
  const isOpen = "is-open";

  // buttonとmenuがページ内にない場合returnする
  if (!button || !menu) return;

  // menuをopenする関数
  const openMenu = () => {
    gsap.fromTo(
      menu,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "power1.out",
        onStart: () => {
          // is-openクラスを付与
          menu.classList.add(isOpen);
        },
      }
    );
  };

  // menuをcloseする関数
  const closeMenu = () => {
    gsap.fromTo(
      menu,
      {
        opacity: 1,
        scale: 1,
      },
      {
        opacity: 0,
        scale: 0.95,
        duration: 0.15,
        ease: "power1.out",
        onComplete: () => {
          // is-openクラスを取り除く
          menu.classList.remove(isOpen);
        },
      }
    );
  };

  // buttonをクリックで表示/非表示
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    if (menu.classList.contains(isOpen)) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // menu外をクリックで非表示
  document.addEventListener("click", () => {
    closeMenu();
  });

  // Escapeキーを押すと非表示（メニューが開いている時のみ）
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains(isOpen)) {
      closeMenu();
    }
  });
};
