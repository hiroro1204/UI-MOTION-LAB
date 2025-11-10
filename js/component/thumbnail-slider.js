/**
 * サムネイルスライダー
 */

export const initializeThumbnailSlider = () => {
  // Splideがグローバルスコープに読み込まれるまで待つ
  if (typeof window.Splide === "undefined") {
    console.error("Splideライブラリが読み込まれていません");
    return;
  }

  // メインのカルーセル要素（Splideターゲット）を取得
  const mainCarousel = document.querySelector(".js-thumbnail-slider");

  // サムネイル（ボタン）を取得
  const thumbnailElements = document.querySelectorAll(
    ".js-thumbnail-slider-thumb"
  );

  // 必要な要素が存在しない場合は処理を終了
  if (!mainCarousel || thumbnailElements.length === 0) {
    return;
  }

  // Splideの設定オプション
  const splideOptions = {
    type: "fade",
    pagination: false,
  };

  // Splideインスタンスを作成
  const splide = new window.Splide(mainCarousel, splideOptions);

  // スライドとサムネイルを配列へ変換
  const slides = Array.from(
    mainCarousel.querySelectorAll(".js-thumbnail-slider-slide")
  );
  const thumbnails = Array.from(thumbnailElements);
  let currentThumbnail = null;

  // スライドにIDが無ければ付与し、aria-controlsで参照できるようにする
  slides.forEach((slide, index) => {
    if (!slide.id) {
      slide.id = `top-thumbnail-slide-${index + 1}`;
    }
  });

  // アクティブなサムネイルを切り替える関数
  const activateThumbnail = (index) => {
    const nextThumbnail = thumbnails[index];

    if (!nextThumbnail) {
      return;
    }

    if (currentThumbnail) {
      currentThumbnail.classList.remove("is-active");
      currentThumbnail.removeAttribute("aria-current");
      const currentParent = currentThumbnail.closest(
        ".bottom-thumbnail-slider-item"
      );
      currentParent?.classList.remove("is-active");
    }

    nextThumbnail.classList.add("is-active");
    nextThumbnail.setAttribute("aria-current", "true");
    const nextParent = nextThumbnail.closest(".bottom-thumbnail-slider-item");
    nextParent?.classList.add("is-active");
    currentThumbnail = nextThumbnail;
  };

  // 各サムネイルにアクセシビリティ属性とイベントを登録
  thumbnails.forEach((thumbnail, index) => {
    const controlledSlideId = slides[index]?.id ?? "";
    if (controlledSlideId && !thumbnail.hasAttribute("aria-controls")) {
      thumbnail.setAttribute("aria-controls", controlledSlideId);
    }

    const thumbnailImage = thumbnail.querySelector("img");
    const altText = thumbnailImage?.getAttribute("alt")?.trim();
    const label = altText
      ? `${altText}のスライドを表示`
      : `スライド${index + 1}を表示`;

    if (!thumbnail.hasAttribute("aria-label")) {
      thumbnail.setAttribute("aria-label", label);
    }

    thumbnail.addEventListener("click", () => {
      splide.go(index);
    });

    thumbnail.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        splide.go(index);
      }
    });
  });

  // Splideの状態が変化した際にアクティブサムネイルを更新
  splide.on("mounted move", () => {
    activateThumbnail(splide.index);
  });

  // Splideをマウントし、初期表示時にもアクティブサムネイルを設定
  splide.mount();
  activateThumbnail(splide.index);
};
