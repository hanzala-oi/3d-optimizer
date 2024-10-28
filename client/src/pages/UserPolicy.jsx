export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-200 py-12 px-6 sm:px-10 lg:px-32 font-poppins text-gray-900">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center border-b-2 border-gray-300 pb-4">
          Privacy Policy
        </h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to the privacy policy page for the 3D Optimizer Tool ("the
            Tool"). We respect your privacy and are committed to protecting the
            personal information you share with us. This policy outlines how we
            collect, use, and safeguard your data.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Information We Collect
          </h2>
          <ul className="list-decimal pl-6 text-gray-700 leading-relaxed space-y-2">
            <li>
              Google Drive Links: Used to access your GLB 3D model files for
              optimization purposes only.
            </li>
            <li>
              Optimized Files: Temporarily stored on secure Azure Blob Storage
              to generate a downloadable link.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The information provided is used exclusively for:
          </p>
          <ul className="list-decimal pl-6 text-gray-700 leading-relaxed space-y-2">
            <li>
              File Access and Optimization: Accessing and optimizing the GLB 3D
              model using gltfpack technology.
            </li>
            <li>
              Providing Download Links: Sharing a downloadable link for the
              optimized model.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Data Retention and Storage
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Files are temporarily stored on secure Azure Blob Storage and
            deleted automatically after a specified period or once the download
            link has expired. We do not retain any files long-term.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Information Sharing
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We do not share your data with third-party services, advertisers, or
            partners. Files are solely used for optimization and are not
            accessible to external parties.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Security Measures
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement data encryption, access controls, and regular audits to
            protect your data while using the Tool.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            7. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update our privacy policy periodically. Please review this
            page regularly to stay informed about how we handle your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            8. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions or concerns about this privacy policy, please
            contact us at:
          </p>
          <p className="text-gray-700 font-medium mt-2 flex ">
            Email: <p className="font-bold ml-3"> contact@vortexstudio.in</p>
          </p>
        </section>
      </div>
    </div>
  );
}
