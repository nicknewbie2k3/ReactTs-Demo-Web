import { useCallback, useState } from "react"
import React from "react";
import { Grid } from "@mui/material";
import { ILoginParams } from "../../../models/auth";
import { blue } from "@mui/material/colors";
import { RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode";
import { API_PATHS } from "../../../configs/api";
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { setUserInfo } from "../redux/authReducer";
import { replace } from "connected-react-router";
import { ROUTES } from "../../../configs/routes";
import { getErrorMessageResponse } from "../../../utils";
import LoginForm from "../components/LoginForm"
import { fetchThunk } from "../../common/redux/thunk";

const LoginPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const onLogin = React.useCallback(async (values: ILoginParams) => {
        setErrorMessage('');
        setLoading(true);

        const json = await dispatch(
            fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password}),
        );

        setLoading(false);

        if (json?.code ===RESPONSE_STATUS_SUCCESS) {
            dispatch(setUserInfo(json.data));

            Cookies.set(ACCESS_TOKEN_KEY, json.data.token, {expires: values.rememberMe ? 7 : undefined});
            dispatch(replace(ROUTES.home));
            return;
        }
        setErrorMessage(getErrorMessageResponse(json));
    }, [dispatch], );

    return (<div className="container" style={{}}>
    <img src={'.../logo.svg'} alt="" style={{maxWidth: '250px', margin: '32px'}} />
    <LoginForm onLogin={onLogin} loading={false} errorMessage={''} />
    </div>
    )
}
export default LoginPage;