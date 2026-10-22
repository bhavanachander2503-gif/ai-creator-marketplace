# CREOVA — AI Creator Intelligence Marketplace
**Challenge 02 — HacXLerate 2026**
*Challenge Partner: Kampus AI*

> *"Build an AI-native marketplace connecting AI creators with brands and creative agencies — from creator discovery and AI portfolios to briefs, matching and engagement."*

---

## 🚀 Key Features Built to Win

1. **Creator Discovery & Multimodal Filtering**:
   - Filter by AI Toolstack: **Flux.1**, **Midjourney v6**, **Runway Gen-3 Alpha**, **Kling AI 1.5**, **ComfyUI / SD3.5**, **Luma Dream Machine**, **ElevenLabs**, **Suno v3.5**.
   - Faceted aesthetic search, price range, turnaround speed, and commercial indemnity verification.
2. **AI-Native Portfolios & Prompt Vault**:
   - Interactive **Before / After Comparison Slider** (Raw Latent pass vs. 4K Master Upscale).
   - Verifiable generation parameters: Positive Prompt, Negative Prompt, Seed, Sampler, CFG Scale, LoRA weights.
   - **ComfyUI DAG Pipeline Flowchart**: Visual step-by-step reproducibility breadcrumbs.
3. **Smart Creative Briefs & AI Co-pilot**:
   - Automated brief generator that structures raw brand ideas into formal deliverables, aesthetic directives, tool requirements, and milestone payout schedules.
4. **Neural AI Matching Engine**:
   - Multi-vector scoring algorithm analyzing aesthetic alignment, toolchain coverage, and budget/velocity.
   - Transparent natural language AI rationale explaining *why* each creator is recommended.
5. **Engagement, Collaboration & IP Escrow**:
   - Milestone escrow workflow (Styleframes -> Motion Passes -> 4K Master Handover).
   - **Frame-Level AI Visual Feedback**: Brands leave timestamped visual comments; AI Prompt Refiner auto-generates prompt diff tokens for batch regeneration.
   - Cryptographic Commercial IP Transfer deed with SHA-256 digital certification.

---

## 📁 Modular Monolith Architecture

```
creova/
├── frontend/                  # HTML5, CSS3 Variables & Modular Vanilla JS
│   ├── index.html             # Landing & Platform Portal
│   ├── pages/                 # Focused application screens
│   │   ├── login.html         # Sign In with Persona Switcher
│   │   ├── signup.html        # Creator / Brand Onboarding
│   │   ├── discover.html      # Creator Search & Toolstack Filters
│   │   ├── creator-profile.html# Deep AI Portfolio & Prompt Vault
│   │   ├── brand-dashboard.html# Brand / Agency Hub
│   │   ├── creator-dashboard.html# Creator Studio & Pipeline Uploader
│   │   ├── briefs.html        # Briefs Studio & AI Co-pilot
│   │   ├── ai-matching.html   # Neural Matching Engine Visualizer
│   │   ├── messages.html      # Direct Brand-Creator Channels
│   │   ├── projects.html      # Milestone Escrow & Frame Review
│   │   └── admin.html         # Governance & IP Safety Logs
│   ├── css/                   # Design tokens, reset, layout, components
│   └── js/                    # Services, components, utils, and page controllers
│       ├── components/        # navbar, sidebar, creator-card, match-score, modal
│       ├── services/          # creatorService, briefService, matchingService, projectService
│       └── utils/             # formatters, validation
├── backend/                   # Python FastAPI Application
│   ├── main.py                # FastAPI entrypoint mounting /api/v1
│   ├── app/
│   │   ├── core/              # Settings, Security, JWT
│   │   ├── api/v1/            # Auth, Creators, Briefs, Matching, Projects
│   │   ├── schemas/           # Pydantic request & response models
│   │   └── dependencies.py    # Bearer auth & user context
│   ├── ai/                    # Dedicated AI Matching Modules
│   │   ├── brief_parser.py    # Semantic entity & constraint extractor
│   │   ├── portfolio_analyzer.py# Reproducibility & prompt depth scorer
│   │   ├── embeddings.py      # Cosine similarity vector engine
│   │   ├── matching_engine.py # Multi-vector weighted compatibility scorer
│   │   ├── ranking.py         # Deterministic candidate ranker
│   │   └── explanations.py    # Natural language rationale synthesizer
│   ├── tests/                 # Pytest test suite
│   ├── requirements.txt       # Dependencies
│   └── .env.example           # Environment template
├── database/
│   ├── schema.sql             # SQL Schema (Users, Creators, Briefs, Matches, Projects)
│   └── seed_data.py           # Database seeder
└── docs/
    ├── architecture.md        # System architecture specification
    └── api-documentation.md   # Complete REST API reference
```

---

### Option 1: Instant Local Demo (Node.js)
Launch the included zero-dependency server:
```bash
npm start
```
Then visit **`http://localhost:3000`** in your browser!

### Option 2: Direct Browser Preview
Simply double click or open `frontend/index.html` in any web browser! The frontend includes an automatic high-fidelity mock fallback so every screen, filter, prompt inspector, AI Copilot, matching engine, and milestone release works out of the box with zero external dependencies needed.

### Option 3: Run with FastAPI Backend
1. Set up Python virtual environment:
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # On Windows
pip install -r requirements.txt
```

2. Seed database & start FastAPI:
```bash
python ../database/seed_data.py
uvicorn main:app --reload --port 8000
```

---

## 🏆 Full Feature Implementation Matrix

| Category | Feature | Status | Location |
| :--- | :--- | :--- | :--- |
| **1. AI Creator Profiles** | Profile, bio, skills & tools (Flux, Midjourney, Kling, Runway, ComfyUI) | ✅ Complete | `pages/creator-profile.html` |
| | Pricing & availability toggle / pills | ✅ Complete | `creatorService.js`, `creator-card.js` |
| | Interactive before/after portfolio with prompt architecture | ✅ Complete | `pages/creator-profile.html`, `modal.js` |
| | Audited client reviews & ratings collection | ✅ Complete | `creator-profile.js`, `projects.js` |
| **2. Brand & Agency Dashboard** | Company & agency profile management | ✅ Complete | `auth.js`, `brand-dashboard.html` |
| | Agency multi-campaign context switcher | ✅ Complete | `pages/brand-dashboard.html` |
| | Structured creative brief publishing | ✅ Complete | `pages/briefs.html` |
| | Reusable Brand Collections & talent shortlists | ✅ Complete | `brand-dashboard.html`, `creatorService.js` |
| | Ongoing engagements & escrow status tracking | ✅ Complete | `pages/brand-dashboard.html` |
| **3. AI Creator Matching** | Natural language brief understanding | ✅ Complete | `ai-matching.js`, `backend/ai/brief_parser.py` |
| | Multi-vector skill, toolchain & budget compatibility | ✅ Complete | `matchingService.js`, `backend/ai/matching_engine.py` |
| | Real-time candidate ranking with match percentages | ✅ Complete | `pages/ai-matching.html` |
| | Natural language recommendation rationale | ✅ Complete | `ai-matching.js`, `backend/ai/explanations.py` |
| **4. AI Portfolio Assistant** | Automated category and tag suggestion | ✅ Complete | `creator-dashboard.html`, `matchingService.js` |
| | Descriptive copy generation from prompts | ✅ Complete | `creator-dashboard.html` |
| | Smart natural language portfolio search | ✅ Complete | `discover.js`, `creatorService.js` |
| **5. Collaboration & Engagement**| Project invitations & 1-click invite modal | ✅ Complete | `components/modal.js`, `creator-card.js` |
| | Accept / reject collaboration requests | ✅ Complete | `pages/creator-dashboard.html` |
| | Real-time brand-creator messaging channel | ✅ Complete | `pages/messages.html`, `messages.js` |
| | Milestone tracking with smart escrow release | ✅ Complete | `pages/projects.html`, `projectService.js` |
| | Submit deliverable passes & request revisions with prompt diff | ✅ Complete | `pages/projects.html` |
| **Additional Features** | AI Brief Generator (rough ideas -> structured brief) | ✅ Complete | `pages/briefs.html`, `briefs.js` |
| | Side-by-side Creator Comparison matrix | ✅ Complete | `components/compare-modal.js` |
| | AI Pricing Assistant (dynamic INR & USD estimation) | ✅ Complete | `ai-matching.html`, `briefs.html` |
| | Notifications drawer with navbar badge | ✅ Complete | `components/notifications.js`, `navbar.js` |
| | Performance Analytics dashboards | ✅ Complete | `creator-dashboard.html`, `brand-dashboard.html` |
| | Cryptographic verified portfolios & IP license deeds | ✅ Complete | `pages/projects.html`, `pages/admin.html` |
| | Platform governance admin panel (vetting, logs, disputes) | ✅ Complete | `pages/admin.html` |
| **Advanced AI Features** | A. Visual Portfolio Understanding (subjects, styles, composition, themes) | ✅ Complete | `creator-profile.html`, `ai-matching.html` |
| | B. Adaptive Matching (real-time creativity, price, quality, speed sliders) | ✅ Complete | `pages/ai-matching.html`, `ai-matching.js` |
| | C. Creator Opportunity Recommendations (open brief matching) | ✅ Complete | `pages/creator-dashboard.html` |
| | D. Portfolio Authenticity & Tool Disclosure | ✅ Complete | `creator-profile.html`, `creator-dashboard.html` |
| **Role Matrix** | Seamless persona switcher (Brand Client, Creative Agency, AI Creator, Admin) | ✅ Complete | `components/sidebar.js`, `auth.js` |

2. Seed database & start FastAPI:
```bash
python ../database/seed_data.py
uvicorn main:app --reload --port 8000
```
API Documentation will be live at: `http://localhost:8000/docs`

3. Run AI & Backend Test Suite:
```bash
# Using the pre-configured environment in tools/python
$env:PYTHONIOENCODING="utf-8"
tools\python\python.exe -m pytest backend/tests -v
```

---

## 🤖 Live AI & MLOps System (Gemini + Vector Engine + Scikit-Learn Ranker)

For detailed technical specifications, mathematical scoring formulations, and MLOps governance gates, see:
👉 **[`docs/AI_ARCHITECTURE.md`](docs/AI_ARCHITECTURE.md)**

### Key AI Components
1. **Model 1 — Gemini API Integration (`backend/ai/gemini_service.py`)**:
   - Campaign brief analysis into structured parameters
   - AI portfolio summarization & prompt depth analysis
   - Explainable match rationale & outreach pitches
   - Deterministic neural heuristic fallback when `GEMINI_API_KEY` is unconfigured
2. **Model 2 — Vector Search & Embeddings (`backend/ai/embedding_engine.py`)**:
   - `text-embedding-004` (768d) with local 128d dense subword hash fallback
   - SHA-256 content-addressed caching to prevent redundant API calls
   - Cosine similarity + structured faceted search
3. **Model 3 — Trainable Ranking Model (`ml/`)**:
   - `GradientBoostingClassifier` and `LogisticRegression` ranking models
   - 8-dimensional pairwise feature engineering
   - Leak-free stratified splits (Train: 266, Val: 56, Test: 63)
   - Automated deployment gate check (Acc >= 0.70, NDCG@5 >= 0.75, P@3 >= 0.65)
   - Safe rollback path to rule-based baseline
4. **Continuous Feedback Loop (`backend/ai/feedback_service.py`)**:
   - Event logging (`creator_shortlisted`, `match_accepted`, `match_dismissed`, `creator_contacted`)
   - Click-bias anti-leakage protection (view events excluded from positive ranking labels)
   - Persisted in SQLite `creova.db` and interchange `data/feedback_events.json`

### Training & Evaluation Commands
```powershell
$env:PYTHONIOENCODING="utf-8"

# 1. Normalize dataset & generate leak-free splits
tools\python\python.exe ml/data/prepare_dataset.py

# 2. Train Gradient Boosting & Logistic Regression rankers
tools\python\python.exe ml/training/train_ranker.py

# 3. Evaluate models & run deployment gate check
tools\python\python.exe ml/evaluation/evaluate_ranker.py
```


