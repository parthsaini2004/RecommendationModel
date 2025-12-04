# Movie Recommendation System

Movie Recommendation System | 

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

## How it works (short)

1. Movie representation: movies are converted into numerical vectors using a mix of:
   - TF-IDF for text fields (overview, plot, keywords)
   - Multi-hot / one-hot for categorical fields (genres)
   - Encoded / aggregated features for cast & crew 
   - Normalized numerical features (release year, popularity)
2. User representation: a user vector is computed from recent watched movies (session) and optionally a long-term profile. Recent items can be weighted with a recency function.
3. Similarity & ranking: cosine similarity between the user (or watched item) vector and candidate movie vectors is computed. Top-K similar items are returned.

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


## Data & Datasets

- Movie metadata is fetched/enriched via TMDB API.
- Ground truth for evaluation is derived from user watch-history sequences (time-based train/test split).
- No proprietary dataset included in the repo by default; the project uses live TMDB data and sample watch histories for demo.

## Scalability & Performance

- For large catalogs we can use approximate nearest neighbor (FAISS, Annoy, HNSW) for fast retrieval.
- Cache frequent results and paginate recommendation lists.

## Extensibility & Improvements

- Replace or augment TF-IDF with contextual embeddings (BERT / Sentence Transformers) for better semantic matching.
- Add collaborative filtering / matrix factorization or hybrid models to leverage co-watch patterns.
- Implement online learning to adapt model weights from live feedback, and A/B testing for feature changes.
- Add diversity and fairness constraints when ranking recommendations.

## API Endpoints (example)

- GET /recommend?user_id=<id>&k=10 — get top-k recommendations for a user.
- POST /events — log a user event { user_id, movie_id, event_type, timestamp } to capture interactions.
- GET /movie/<tmdb_id> — fetch enriched movie metadata.

## Final Overview
- Built a context-aware movie recommendation system  that uses cosine-similarity vectorization over movie features and users' recent watch-history to produce personalized suggestions in real time, integrated with TMDB for real data and deployed as a full-stack app (Python ML backend, Node/React frontend, MongoDB).

- Biggest challenges: tuning feature weights, reducing latency for online recommendations, and handling noisy metadata from external APIs.


- Author: Parth Saini (parthsaini2004)
- Repo: https://github.com/parthsaini2004/RecommendationModel
