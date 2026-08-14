/**
 * =================================================================
 * CENTRAL PORTFOLIO CONFIGURATION
 * =================================================================
 * Single source of truth for all portfolio content.
 * All pages hydrate their dynamic content from this file via
 * assets/js/config-loader.js.
 *
 * IMPORTANT: Edit this file to update your entire portfolio!
 * =================================================================
 */

const PORTFOLIO_CONFIG = {
  // ----------------------------------------------------------------
  // Personal Information
  // ----------------------------------------------------------------
  personal: {
    name: " Ajit Kumar",
    firstName: "Ajit",
    title: "AI/ML Engineer | Machine Learning & Data Science",
    tagline: "Building practical AI/ML solutions with Python and Machine Learning",
    status: "Open to AI/ML Opportunities",
    location: "Darbhanga, Bihar,India",
    email: "ajit.kumar.aiml@gmail.com",
    phone: "+91 7294922080",
    bioShort: "AI/ML Engineer with a strong foundation in Machine Learning, Data Science, and Python, currently pursuing a B.Sc. in Mathematics.",
    bioFull: "AI/ML Engineer focused on building practical, data-driven solutions across Machine Learning, Generative AI, NLP, and LLM-based applications. Experienced in developing end-to-end ML workflows, from data preprocessing and model development to evaluation, deployment, and API integration. Skilled in Python, SQL, Scikit-learn, Pandas, NumPy, LangChain, LangGraph, and modern AI tools. Passionate about solving real-world problems through intelligent systems and continuously exploring emerging AI technologies.",
    careerGoals: "My mission is to build AI systems that are not only technically sophisticated but also ethically grounded and production-ready. I'm passionate about advancing the field of artificial intelligence through rigorous research, open collaboration, and engineering excellence.",
    typewriterRoles: [
      "AI & Machine Learning Engineer",
      "LLM & Fine-Tuning Specialist",
      "Computer Vision Architect"
    ],
    profileImage: "./assets/images/profile.png.png",
    resumePdf: "./assets/files/resume.pdf"
  },

  // ----------------------------------------------------------------
  // Social / Contact Links
  // ----------------------------------------------------------------
  social: {
    github: "https://github.com/Ajitkumar04",
    linkedin: "https://www.linkedin.com/in/ajitkumar-aiml/",
    twitter: "https://twitter.com/alexvance_ai",
    kaggle: "https://www.kaggle.com/ajit1903",
    huggingface: "https://huggingface.co/kumarajit19009",
    email: "ajit.kumar.aiml@gmail.com",
  },

  // ----------------------------------------------------------------
  // SEO Metadata
  // ----------------------------------------------------------------
  seo: {
    metaTitle: "Ajit Kumar |  AI/ML Engineer Portfolio",
    metaDescription: "AI/ML Engineer focused on Machine Learning, Generative AI, NLP, and intelligent systems. Skilled in Python, SQL, Scikit-learn, Pandas, NumPy, LangChain, LangGraph, RAG, and AI agents. Experienced in developing end-to-end AI/ML solutions, from data preprocessing and model development to evaluation and deployment. Passionate about applied AI research, experimentation, and building scalable solutions that solve real-world problems.",
    metaKeywords: "AI Engineer, Machine Learning, Deep Learning, PyTorch, LLM, Computer Vision, MLOps, Portfolio, GitHub Pages",
    ogImage: "src/assets/images/profile.png.png"
  },

  // ----------------------------------------------------------------
  // Metrics Bar (Hero stats)
  // ----------------------------------------------------------------
  metrics: [
    { icon: "fa-solid fa-brain", value: "6+", label: "Years Experience" },
    { icon: "fa-solid fa-rocket", value: "24+", label: "Models Deployed" },
    { icon: "fa-solid fa-project-diagram", value: "15+", label: "AI Projects" },
    { icon: "fa-solid fa-graduation-cap", value: "M.S. AI", label: "Stanford University" },
    { icon: "fa-solid fa-cloud", value: "10M+", label: "Inference Requests" }
  ],

  // ----------------------------------------------------------------
  // Skills (categorized)
  // ----------------------------------------------------------------
  skills: {
    programming: [
      { name: "Python",icon: "fa-brands fa-python",tags: ["PyTorch", "TensorFlow", "FastAPI"] },
      { name: "C++", icon: "fa-solid fa-code", tags: ["CUDA", "Performance"] },
      { name: "CUDA", icon: "fa-solid fa-microchip", tags: ["GPU", "Parallel"] },
      { name: "JavaScript", icon: "fa-brands fa-js", tags: ["Node.js", "React"] },
      { name: "TypeScript", icon: "fa-brands fa-ts", tags: ["Vite", "Node.js"] }
    ],
    dataScience: [
      { name: "NumPy", icon: "fa-solid fa-calculator", tags: ["Arrays", "Math"] },
      { name: "Pandas", icon: "fa-solid fa-table", tags: ["Data Wrangling", "ETL"] },
      { name: "Scikit-learn", icon: "fa-solid fa-brain", tags: ["ML", "Pipelines"] },
      { name: "Matplotlib", icon: "fa-solid fa-chart-line", tags: ["Visualization"] },
      { name: "Seaborn", icon: "fa-solid fa-chart-bar", tags: ["Visualization"] }
    ],
    machineLearning: [
      { name: "PyTorch", icon: "fa-solid fa-fire", tags: ["Deep Learning", "LLM"] },
      { name: "TensorFlow", icon: "fa-solid fa-t", tags: ["Keras", "Production"] },
      { name: "Large Language Models", icon: "fa-solid fa-language", tags: ["LLM", "Fine-Tuning", "Transformers"] },
      { name: "Computer Vision", icon: "fa-solid fa-eye", tags: ["OpenCV", "YOLO", "Detection"] },
      { name: "Deep Learning", icon: "fa-solid fa-network-wired", tags: ["Neural Nets", "CNN", "RNN"] }
    ],
    tools: [
      { name: "Git", icon: "fa-brands fa-git-alt", tags: ["Version Control", "CI/CD"] },
      { name: "Docker", icon: "fa-brands fa-docker", tags: ["Containers", "Deployment"] },
      { name: "Kubernetes", icon: "fa-solid fa-cube", tags: ["Orchestration", "Scaling"] },
      { name: "AWS", icon: "fa-brands fa-aws", tags: ["SageMaker", "EC2", "S3"] },
      { name: "GCP", icon: "fa-solid fa-cloud", tags: ["Vertex AI", "BigQuery"] }
    ],
    deployment: [
      { name: "MLOps", icon: "fa-solid fa-gear", tags: ["CI/CD", "Pipelines"] },
      { name: "MLflow", icon: "fa-solid fa-flask", tags: ["Experiment Tracking"] },
      { name: "Kubeflow", icon: "fa-solid fa-cubes", tags: ["Pipeline Orchestration"] },
      { name: "FastAPI", icon: "fa-solid fa-bolt", tags: ["API", "Serving"] },
      { name: "ONNX", icon: "fa-solid fa-cube", tags: ["Model Optimization"] }
    ]
  },

  // ----------------------------------------------------------------
  // Experience Timeline
  // ----------------------------------------------------------------
   

  // ----------------------------------------------------------------
  // Education
  // ----------------------------------------------------------------
  education: [
    {
      degree: "Certification in Artificial Intelligence and Machine Learning",
      institution: "Vishlesan i-Hub, IIT Patna Indian Institute of Technology, Patna",
      location: "Patna, India",
      period: "02/02/2026 – 19/06/2026",
      gpa: "3.8/7.5",
      description: "Specialized in Artificial Intelligence and Machine Learning. Thesis on 'Efficient Transformer Architectures for Large-Scale Language Modeling'.",
      courses: ["Machine Learning", "Api", " NLP", "Agentic AI", "Statistical Learning"]
    },
    {
      degree: "Bachelor of Science in Mathematics",
      institution: "Lalit Narayan Mithila University (LNMU)",
      location: "Darbhanga, Bihar, India",
      period: "2025 – 2029 (Pursuing)",
      description: "Graduated with Honors. Focused on Mathematics.",
    }
  ],

  // ----------------------------------------------------------------
  // Certifications
  // ----------------------------------------------------------------
  certifications: [
    {
      title: "DeepLearning.AI TensorFlow Developer",
      issuer: "DeepLearning.AI",
      date: "March 2021",
      credentialId: "DR-7X9K2P4M",
      verifyUrl: "https://www.coursera.org/verify/DR-7X9K2P4M",
      badgeIcon: "fa-solid fa-tensor-flow"
    },
    {
      title: "AWS Certified Machine Learning – Specialty",
      issuer: "Amazon Web Services",
      date: "August 2020",
      credentialId: "MLS-C01-8847-2X3K",
      verifyUrl: "https://www.aws.training/Verification?certId=MLS-C01-8847-2X3K",
      badgeIcon: "fa-brands fa-aws"
    },
    {
      title: "Google Cloud Professional ML Engineer",
      issuer: "Google Cloud",
      date: "November 2019",
      credentialId: "GCP-MLE-2019-4471",
      verifyUrl: "https://cloud.google.com/certification/verify/GCP-MLE-2019-4471",
      badgeIcon: "fa-brands fa-google"
    },
    {
      title: "Hugging Face NLP Course Certificate",
      issuer: "Hugging Face",
      date: "June 2022",
      credentialId: "HF-NLP-2022-9918",
      verifyUrl: "https://huggingface.co/learn/nlp-course",
      badgeIcon: "fa-solid fa-robot"
    }
  ],

  // ----------------------------------------------------------------
  // Blog / Articles
  // ----------------------------------------------------------------
  blog: [
    {
      id: "blog-1",
      title: "Optimizing LLM Inference: From Transformers to Triton",
      excerpt: "A deep dive into reducing inference latency for large language models using model optimization, quantization, and NVIDIA Triton serving.",
      date: "March 2024",
      readTime: "12 min read",
      category: "LLM Engineering",
      image: "./assets/images/hero-bg.jpg",
      tags: ["LLM", "Inference", "Triton", "Quantization"],
      content: "Large language models have revolutionized NLP, but deploying them efficiently remains a challenge. This article covers practical techniques for optimizing inference latency..."
    },
    {
      id: "blog-2",
      title: "Building a Production MLOps Pipeline with Kubeflow",
      excerpt: "Step-by-step guide to building a robust MLOps pipeline using Kubeflow, from data versioning to model deployment and monitoring.",
      date: "January 2024",
      readTime: "15 min read",
      category: "MLOps",
      image: "./assets/images/hero-bg.jpg",
      tags: ["MLOps", "Kubeflow", "CI/CD", "Kubernetes"],
      content: "MLOps bridges the gap between data science and production engineering. This guide walks through setting up a complete MLOps pipeline..."
    },
    {
      id: "blog-3",
      title: "Computer Vision at Scale: Real-Time Object Detection on Edge Devices",
      excerpt: "How to deploy real-time computer vision models on edge devices with limited compute, using model compression and ONNX optimization.",
      date: "November 2023",
      readTime: "10 min read",
      category: "Computer Vision",
      image: "./assets/images/hero-bg.jpg",
      tags: ["Computer Vision", "Edge AI", "ONNX", "YOLO"],
      content: "Deploying computer vision models on edge devices requires careful optimization. This article covers techniques for model compression..."
    }
  ],

  // ----------------------------------------------------------------
  // Projects
  // ----------------------------------------------------------------
  projects: [
    {
      id: "proj-1",
      title: "LLMForge: Enterprise LLM Fine-Tuning Platform",
      shortDescription: "A full-stack platform for fine-tuning, evaluating, and deploying large language models with automated MLOps pipelines.",
      fullDescription: "LLMForge is an end-to-end platform that enables data scientists to fine-tune large language models on proprietary datasets, evaluate them against custom benchmarks, and deploy them to production with automated CI/CD pipelines. Built with PyTorch, FastAPI, and Kubernetes.",
      category: "LLM & GenAI",
      image: "./assets/images/hero-bg.jpg",
      results: "40% latency reduction, 15% accuracy improvement",
      technologies: ["PyTorch", "FastAPI", "Kubernetes", "Docker", "React"],
      features: [
        "Automated hyperparameter tuning with Optuna",
        "Multi-model evaluation dashboard",
        "Zero-downtime deployment with Kubernetes",
        "Built-in prompt engineering toolkit"
      ],
      github: "https://github.com/Ajitkumar04/LLMForge",
      liveDemo: "https://llmforge-demo.alexvance-ai.dev"
    },
    {
      id: "proj-2",
      title: "VisionAI: Real-Time Object Detection System",
      shortDescription: "A computer vision system for real-time object detection deployed across 500+ edge devices with sub-50ms latency.",
      fullDescription: "VisionAI is a production-grade computer vision system that performs real-time object detection on edge devices. It uses a custom YOLOv8 architecture optimized with ONNX and TensorRT for maximum inference speed.",
      category: "Computer Vision",
      image: "./assets/images/hero-bg.jpg",
      results: "Sub-50ms latency on edge, 95% mAP",
      technologies: ["Python", "OpenCV", "ONNX", "TensorRT", "YOLOv8"],
      features: [
        "Custom YOLOv8 architecture with quantization",
        "ONNX + TensorRT optimization for edge deployment",
        "Real-time inference at 30 FPS on Jetson Nano",
        "Centralized monitoring and alerting dashboard"
      ],
      github: "https://github.com/Ajitkumar04/VisionAI",
      liveDemo: "https://visionai-demo.alexvance-ai.dev"
    },
    {
      id: "proj-3",
      title: "MLOps Pipeline: Automated Model Deployment",
      shortDescription: "A comprehensive MLOps pipeline for automated model training, testing, and deployment with full experiment tracking.",
      fullDescription: "An end-to-end MLOps pipeline that automates the entire machine learning lifecycle from data ingestion to model deployment. Built with Kubeflow, MLflow, and Argo Workflows.",
      category: "MLOps",
      image: "./assets/images/hero-bg.jpg",
      results: "2-week deployment reduced to 2 hours",
      technologies: ["Kubeflow", "MLflow", "Argo", "Docker", "Kubernetes"],
      features: [
        "Automated data validation and drift detection",
        "Experiment tracking with MLflow",
        "CI/CD pipeline with Argo Workflows",
        "Model registry with version control"
      ],
      github: "https://github.com/Ajitkumar04/mlops-pipeline",
      liveDemo: null
    },
    {
      id: "proj-4",
      title: "NeuralRAG: Retrieval-Augmented Generation System",
      shortDescription: "A RAG system combining dense retrieval with LLM generation for accurate question answering over private documents.",
      fullDescription: "NeuralRAG is a retrieval-augmented generation system that combines dense vector search with large language model generation to provide accurate answers over private document corpora. Built with FAISS, Hugging Face Transformers, and LangChain.",
      category: "LLM & GenAI",
      image: "./assets/images/hero-bg.jpg",
      results: "92% answer accuracy, 200ms response time",
      technologies: ["Python", "FAISS", "Transformers", "LangChain", "Docker"],
      features: [
        "Dense vector retrieval with FAISS",
        "Multi-stage LLM prompting pipeline",
        "Source attribution and factuality scoring",
        "API-first architecture with FastAPI"
      ],
      github: "https://github.com/Ajitkumar04/NeuralRAG",
      liveDemo: "https://neuralrag-demo.alexvance-ai.dev"
    },
    {
      id: "proj-5",
      title: "DeepNet: Neural Network Visualization Toolkit",
      shortDescription: "An interactive toolkit for visualizing and understanding deep neural network activations, attention maps, and gradients.",
      fullDescription: "DeepNet is a visualization toolkit that helps researchers and practitioners understand how deep neural networks make decisions. It provides interactive visualizations of activations, attention maps, and gradients across different architectures.",
      category: "Deep Learning",
      image: "./assets/images/hero-bg.jpg",
      results: "Used by 500+ researchers worldwide",
      technologies: ["Python", "PyTorch", "D3.js", "Flask", "TensorFlow"],
      features: [
        "Layer-wise activation visualization",
        "Attention map analysis for transformers",
        "Gradient flow visualization",
        "Interactive web-based interface"
      ],
      github: "https://github.com/Ajitkumar04/DeepNet",
      liveDemo: "https://deepnet-demo.alexvance-ai.dev"
    },
    {
      id: "proj-6",
      title: "DataFlow: ML Data Pipeline Framework",
      shortDescription: "A scalable data pipeline framework for ingesting, processing, and versioning ML training data with automated quality checks.",
      fullDescription: "DataFlow is a data pipeline framework designed for machine learning workflows. It handles data ingestion from multiple sources, automated quality checks, versioning, and feature engineering pipelines.",
      category: "Data Science",
      image: "./assets/images/hero-bg.jpg",
      results: "Processes 10TB daily, 99.9% data quality",
      technologies: ["Python", "Pandas", "Airflow", "PostgreSQL", "Docker"],
      features: [
        "Multi-source data ingestion with validation",
        "Automated data quality checks and drift detection",
        "Data versioning with DVC integration",
        "Feature store with caching layer"
      ],
      github: "https://github.com/Ajitkumar04/DataFlow",
      liveDemo: null
    }
  ]
};

// Expose globally for config-loader.js
window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
