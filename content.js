/**
 * Edit this file to update the whole site — no HTML changes needed.
 * After saving, push to GitHub; Pages updates in ~1 minute.
 */
window.SITE = {
  meta: {
    title: "Aristo Eng — Data & Software Engineering",
    description:
      "Data science, applied machine learning, and software engineering — pipelines, models, and production-minded code.",
  },

  brand: {
    shortName: "Aristo",
  },

  nav: [
    { href: "#about", label: "About" },
    { href: "#expertise", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ],

  hero: {
    eyebrow: "Data · ML · Software engineering",
    titleParts: [
      { text: "I build ", emphasis: false },
      { text: "models and systems", emphasis: true },
      { text: " that turn messy data into ", emphasis: false },
      { text: "clear outcomes", emphasis: true },
      { text: ".", emphasis: false },
    ],
    lead:
      "Focused on applied machine learning, solid data foundations, and software you can run, test, and extend — not slide decks.",
    primaryCta: { label: "GitHub profile", href: "https://github.com/Aristo-eng" },
    secondaryCta: { label: "See projects", href: "#projects" },
    codeLines: [
      { text: "# What I ship", className: "code-comment" },
      { text: "domains = [", className: "" },
      { text: '  "experimentation",', className: "code-str" },
      { text: '  "pipelines",', className: "code-str" },
      { text: '  "production APIs"', className: "code-str" },
      { text: "]", className: "" },
    ],
  },

  about: {
    title: "About",
    intro:
      "I'm a data and software engineer who enjoys the full path from question to dataset to model to something people actually use. I care about honest evaluation, reproducible workflows, and code that the next person (including future me) can understand.",
    skills: [
      "Python",
      "NumPy · pandas",
      "scikit-learn",
      "Deep learning",
      "SQL",
      "APIs & services",
      "Git",
      "Experiment tracking",
    ],
  },

  expertise: {
    intro:
      "Breadth across the stack — with depth where it matters: data quality, modeling choices, and shipping safely.",
    columns: [
      {
        title: "Data & machine learning",
        accent: false,
        items: [
          "Supervised learning, feature work, and validation design",
          "Baselines before complexity; metrics tied to the business question",
          "Pipelines for ingest, cleaning, and reproducible training",
          "Deep learning — continuous learning and hands-on projects",
        ],
      },
      {
        title: "Software engineering",
        accent: false,
        items: [
          "Services and APIs that wrap models and data products",
          "Testing, logging, and sane defaults for production paths",
          "Refactoring for clarity; interfaces that teams can build on",
        ],
      },
      {
        title: "How I collaborate",
        accent: true,
        items: [
          "Start from the decision the model enables, not the algorithm du jour",
          "Write so others can onboard: READMEs, notebooks, and thin specs",
          "Open to pair-style reviews and cross-functional data work",
        ],
      },
    ],
  },

  projects: {
    title: "Projects & direction",
    intro:
      "Below are representative themes and placeholders — swap titles, links, and descriptions for your real repositories as you publish them.",
    items: [
      {
        title: "Applied ML experiments",
        description:
          "Notebooks and small services to try ideas quickly: baselines, error analysis, and iteration loops before committing to heavy infra.",
        tags: ["Python", "Jupyter", "evaluation"],
        link: "https://github.com/Aristo-eng?tab=repositories",
        linkLabel: "Repositories",
      },
      {
        title: "Data pipelines",
        description:
          "Moving from ad-hoc scripts to repeatable pipelines: validation, idempotent steps, and outputs that downstream models can trust.",
        tags: ["ETL", "quality checks", "automation"],
        link: null,
        linkLabel: null,
      },
      {
        title: "APIs around models",
        description:
          "Wrapping trained artifacts behind simple HTTP interfaces so products and dashboards can consume predictions consistently.",
        tags: ["REST", "deployment", "integration"],
        link: null,
        linkLabel: null,
      },
      {
        title: "Learning & community",
        description:
          "Exploring deep learning and related topics; sharing work on GitHub and looking for collaborators on data-driven builds.",
        tags: ["deep learning", "open source"],
        link: "https://github.com/Aristo-eng",
        linkLabel: "GitHub",
      },
    ],
  },

  contact: {
    title: "Contact",
    lead:
      "For collaborations on data science, applied ML, or engineering-heavy projects, the best place to reach me is GitHub.",
    button: { label: "@Aristo-eng on GitHub", href: "https://github.com/Aristo-eng" },
  },

  footer: {
    line: "Aristo Eng · Hosted on GitHub Pages",
  },
};
