type ProcessStep = {
  titleLine1: string;
  titleLine2: string;
  description: string;
};

type FeatureItem = {
  title: string;
  description: string;
};

type SpecRow = [string, string, string];

type AxisItem = {
  label: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
};

type OrderDictionary = {
  contactHeadingLine1: string;
  contactHeadingLine2: string;
  whatsappLabel: string;
  emailLabel: string;
  section1Title: string;
  companyNameLabel: string;
  structureTypeLabel: string;
  section2Title: string;
  fullNameLabel: string;
  positionLabel: string;
  emailAddressLabel: string;
  phoneLabel: string;
  section3Title: string;
  section3Suffix: string;
  formatDiscoveryTitle: string;
  formatDiscoveryWeight: string;
  formatDiscoveryDescription: string;
  formatAromaticTitle: string;
  formatAromaticWeight: string;
  formatAromaticDescription: string;
  originLabel: string;
  originOptions: [string, string, string];
  section4Title: string;
  annualVolumeLabel: string;
  annualVolumeOptions: [string, string, string, string];
  requirementsLabel: string;
  requirementsPlaceholder: string;
  submitButton: string;
  submittingButton: string;
  guaranteeLabel: string;
  guaranteeText: string;
  successMessage: string;
  errorMessage: string;
  step1Label: string;
  step2Label: string;
  nextButton: string;
  backButton: string;
  requiredFieldsError: string;
  successHeading: string;
  newRequestButton: string;
};

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
    legacy: {
      h1Line1: string;
      h1Line2: string;
      h3Prefix: string;
      h3Emphasis: string;
      paragraph: string;
      callout: string;
      founded: {
        leadIn: string;
        brand1: string;
        and: string;
        brand2: string;
        paragraph: string;
      };
    };
    mission: {
      h1Line1: string;
      h1Line2: string;
      h3Emphasis: string;
      paragraph: string;
      missionTitle: string;
      missionEmphasis: string;
      missionParagraph: string;
      engagementTitle: string;
      engagementEmphasis: string;
      engagementParagraph: string;
    };
    purchase: {
      headingWord: string;
      headingRest: string;
      headingLine2: string;
      headingLine3: string;
      headingLine4: string;
    };
  };
  theChain: {
    hero: {
      h1Line1: string;
      h1Emphasis: string;
      paragraph: string;
      slideHint: string;
    };
    greenFarmers: {
      eyebrow: string;
      heading: string;
      paragraph1: string;
      paragraph2: string;
    };
    greenCommodities: {
      eyebrow: string;
      heading: string;
      paragraph1: string;
      paragraph2: string;
    };
    secureProcess: {
      h1Line1: string;
      h1Line2: string;
      h1Emphasis: string;
      paragraph: string;
    };
    processSteps: [ProcessStep, ProcessStep, ProcessStep];
  };
  ourCocoas: {
    hero: {
      h1Prefix: string;
      h1Emphasis: string;
      h1Line2: string;
      h1Line3: string;
      paragraph: string;
    };
    gradeQuality: {
      h1Line1: string;
      h1Emphasis: string;
      h1Line3: string;
      h1Line4: string;
      h1Line5: string;
      paragraph: string;
    };
    qualityCriteria: {
      heading: string;
      emphasis: string;
      paragraph: string;
      items: [FeatureItem, FeatureItem, FeatureItem];
    };
    specifications: {
      h1Line1: string;
      h1Line2: string;
      paragraph: string;
      table: {
        headers: [string, string, string];
        rows: [SpecRow, SpecRow, SpecRow, SpecRow, SpecRow, SpecRow];
      };
    };
    certifications: {
      heading: string;
      paragraph: string;
    };
  };
  impact: {
    hero: {
      h1Prefix: string;
      h1Emphasis: string;
      h1Suffix: string;
      h1Line2: string;
      axisLabel: string;
      axisTitle: string;
      paragraph1: string;
      paragraph2: string;
    };
    axes: [AxisItem, AxisItem];
  };
  gallery: {
    heading: string;
    seeMore: string;
  };
  blog: {
    comingSoon: string;
  };
  order: OrderDictionary;
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
