# World-Class AI/ML Engineer Portfolio

A production-ready, ultra-responsive, high-performance portfolio website tailored specifically for AI/ML Engineers, Data Scientists, and Deep Learning Researchers. Built with pure HTML5, CSS3, and Vanilla JavaScript—designed to be hosted directly on **GitHub Pages** with zero backend dependencies.

![AI/ML Portfolio Preview](./assets/images/profile.png.png)

## 🌟 Highlights & Key Features

- ⚙️ **Single-File Configuration (`config.js`)**: Edit ONE file to update your entire portfolio! All pages, skills, projects, links, and text dynamically hydrate from `config.js`.
- 🌓 **Dark/Light Mode Toggle**: Includes persistent user preference detection (`localStorage`) and system theme auto-sync.
- 🧠 **Interactive Neural Canvas**: Custom HTML5 animated particle graph background representing AI node interconnections.
- ⌨️ **Dynamic Typewriter Effect**: Smooth multi-role animated titles on the Hero section.
- 🔍 **Interactive Project Showcase**: Instant category filtering, real-time live search, tech stack tags, and popup Case Study modal reader.
- 📊 **Categorized Skills Grid**: Interactive proficiency indicators with tags for Python, PyTorch, C++, CUDA, LLMs, Computer Vision, MLOps, and deployment frameworks.
- ⏳ **Career & Experience Timeline**: Elegant vertical timeline with key achievements, impact metrics, and technology chips.
- 🎓 **Education & Certifications**: Grid cards with credential validation buttons and honors.
- 📝 **Technical Blog Reader**: Built-in article card preview with full modal reader for tutorials and insights.
- 📬 **Working Contact Form**: Pure client-side validation with toast alerts and anti-spam honeypot.
- 🚀 **100% GitHub Pages Ready**: Zero build steps required—simply push to GitHub and enable Pages!
- ⚡ **SEO & Performance Optimized**: Semantic HTML5, JSON-LD structured data (Person schema), Open Graph tags, Twitter Cards, `sitemap.xml`, and `robots.txt`.

---

## 📁 Repository Directory Structure

```text
portfolio/
│
├── index.html              # Main multi-section home page
├── about.html              # Dedicated About & Timeline page
├── projects.html           # Dedicated Projects showcase & search
├── contact.html            # Dedicated Contact form page
├── config.js               # CENTRAL CONFIGURATION FILE (Edit this!)
│
├── assets/
│   ├── css/
│   │   ├── style.css       # Core layout and component styling
│   │   ├── theme.css       # Light / Dark mode color variables
│   │   └── animations.css  # Keyframes, floating effects, and glows
│   ├── js/
│   │   ├── config-loader.js# Hydrates DOM from config.js
│   │   ├── main.js         # Mobile drawer, canvas, and modal logic
│   │   ├── theme.js        # Theme toggler & persistence
│   │   ├── typing.js       # Typewriter animation engine
│   │   ├── filter.js       # Category filters & live search
│   │   └── contact.js      # Contact form & toast notifications
│   ├── images/             # Profile photos & project banners
│   └── files/
│       └── resume.pdf      # Downloadable PDF Resume
│
├── favicon.ico             # SVG/ICO vector tab icon
├── robots.txt              # Search engine directives
├── sitemap.xml             # XML Sitemap for SEO indexing
└── README.md               # Complete setup documentation
```

---

## 🛠️ Quick Customization Guide (`config.js`)

You **do not** need to edit HTML or CSS to customize this website. Open `config.js` in any code editor and modify the JavaScript object:

```javascript
const PORTFOLIO_CONFIG = {
  personal: {
    name: "Ajit Kumar",
    firstName: "Ajit",
    title: "AI/ML Engineer | Machine Learning & Data Science",
    tagline: "Building practical AI/ML solutions with Python and Machine Learning",
    status: "Open to AI/ML Opportunities",
    location: "Darbhanga, Bihar, India",
    email: "ajit.kumar.aiml@gmail.com",
    phone: "+91 7294922080",
    
    // Typewriter roles
    typewriterRoles: [
      "AI & Machine Learning Engineer",
    ],

    profileImage: "./assets/images/profile.png.png",
    resumePdf: "./assets/files/resume.pdf"
  },

  social: {
    github: "https://github.com/Ajitkumar04",
    linkedin: "https://linkedin.com/in/alexvance-ai",
    twitter: "https://twitter.com/alexvance_ai",
    kaggle: "https://kaggle.com/alexvance",
    huggingface: "https://huggingface.co/alexvance",
    email: "ajit.kumar.aiml@gmail.com",
  },

  // Add your projects here...
  projects: [ ... ]
};
```

---

## 🚀 GitHub Pages Deployment Steps

Deploying this portfolio to GitHub Pages takes under 2 minutes:

1. **Create a GitHub Repository**:
   - Go to [GitHub New Repository](https://github.com/new).
   - Name your repository `your-username.github.io` (or any custom name like `ai-portfolio`).
   - Select **Public**.

2. **Push the Code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AI/ML Engineer Portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repository-name.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Navigate to your repository **Settings** tab.
   - Click **Pages** in the left sidebar menu.
   - Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
   - Choose `main` branch and `/ (root)` folder, then click **Save**.
   - Your website will be live in ~60 seconds at `https://your-username.github.io/`!

---

## 🧪 Local Preview & Development

Because this portfolio uses pure vanilla HTML/CSS/JS, you can view it locally by:
- Double-clicking `index.html` to open it directly in your browser.
- Or running a lightweight HTTP server (e.g. using VS Code **Live Server** extension or `npx serve .`).

---

## 📄 License

This project is open-source and released under the [MIT License](LICENSE). Feel free to use, modify, and customize it for your personal or commercial portfolio!
# portfolio-websit.io
