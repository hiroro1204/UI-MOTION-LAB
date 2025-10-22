export const initializeAccordion = () => {
  const details = document.querySelectorAll(".js-details");

  const isRunning = "running"; // アニメーション実行中に付与するカスタムデータ属性
  const isOpen = "is-open"; // open時に付与するクラス

  // detailsがページ内にない場合returnする
  if (!details) return;

  details.forEach((detail) => {
    const summary = detail.querySelector(".js-summary");
    const content = detail.querySelector(".js-contents");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // summaryとcontentがページ内にない場合returnする
      if (!summary || !content) return;

      // アニメーション中にクリックイベントを受け付けない(連打防止用)
      if (detail.dataset.animStatus === isRunning) return;

      // detailsのopen属性を判定
      if (detail.open) {
        // アコーディオンを閉じるときの処理
        detail.classList.remove(isOpen);

        // アニメーションを実行
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power1.out",
          onUpdate: () => {
            // アニメーション実行中用の値を入れる
            detail.dataset.animStatus = isRunning;
          },
          onComplete: () => {
            // アニメーション完了後にcontentの高さをautoにする
            content.style.height = "auto";
            // open属性を取り除く
            detail.removeAttribute("open");
            // アニメーション実行中用の値を取り除く
            detail.dataset.animStatus = "";
          },
        });
      } else {
        // アコーディオンを開くときの処理
        detail.setAttribute("open", "true");

        const contentHeight = content.offsetHeight; // contentの高さを測定
        detail.classList.add(isOpen);

        // アニメーションを実行
        gsap.fromTo(
          content,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: contentHeight,
            opacity: 1,
            duration: 0.3,
            ease: "power1.out",
            onUpdate: () => {
              // アニメーション実行中用の値を入れる
              detail.dataset.animStatus = isRunning;
            },
            onComplete: () => {
              // アニメーション完了後にcontentの高さをautoにする
              content.style.height = "auto";
              // アニメーション完了後にアニメーション実行中用の値を取り除く
              detail.dataset.animStatus = "";
            },
          }
        );
      }
    });
  });
};
