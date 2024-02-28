import { Auth, MainPage, ResultPage } from "@pages";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    ResultError,
    ResultErrorChangePassword,
    ResultErrorCheckMail,
    ResultErrorCheckMailNotExist,
    ResultErrorLogin,
    ResultSuccessRegistration,
    ResultUserExist,
} from "@pages/result-page/components";
import { AuthChangePassword, AuthConfirmEMail, AuthLogin, AuthRegistration } from "@pages/auth/components";
import { PATHS } from "../config/constants";
import { ResultSuccessChangePassword } from "@pages/result-page/components/result-success-change-password/result-success-change-password";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const temporaryToken = sessionStorage.getItem('sessionToken');

    if (!token && !temporaryToken) {
        return <Navigate to={"/auth"} replace state={{ from: location }} />;
    }

    return children;
};

const ResultRoute = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const { status } = useSelector((state: any) => state.authSlice);

    switch (status) {
        case 'succeeded':
            return children;
        case 'failed':
            return children;
        default:
            return <Navigate to={"/auth"} replace state={{ from: location }} />;
    }
}

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const { accessToken } = useSelector((state: any) => state.authSlice);
    const token = localStorage.getItem('token');

    if (token || accessToken) {
        return <Navigate to={"/main"} replace state={{ from: location }} />;
    }

    return children;
}

export const routes = (
    <Routes>
        <Route path={PATHS.MAIN_PAGE} element={<ProtectedRoute><MainPage /></ProtectedRoute>} />

        <Route path={PATHS.AUTH} element={<PublicRoute><Auth /></PublicRoute>}>
            <Route index element={<AuthLogin />} />
            <Route path='registration' element={<AuthRegistration />} />
            <Route path='confirm-email' element={<AuthConfirmEMail />} />
            <Route path='change-password' element={<AuthChangePassword />} />
        </Route>

        <Route path={PATHS.RESULT} element={<ResultRoute><ResultPage /></ResultRoute>}>
            <Route path='success' element={<ResultSuccessRegistration />} />
            <Route path='success-change-password' element={<ResultSuccessChangePassword />} />
            <Route path='error' element={<ResultError />} />
            <Route path='error-user-exist' element={<ResultUserExist />} />
            <Route path='error-login' element={<ResultErrorLogin />} />
            <Route path='error-check-email' element={<ResultErrorCheckMail />} />
            <Route path='error-check-email-no-exist' element={<ResultErrorCheckMailNotExist />} />
            <Route path='error-change-password ' element={<ResultErrorChangePassword />} />
        </Route>
        <Route path='*' element={<Navigate to={PATHS.AUTH} replace />} />
    </Routes>
);
