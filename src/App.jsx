import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import GlobalLoader from "./components/Loader/GlobalLoader";
// import Header from "./components/Header/Header";
const Header = React.lazy(() => import("./components/Header/Header"));
const ServicesPage = React.lazy(() => import("./Web/ServicesPage"));
const ContactPage = React.lazy(() => import("./Web/ContactPage"));
const WorkPage = React.lazy(() => import("./Web/WorkPage"));
const ResumePage = React.lazy(() => import("./Web/ResumePage"));
const HomePage = React.lazy(() => import("./Web/HomePage"));

export default function App() {
    return <Suspense fallback={<GlobalLoader isVisible={true} message="Welcome to My Portfolio" />}>
        <Routes>

            <Route element={<Header />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/work" element={<WorkPage />} />
            </Route>
        </Routes>
    </Suspense >
}
