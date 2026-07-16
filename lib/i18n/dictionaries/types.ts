export type Dictionary = {
  common: {
    home: string;
  };
  intro: {
    explore: string;
    enableSound: string;
    disableSound: string;
  };
  home: {
    hero: {
      h1Line1: string;
      h1Line2: string;
      h2Line1: string;
      h2Line2: string;
      description: string;
      slideHint: string;
      social: {
        linkedin: string;
        facebook: string;
        tiktok: string;
      };
    };
    stats: {
      headingLine1: string;
      headingLine2: string;
      items: [string, string, string, string, string];
    };
  };
  ourStory: {
    intro: {
      quoteLine1: string;
      quoteLine2: string;
      paragraph: string;
    };
  };
  languageSwitcher: {
    label: string;
  };
  nav: {
    ourStory: string;
    theChain: string;
    ourCocoas: string;
    impact: string;
    gallery: string;
    blog: string;
    order: string;
    openMenu: string;
    closeMenu: string;
  };
};
