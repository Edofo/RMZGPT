import { Suspense, lazy } from "react";

import LoadingPage from "./components/design/LoadingPage";

const HomePage = lazy(() => import("@pages/Home"));
import ToastContainer from "./components/ToastContainer";

const App = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-900">
      <Suspense fallback={<LoadingPage />}>
        <HomePage />
      </Suspense>
      <ToastContainer />
    </div>
  );
};

export default App;
