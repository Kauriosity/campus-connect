import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
// Components
import CollegeCard from "./components/CollegeCard";
import AskMarksPage from "./pages/auth/AskMarksPage";

// Lazy loading for better performance
const HomePage = React.lazy(() => import("./pages/Homepage"));
const LoginPage = React.lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPasswordPage = React.lazy(() =>
  import("./pages/auth/ForgotPasswordPage")
);
const ResetPasswordPage = React.lazy(() =>
  import("./pages/auth/ResetPasswordPage")
);
const EmailVerificationPage = React.lazy(() =>
  import("./pages/auth/EmailVerificationPage")
);
const UserProfilePage = React.lazy(() =>
  import("./pages/profile/UserProfilePage")
);
const CollegeDetailsPage = React.lazy(() =>
  import("./pages/CollegeDetailsPage")
);
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="p-8 text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-800">
              Oops! Something went wrong.
            </h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const colleges = [
    {
      name: "St. Xavier's College",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1543505298-b8be9b52a21a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.6,
      reviews: 1523,
      studentCount: 5500
    },
    {
      name: "Presidency College",
      location: "Chennai",
      image: "https://images.unsplash.com/photo-1543505298-b8be9b52a21a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.3,
      reviews: 1380,
      studentCount: 6200
    },
    {
      name: "Loyola College",
      location: "Chennai",
      image: "https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.7,
      reviews: 1640,
      studentCount: 7200
    },
    {
      name: "Christ University",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.5,
      reviews: 2100,
      studentCount: 12000
    },
    {
      name: "Fergusson College",
      location: "Pune",
      image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.4,
      reviews: 975,
      studentCount: 4800
    },
    {
      name: "Banaras Hindu University",
      location: "Varanasi",
      image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4.8,
      reviews: 2890,
      studentCount: 30000
    }
  ];



  return (
    <ErrorBoundary>
      <Toaster position="top-right" />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/askmarks" element={<AskMarksPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/verify-email/:token"
            element={<EmailVerificationPage />}
          />

          {/* Protected Routes with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="college/:id" element={<CollegeDetailsPage />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">College Listings</h1>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college, index) => (
            <CollegeCard key={index} college={college} />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;