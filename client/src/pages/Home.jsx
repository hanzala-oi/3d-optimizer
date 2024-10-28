function Home() {
  return (
    <div className="min-h-screen font-poppins flex flex-col items-center justify-center bg-gray-100 py-12 px-6 sm:px-10 lg:px-32">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to the 3D Optimizer Tool
        </h1>
        <p className="text-gray-700 mb-6">
          Optimize your 3D GLB models effortlessly. Just provide a Google Drive
          link to your GLB file, and we’ll return an optimized version ready for
          use!
        </p>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner text-left">
          <p className="text-gray-800 font-semibold mb-3">How it works:</p>
          <ul className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Paste your Google Drive share link.</li>
            <li>We optimize your model using gltfpack.</li>
            <li>Get a download link for your optimized model.</li>
          </ul>
        </div>
        <p className="text-gray-700 mt-6">
          Start optimizing your 3D models with just a few clicks!
        </p>
      </div>
    </div>
  );
}

export default Home;
