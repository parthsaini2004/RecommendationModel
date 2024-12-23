import React from 'react'
import NavbarLanding from './navbarLanding'
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {

     const navigate = useNavigate();

  // Define the handleSignUp function
  
  const handleSignIn = () => {
    // Navigate to the signup page
    navigate('/signin'); // Ensure that '/signup' is the correct route to your sign-up page
  };
  const handleSignUp = () => {
    // Navigate to the signup page
    navigate('/signup'); // Ensure that '/signup' is the correct route to your sign-up page
  };

    return (
        <>
            {/* <NavbarLanding /> */}

            <div className='bg-black pb-[50px]' style={{ minHeight: "200vh" }}>
                <div className='  relative'>
                <div className="flex items-center justify-between bg-gray-900 py-4 px-8 shadow-md">
  <div className="flex items-center space-x-4">
    <p className="text-indigo-500 text-4xl sm:text-5xl font-semibold">
      Recommendation Model
    </p>
  </div>

  <div className="flex items-center space-x-6">
    <button className="px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-200" onClick={handleSignUp}>
      Sign Up
    </button>
    <button className="px-6 py-2 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition duration-200" onClick={handleSignIn}>
      Sign In
    </button>
  </div>
</div>


                    <div style={{display:"flex",flexDirection:"row", marginTop: "5vw"}}>
                    <div>
                    <iframe src='https://my.spline.design/connectionsshares-d1ee2a687c9c6729b2b0d4e937087d48/' frameborder='0' width='100%' height='100%' style={{
                        height: "42vw", width: "42vw", maxHeight: "130vh", borderRadius: "42vw",marginLeft:"5vw",marginRight:"6vw"
                        // boxShadow:"0px 4px 10px rgba(191, 191, 191, 0.001)"
                    }}
                    // className="shadow-lg"
                    />
                    </div>
                    {/* <iframe src='https://my.spline.design/matrix-d10025fca84df5676a3c6d58283a21f8/' frameborder='0' width='100%' height='100%' style={{height:"50vw",width:"50vw",maxHeight:"130vh",marginTop:"10vw",borderRadius:"50vw"}}></iframe> */}
                    <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-300 text-left">
  <h2 className="text-3xl font-semibold text-left text-indigo-600 tracking-wide w-full">
    Movie Recommendation System Using Machine Learning
  </h2>
  <p className="text-lg tracking-wide w-full">
    This project leverages a <strong className="text-indigo-500">machine learning</strong> approach to recommend movies by analyzing a user's recent watch history. By using advanced algorithms, the system identifies patterns in the movies the user has watched and suggests films that align with their tastes and preferences. The core technique used in this system is <strong className="text-indigo-500">cosine similarity vectorization</strong>. This method calculates how similar two movies are by transforming them into numerical vectors and comparing these vectors to determine similarity.
  </p>

  <div className="space-y-4">
    <div>
      <h3 className="text-3xl font-semibold text-gray-500 tracking-wide">What is Cosine Similarity?</h3>
      <p className="text-lg tracking-wide w-full">
        Cosine similarity is a powerful technique that quantifies the degree of similarity between two items based on their attributes, such as genre, actors, or plot. The fundamental idea behind this approach is that if two movies share a significant number of common attributes, they are likely to appeal to the same audience. The cosine similarity formula computes the cosine of the angle between the vectors representing the movies. The closer the angle is to zero, the more similar the movies are.
      </p>
    </div>
  </div>
</div>

     </div>
                </div>
                <div className="max-w-4xl mx-auto p-6 mt-8 border-2 border-indigo-600 rounded-lg shadow-xl">
      {/* Header */}
      <h2 className="text-4xl font-semibold text-center text-indigo-600 tracking-wide mb-6">
        Movie Recommendation System Using Machine Learning
      </h2>

      {/* Breakdown Points */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-500">Movie Representation</h3>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-lg leading-relaxed text-gray-300">
              Movies are represented as vectors that encode various features, such as genre, director, actors, and other relevant attributes. These features are converted into numerical form using techniques like one-hot encoding or TF-IDF (Term Frequency-Inverse Document Frequency), transforming movies into a mathematical format that can be compared.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-500">Cosine Similarity</h3>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-lg leading-relaxed text-gray-300">
              Cosine similarity is used to measure the similarity between movies. The formula for cosine similarity between two vectors 𝐴 and 𝐵 is:
            </p>
            <p className="text-lg font-semibold text-indigo-400">
              cosine similarity = (𝐴 ⋅ 𝐵) / (∥𝐴∥ * ∥𝐵∥)
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              This formula calculates the cosine of the angle between the two vectors. The smaller the angle (closer to 0), the higher the similarity between the two movies. The cosine similarity score ranges from -1 (completely dissimilar) to 1 (completely similar).
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-500">Recommendation Process</h3>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-lg leading-relaxed text-gray-300">
              The system analyzes the user’s recently watched movies, representing each movie as a vector. By calculating the cosine similarity between the vectors of the user’s watched movies and all available movies, the system identifies and ranks movies with the highest similarity. The most relevant movies, based on the user's preferences, are recommended.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-500">Context-Aware Recommendations</h3>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-lg leading-relaxed text-gray-300">
              The system leverages a context model, taking into account the user's specific watch history and preferences. By understanding the context of the user’s viewing habits, the model tailors the recommendations to better match the user’s interests, resulting in more personalized suggestions.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-500">Conclusion</h3>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <p className="text-lg leading-relaxed text-gray-300">
              This approach, powered by cosine similarity and context-aware modeling, provides a highly effective recommendation system, offering users movie suggestions that are both relevant and personalized based on their unique preferences.
            </p>
          </div>
        </div>
      </div>
    </div>


            </div>
        </>
    )
}

export default LandingPage
