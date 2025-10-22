export const initializeTabMenu = () => {
  const tabs = document.querySelectorAll("[data-button]");
  const contents = document.querySelectorAll("[data-content]");

  const tabClick = (event) => {
    //クリックされたdata-buttonの値
    const targetValue = event.target.dataset.button;
    //クリックされたtab
    const targetTab = tabs[targetValue];
    //クリックされたtabに対応するcontents
    const targetContent = document.querySelector(
      '[data-content="' + targetValue + '"]'
    );

    //全てのis-activeをremove
    [tabs, contents].forEach((array) =>
      array.forEach((element) => element.classList.remove("is-active"))
    );

    //クリックしたタブにis-activeをadd
    targetTab.classList.add("is-active");

    //クリックしたコンテンツにis-activeをadd
    targetContent.classList.add("is-active");

    //コンテンツのアニメーション
    gsap.from(targetContent, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  //tabsクリックで発火
  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => tabClick(event));
  });
};
