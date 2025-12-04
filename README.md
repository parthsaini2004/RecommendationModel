# Movie Recommendation System

Movie Recommendation System | Self Project • December 2024

Built a context-aware movie recommendation system that leverages machine learning with cosine similarity vectorization to generate personalized suggestions based on user watch history. The system tracks user interactions in real time, integrates TMDB API calls to fetch real movie metadata, and continuously adapts recommendations to individual viewing habits.

## Tech Stack

- Python (model & data pipelines)
- Scikit-learn, Pandas, NumPy
- React.js (frontend)
- Node.js (API gateway/service)
- MongoDB (event & profile store)
- TMDB API (movie metadata)
- Context modeling for session-aware personalization

## Key Features

- Content-based recommendations using TF-IDF / multi-hot feature vectors and cosine similarity.
- Context-aware personalization: recent user actions are weighted higher to reflect current intent.
- Real movie metadata enrichment using TMDB API.
- Full-stack architecture: ML service (Python) + Node.js API + React frontend.
- Event logging of user actions to MongoDB for online adaptation and analytics.

## How it works (short)

1. Movie representation: movies are converted into numerical vectors using a mix of:
   - TF-IDF for text fields (overview, plot, keywords)
   - Multi-hot / one-hot for categorical fields (genres)
   - Encoded / aggregated features for cast & crew (top-N or embeddings)
   - Normalized numerical features (release year, popularity)
2. User representation: a user vector is computed from recent watched movies (session) and optionally a long-term profile. Recent items can be weighted with a recency function.
3. Similarity & ranking: cosine similarity between the user (or watched item) vector and candidate movie vectors is computed. Top-K similar items are returned.
4. Context modeling: session signals (time-of-day, device, recency) modify weights used to compute recommendations.

## Installation & Setup

Prerequisites:
- Python 3.8+
- Node.js 14+
- MongoDB (local or cloud)
- TMDB API key (https://www.themoviedb.org/documentation/api)

Example setup:

1. Clone the repo

   git clone https://github.com/parthsaini2004/RecommendationModel.git
   cd RecommendationModel

2. Backend (Python) environment

   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt

   Create a .env or set environment variables:
   - TMDB_API_KEY=your_tmdb_api_key
   - MONGODB_URI=mongodb://localhost:27017/recsys

3. Frontend

   cd frontend
   npm install
   npm start

4. Node.js API

   cd api
   npm install
   npm start


## Usage

- Train / prepare offline indices (if applicable): run the data-prep and vectorization scripts in the Python backend to build movie vectors and store them for fast retrieval.
- Start model service and API, then use the frontend or call the recommendation endpoint directly.

Example request (HTTP):

curl -X GET "http://localhost:5000/recommend?user_id=<USER_ID>&k=10"

Response: JSON list of recommended movie IDs and metadata (title, TMDB id, score).

## Data & Datasets

- Movie metadata is fetched/enriched via TMDB API.
- Ground truth for evaluation is derived from user watch-history sequences (time-based train/test split).
- No proprietary dataset included in the repo by default; the project uses live TMDB data and sample watch histories for demo.


## Evaluation & Metrics

Recommended offline metrics to use:
- Precision@K / Recall@K
- Hit Rate / Coverage / Diversity
- NDCG, MAP for ranked relevance

Evaluation strategy:
- Time-aware holdout: use each user's earlier interactions for training and the last N interactions for testing to avoid information leakage.
- Tune feature weights and recency functions using a validation split (time-sliced).


## Scalability & Performance

- For large catalogs use approximate nearest neighbor (FAISS, Annoy, HNSW) for fast retrieval.
- Precompute top-N candidates offline and store them for quick real-time blending with session signals.
- Cache frequent results and paginate recommendation lists.
- Containerize services (Docker) and orchestrate with Kubernetes for horizontal scaling.


## Extensibility & Improvements

- Replace or augment TF-IDF with contextual embeddings (BERT / Sentence Transformers) for better semantic matching.
- Add collaborative filtering / matrix factorization or hybrid models to leverage co-watch patterns.
- Implement online learning to adapt model weights from live feedback, and A/B testing for feature changes.
- Add diversity and fairness constraints when ranking recommendations.


## API Endpoints (example)

- GET /recommend?user_id=<id>&k=10 — get top-k recommendations for a user.
- POST /events — log a user event { user_id, movie_id, event_type, timestamp } to capture interactions.
- GET /movie/<tmdb_id> — fetch enriched movie metadata.


## Interview Prep (what you did & likely questions)

Elevator pitch:
- Built a context-aware movie recommendation system (Dec 2024) that uses cosine-similarity vectorization over movie features and users' recent watch-history to produce personalized suggestions in real time, integrated with TMDB for real data and deployed as a full-stack app (Python ML backend, Node/React frontend, MongoDB).

Short bullets to say in interviews:
- Designed content-based + context modeling approach.
- Engineered features from TMDB (genres, cast, overview) and vectorized them with TF-IDF and multi-hot encodings.
- Weighted recent user actions more heavily to capture session intent.
- Computed cosine similarity for ranking and integrated fast retrieval solutions for production.
- Persisted events to MongoDB to support online adaptation and analytics.

Core data-science questions you might be asked (and brief answers):
- What is cosine similarity and why use it?
  - Formula: (A·B) / (||A|| ||B||). It measures vector orientation and is robust for sparse high-dimensional vectors (e.g., TF-IDF).
- How did you represent movies as vectors?
  - Text -> TF-IDF; genres -> multi-hot; cast/director -> top-N or aggregated embeddings; year/popularity -> normalized scalars.
- How did you evaluate recommendations?
  - Time-based holdout with metrics such as Precision@K, NDCG, Hit Rate.
- How do you handle cold-start?
  - Use content-based fallbacks for new items and initial user onboarding preferences or popularity-based suggestions for new users.
- Why not pure collaborative filtering?
  - CF needs dense user-item interactions; content-based is stronger for cold-start and new items; hybrid models combine benefits.

Engineering & deployment questions:
- How do you serve recommendations in real time?
  - Compute a user vector from recent events and perform nearest-neighbor lookup against indexed item vectors (FAISS/Annoy) or precomputed candidate lists.
- How do you log and process events?
  - Log to MongoDB (or streaming pipeline), process in batches for re-indexing, and optionally stream to a real-time feature store.

Behavioral / ownership:
- Biggest challenges: tuning feature weights, reducing latency for online recommendations, and handling noisy metadata from external APIs.
- How you measured success: offline metrics plus business KPIs such as CTR, watch-time, and retention; A/B tests for iterative improvements.


## Running tests

- Add unit tests for vectorization pipeline and similarity computations (pytest).
- Integration tests for API endpoints and end-to-end demo flows.


## Contributing

- Fork the repo and submit a PR for features or fixes.
- Follow code style in both frontend (ESLint) and backend (black/isort for Python).


## License

MIT License (add LICENSE file if not present)


## Contact

- Author: Parth Saini (parthsaini2004)
- Repo: https://github.com/parthsaini2004/RecommendationModel
