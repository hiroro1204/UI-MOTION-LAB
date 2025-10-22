export const initializeModal = () => {
  console.log("modal");
  const modal = document.querySelector(".js-modal-dialog");
  const modalBg = document.querySelector(".js-modal-bg");
  const modalContents = document.querySelector(".js-modal-dialog-contents");
  const button = document.querySelector(".js-modal-open-button");
  const closeButton = document.querySelector(".js-modal-close-button");

  // modalとbuttonがページ内にない場合returnする
  if (!modal || !button) return;

  // モーダルopenする関数
  const openModal = () => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    modal.showModal();

    // モーダルコンテンツのアニメーション
    gsap.fromTo(
      modalContents,
      {
        opacity: 0,
        scale: 0.98,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      }
    );

    // 背景を表示
    modalBg.style.display = "block";

    // 背景のアニメーション
    gsap.fromTo(
      modalBg,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.15,
        ease: "power1.out",
      }
    );
  };

  // モーダルcloseする関数
  const closeModal = () => {
    // 背景のアニメーション
    gsap.to(modalBg, {
      opacity: 0,
      duration: 0.15,
      ease: "power1.out",
      onComplete: () => {
        modalBg.style.display = "none";
      },
    });

    // モーダルコンテンツのアニメーション
    gsap.to(modalContents, {
      opacity: 0,
      scale: 0.98,
      duration: 0.3,
      ease: "power1.out",
      onComplete: () => {
        modal.close();
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      },
    });
  };

  // ボタンクリックでモーダルopen
  button.addEventListener("click", () => {
    openModal();
  });

  // クローズボタンクリックでモーダルclose
  closeButton.addEventListener("click", () => {
    closeModal();
  });

  // 背景クリックでモーダルclose
  modal.addEventListener("click", (event) => {
    if (event.target.closest(".js-contents") === null) {
      closeModal();
    }
  });

  // Escapeキーを押すと非表示（モーダルが開いている時のみ）
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.open) {
      event.preventDefault();
      closeModal();
    }
  });
};
