import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => navigate('/');
  const handleGoBack = () => {
    if (window.history.length > 2) window.history.back();
    else navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      
      {/* 404 Number with pulse animation */}
      <h1 className="text-9xl font-bold text-primary opacity-20 mb-6 animate-pulse">
        404
      </h1>

      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-onBackground mb-2">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-onBackground/70 mb-8">
        The page you're looking for doesn't exist. Let's get you back!
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleGoBack}
          className="px-6 py-2 bg-color-primary text-primary rounded hover:bg-primary transition border border-primary"
        >
          Go Back
        </button>
        <button
          onClick={handleGoHome}
          className="px-6 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
