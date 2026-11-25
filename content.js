/**
 * Edit this file to update the whole site — no HTML changes needed.
 * After saving, push to GitHub; Pages updates in ~1 minute.
 */
window.SITE = {
  meta: {
    title: "R. Munezero Mihigo — Applied ML & Data Engineering for Climate and Development",
    description:
      "Applied ML and data engineer building Python pipelines, validated indices and simulation tools for climate and development policy — from 157-country global indices to national dashboards.",
  },

  availability: "Open to new opportunities · Kigali, Rwanda · Remote",

  brand: {
    shortName: "R. Munezero Mihigo",
    avatarInitials: "RM",
  },

  nav: [
    { href: "#about", label: "About" },
    { href: "#expertise", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/Aristo-eng", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ribeus-munezero", icon: "linkedin" },
    { label: "Email", href: "mailto:ribeus.munezero@gmail.com", icon: "email" },
  ],

  hero: {
    eyebrow: "Applied ML · Data Engineering · Climate & Development",
    titleParts: [
      { text: "I build ", emphasis: false },
      { text: "data and AI systems", emphasis: true },
      { text: " that governments use to make ", emphasis: false },
      { text: "policy.", emphasis: true },
    ],
    lead:
      "Python pipelines, validated composite indices and simulation tools — from the 157-country Green Growth Index to national dashboards for Rwanda, Kenya, Angola and Lao PDR.",
    primaryCta: { label: "See projects", href: "#projects" },
    secondaryCta: { label: "View GitHub", href: "https://github.com/Aristo-eng" },
    terminalLabel: "multiyear-template-qc",
    codeLines: [
      { text: "$ python -m mytqc demo", className: "" },
      { text: "# generate templates → validate → report", className: "code-comment" },
      { text: "Findings by country:", className: "" },
      { text: "  severity  error  warning", className: "code-str" },
      { text: "  XBB           2        0", className: "code-str" },
      { text: "  XCC           1        1", className: "code-str" },
      { text: "  XDD           2        1", className: "code-str" },
      { text: "# QC log + HTML country reports written", className: "code-comment" },
    ],
  },

  about: {
    title: "About",
    intro:
      "Data scientist with 4.5+ years automating data processing, validation and indicator computation for international development statistics. At the Global Green Growth Institute (GGGI) I build Python ETL pipelines that compile and validate indicator data from UN/SDG databases and national statistics, compute composite indices for 157 countries with outlier, consistency and robustness checks, and turn the results into dashboards and simulation tools for government partners. MSc in Electrical & Computer Engineering (Applied Machine Learning), Carnegie Mellon University; AI Fellow at AIMS Research and Innovation Centre.",
    highlights: [
      { value: "157", label: "countries in the Green Growth Index, validated annually" },
      { value: "6", label: "national indices: Kenya, Ghana, Togo, Zambia, Lao PDR, Angola" },
      { value: "90+", label: "indicators in Rwanda's GESI Index for NDC 3.0" },
      { value: "4.5+", label: "years in data processing, validation and ML" },
    ],
    skills: [
      "Python",
      "R",
      "SQL",
      "pandas · NumPy",
      "scikit-learn",
      "PyTorch",
      "Random Forest · Monte Carlo · SHAP",
      "LLM / GenAI",
      "openpyxl · Excel automation",
      "Dash",
      "Git · Docker",
      "Jupyter",
    ],
  },

  expertise: {
    intro:
      "Where data engineering, applied machine learning and public policy meet.",
    columns: [
      {
        title: "Data pipelines & validation",
        accent: false,
        items: [
          "ETL from international databases (UN/SDG), national statistics and surveys",
          "Reading, validating and writing Excel workbooks at scale (openpyxl, pandas)",
          "Outlier, consistency, range and year-on-year checks with machine-readable QC logs",
          "Indicator calculation, normalisation and aggregation into composite indices",
        ],
      },
      {
        title: "Applied ML & modelling",
        accent: false,
        items: [
          "Robustness testing of indices with Random Forest, Monte Carlo simulation and correlation analysis",
          "AI approaches to identify and close data gaps in SDG and GESI indicators",
          "Sectoral simulation models (water, materials, waste, AFOLU) linked into one tool",
          "Explainability with SHAP; responsible and ethical data use",
        ],
      },
      {
        title: "From scripts to tools",
        accent: true,
        items: [
          "Online dashboards and simulation tools used by government partners",
          "Documented, reproducible, tested code in Git",
          "Training modules and workshops that explain the tools to non-specialists",
        ],
      },
    ],
  },

  projects: {
    title: "Projects",
    intro:
      "Selected work at GGGI and open-source code. Reports and tools are public where linked.",
    items: [
      {
        title: "Green Growth Index — global validation",
        description:
          "Validated the annual Green Growth Index for 154–157 countries against SDG targets (2022–2025): data collection and validation, outlier and correlation checks, normalisation and aggregation, and robustness testing with Random Forest and Monte Carlo simulation.",
        tags: ["Python", "pandas", "Random Forest", "Monte Carlo"],
        link: "https://ggindex-simtool.gggi.org/publications",
        linkLabel: "Read the reports",
      },
      {
        title: "AI-GGSim — Lao PDR",
        description:
          "Python sectoral models for water, materials and waste circularity, with AI methods to close data gaps in SDG and GESI indicators. Linked with AFOLU and GESI models into an online simulation dashboard for analysing the co-benefits of climate policy.",
        tags: ["Python", "Simulation", "ML", "Dash"],
        link: "https://ggindex-simtool.gggi.org/",
        linkLabel: "GGGI index & simulation tools",
      },
      {
        title: "GESI Index & Simulation Tool — Rwanda",
        description:
          "Led development with GGGI and the Rwanda Environment Management Authority: 90+ indicators on gender, climate, youth, disability and digital inclusion, collected, harmonised and analysed to support Rwanda's NDC 3.0.",
        tags: ["Indicators", "Python", "Policy", "Workshops"],
        link: null,
        linkLabel: null,
      },
      {
        title: "National Green Growth Indices & dashboards",
        description:
          "Country indicator databases, validation with national experts and online dashboards for Kenya, Ghana, Togo, Zambia, Lao PDR and Angola, plus the Enhanced LDC Index for climate diplomacy and the Africa LDC assessment.",
        tags: ["Python", "Dashboards", "Data validation"],
        link: "https://ggindex-simtool.gggi.org/publications",
        linkLabel: "Read the reports",
      },
      {
        title: "multiyear-template-qc",
        description:
          "Open-source pipeline for multi-year statistical data collection in Excel: generates templates from configuration (English and French), validates returned submissions against a rule library, writes QC logs and HTML country review reports, and consolidates everything with cell-level provenance. Synthetic data, with tests.",
        tags: ["Python", "openpyxl", "pandas", "pytest"],
        link: "https://github.com/Aristo-eng/multiyear-template-qc",
        linkLabel: "View code",
      },
      {
        title: "Earlier ML & data projects",
        description:
          "Customer churn prediction, a PostgreSQL schema and ETL pipeline, and an analysis of Rwanda's progress on the SDGs.",
        tags: ["scikit-learn", "PostgreSQL", "Jupyter"],
        link: "https://github.com/Aristo-eng?tab=repositories",
        linkLabel: "All repositories",
      },
    ],
  },

  contact: {
    title: "Let's work together",
    lead:
      "Open to data science, ML engineering and data-for-development roles and consultancies, remote or in Kigali.",
    button: { label: "Email me", href: "mailto:ribeus.munezero@gmail.com" },
  },

  footer: {
    line: "R. Munezero Mihigo · Applied ML & Data Engineering",
  },
};
