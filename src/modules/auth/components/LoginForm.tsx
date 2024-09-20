import React from 'react';
import { ILoginParams, ILoginValidation } from "../../../models/auth";
import { FormattedMessage} from 'react-intl';
import { validateLogin, validLogin } from '../utils';
import { ROUTES } from '../../../configs/routes';
import { useDispatch } from "react-redux";
import { replace } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { Alert } from '@mui/material';

interface Props {
    onLogin(values: ILoginParams): void;
    loading: boolean;
    errorMessage: string;
}

const LoginForm = (props: Props) => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const { onLogin, loading, errorMessage } = props;

    const [formValues, setFormValues] = React.useState<ILoginParams>({email: '', password: '', rememberMe: false});
    const [validate, setValidate] = React.useState<ILoginValidation>();

    const navRegister = () => {
        dispatch(replace(ROUTES.register));
    }

    const remMe = () => {
        setFormValues({...formValues, rememberMe: true});
    }

    const onSubmit = React.useCallback(() => {
        const validate = validateLogin(formValues);
        setValidate(validate);
        if (!validLogin(validate)) {
            return;
        }
        if (formValues.rememberMe){
            localStorage.setItem(formValues.email, formValues.password);
        }
        Cookies.set(ACCESS_TOKEN_KEY, "1", );
        onLogin(formValues);
        dispatch(replace(ROUTES.home));
    }, [dispatch, formValues, onLogin]);

    if (errorMessage !== "") {return(
    <Alert severity="error">{errorMessage}</Alert>);}

    if (Cookies.get(ACCESS_TOKEN_KEY))
    {
        dispatch(replace(ROUTES.home));
    }

    return (
        <form
        style = {{maxWidth: '560px', width: '100%'}}
        noValidate
        onSubmit={(e) => {e.preventDefault();}}
        className="row g-3 needs-validation">
            <div className="col-md-12">
                <label htmlFor="inputEmail" className="form-label">
                    <FormattedMessage id="email" />
                </label>
                <input type="text" className="form-control" id="inputEmail" value={formValues.email} onChange={(e) => setFormValues({ ...formValues, email: e.target.value})}/>

                {!!validate?.email && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.email} />
                    </small>
                )}
            </div>

            <div className="col-md-12">
                <label htmlFor="inputPassword" className="form-label">
                    <FormattedMessage id="password" />
                </label>
                <input type="password" className="form-control" id="inputPassword" value={formValues.password} onChange={(e) => setFormValues({ ...formValues, password: e.target.value})}/>
            </div>

            <div className="col-12">
                <div className="form-check" onClick={remMe}>
                    <input className="form-check-input" type="checkbox" id="invalidCheck" value="" />
                    <label className="form-check-label" htmlFor="invalidCheck">
                        <FormattedMessage id="rememberMe" />
                    </label>
                </div>
            </div>

            <div className="row justify-content-md-center" style={{margin: '16px 0'}}>
                <div className="col-md-auto">
                    <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={onSubmit}
                    disabled={loading}
                    style={{minWidth:'160px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    >
                        <FormattedMessage id="login" />
                    </button>

                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={navRegister}
                            style={{minWidth:'160px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            >
                            <FormattedMessage id="register" />
                        </button>

                </div>
            </div>
        </form>
    )
};

export default LoginForm;