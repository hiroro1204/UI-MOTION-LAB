/**
 * テーマを切り替える
 */

export const initializeThemeToggle = () => {
  const btn = document.querySelector(".js-theme-toggle");
  const overlay = document.querySelector(".js-theme-overlay");
  if (!btn || !overlay) return;

  let isAnimating = false;

  btn.addEventListener("click", () => {
    // アニメーション中は処理を中断
    if (isAnimating) return;

    // アニメーション中フラグを立てる
    isAnimating = true;

    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    // 切り替え先のテーマカラーを設定
    const transitionColor = next === "dark" ? "#1e1e1e" : "#fff";
    overlay.style.backgroundColor = transitionColor;

    // GSAPでアニメーション
    const timeline = gsap.timeline({
      onComplete: () => {
        // アニメーション完了後にフラグを解除
        isAnimating = false;
      },
    });

    // 真上から真下への塗りつぶし（0.3秒）
    timeline.fromTo(
      overlay,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        opacity: 1,
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.3,
        ease: "power4.inOut",
        onComplete: () => {
          // 塗りつぶし完了時にテーマを切り替え
          document.documentElement.setAttribute("data-theme", next);
        },
      }
    );

    // 0.1秒後に全体を一度に消す（0.3秒）
    timeline.to(
      overlay,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      },
      "+=0.1"
    );
  });
};
