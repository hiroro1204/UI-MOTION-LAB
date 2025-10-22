/**
 * ヘッダーをスクロールに合わせて固定
 */

export const initializeStickyHeader = () => {
  const headerElement = document.querySelector(".js-header");
  const scrollTargetElement = document.querySelector(".js-scrollTarget");
  const headerFixedClass = "is-fixed";

  if (!headerElement || !scrollTargetElement) return;

  // IntersectionObserverのOption
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  // headerを表示
  const showHeader = () => {
    headerElement.classList.add(headerFixedClass);
    gsap.to(headerElement, {
      y: 80,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  // headerを隠す
  const hideHeader = () => {
    gsap.to(headerElement, {
      y: 0,
      duration: 0.15,
      ease: "power2.out",
      onComplete: () => headerElement.classList.remove(headerFixedClass),
    });
  };

  const headerVisibilityHandler = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        hideHeader();
      } else {
        showHeader();
      }
    });
  };

  const scrollObserver = new IntersectionObserver(
    headerVisibilityHandler,
    observerOptions
  );
  scrollObserver.observe(scrollTargetElement);
};
