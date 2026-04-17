/**
 * Edit this file to update the whole site — no HTML changes needed.
 * After saving, push to GitHub; Pages updates in ~1 minute.
 */
window.SITE = {
  meta: {
    title: "Aristo Eng — ML Engineer & Data Scientist",
    description:
      "Machine learning engineer building end-to-end AI systems — from raw data to deployed production models.",
  },

  availability: "Open to new opportunities",

  brand: {
    shortName: "Aristo",
    avatarInitials: "AE",
  },

  nav: [
    { href: "#about", label: "About" },
    { href: "#expertise", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/Aristo-eng", icon: "github" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
  ],

  hero: {
    eyebrow: "Machine Learning · Data Engineering · Production AI",
    titleParts: [
      { text: "I build ", emphasis: false },
      { text: "AI systems", emphasis: true },
      { text: " that go from data to ", emphasis: false },
      { text: "production.", emphasis: true },
    ],
    lead:
      "End-to-end ML engineering — clean pipelines, trained models, and APIs that stay up. Built to ship, not just to demo.",
    primaryCta: { label: "View GitHub", href: "https://github.com/Aristo-eng" },
    secondaryCta: { label: "See projects", href: "#projects" },
    terminalLabel: "pipeline.py",
    codeLines: [
      { text: "# feature engineering → model → prod", className: "code-comment" },
      { text: "pipe = Pipeline([", className: "" },
      { text: '  ("enc",  FeatureEncoder()),', className: "code-str" },
      { text: '  ("clf",  LGBMClassifier()),', className: "code-str" },
      { text: "])", className: "" },
      { text: "score = cross_val_score(pipe, X, y)", className: "" },
      { text: "# AUC  0.961  ±  0.008  →  shipped", className: "code-comment" },
    ],
  },

  about: {
    title: "About",
    intro:
      "I'm an ML engineer who builds systems end to end — data collection, feature engineering, model training, and deployment. I focus on what matters in production: data quality, evaluation rigor, inference latency, and code that teammates can read and extend without a two-hour onboarding call.",
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "LightGBM · XGBoost",
      "Hugging Face",
      "pandas · NumPy",
      "FastAPI",
      "Docker",
      "MLflow",
      "SQL",
      "REST APIs",
    ],
  },

  expertise: {
    intro:
      "Across the full ML lifecycle — from raw data to running service — with depth in modeling, engineering, and making things reliable.",
    columns: [
      {
        title: "Machine Learning & AI",
        accent: false,
        items: [
          "Supervised & unsupervised learning, deep neural networks",
          "Feature engineering, cross-validation, hyperparameter tuning",
          "NLP, computer vision, and tabular ML across domains",
          "Experiment tracking with MLflow; reproducible training runs",
        ],
      },
      {
        title: "Data & MLOps",
        accent: false,
        items: [
          "Scalable pipelines: ingest, validate, transform, store",
          "Model serving via REST APIs with low-latency inference",
          "Monitoring for data drift and model degradation over time",
          "Containerised deployments with Docker",
        ],
      },
      {
        title: "Engineering mindset",
        accent: true,
        items: [
          "Production over proof-of-concept — things that stay running",
          "Tests, logging, and clear interfaces from day one",
          "Readable code and docs that teammates can build on",
        ],
      },
    ],
  },

  projects: {
    title: "Projects",
    intro:
      "Selected work across machine learning, data engineering, and applied AI.",
    items: [
      {
        title: "ML Experimentation Framework",
        description:
          "Structured workflow for running, tracking, and comparing experiments — baselines, ablations, and error analysis — before scaling to production infrastructure.",
        tags: ["Python", "MLflow", "scikit-learn", "Jupyter"],
        link: "https://github.com/Aristo-eng?tab=repositories",
        linkLabel: "View on GitHub",
      },
      {
        title: "Production Data Pipeline",
        description:
          "End-to-end pipeline for ingesting raw data, running validation checks, engineering features, and delivering clean outputs that downstream models can trust.",
        tags: ["ETL", "pandas", "SQL", "Docker"],
        link: null,
        linkLabel: null,
      },
      {
        title: "Model Serving API",
        description:
          "FastAPI service wrapping a trained model behind a versioned REST interface — schema validation, health checks, and sub-50ms P99 latency under load.",
        tags: ["FastAPI", "Docker", "REST", "Python"],
        link: null,
        linkLabel: null,
      },
      {
        title: "Deep Learning Research",
        description:
          "Hands-on deep learning projects: training transformers and CNNs from scratch, studying architectures, and publishing learnings and reproducible code on GitHub.",
        tags: ["PyTorch", "Transformers", "NLP", "Open source"],
        link: "https://github.com/Aristo-eng",
        linkLabel: "GitHub",
      },
    ],
  },

  contact: {
    title: "Let's work together",
    lead:
      "Open to ML engineering roles, data science collaborations, and applied AI projects. Reach me on GitHub or connect on LinkedIn.",
    button: { label: "@Aristo-eng on GitHub", href: "https://github.com/Aristo-eng" },
  },

  footer: {
    line: "Aristo Eng · ML Engineer",
  },
};
