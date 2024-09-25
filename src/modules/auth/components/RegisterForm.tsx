import React from "react";
import { ILocationParams, IRegisterParams, IRegisterValidation } from "../../../models/auth";
import { FormattedMessage } from "react-intl";
import { validateRegister, validRegister } from '../utils';
import { replace } from "connected-react-router";
import { ROUTES } from "../../../configs/routes";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { Action } from "redux";
import { Alert } from "@mui/material";

interface Props {
    onRegister(values: IRegisterParams): void;
    loading: boolean;
    errorMessage: string;
    locations: Array<ILocationParams>;
}

const RegisterForm = (props: Props) => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const {onRegister, loading, errorMessage} = props;
    const [formValues, setFormValues] =  React.useState<IRegisterParams>({email: '', password: '', confirmPassword: '', name: '', gender: '', region: '', state: ''});
    const [validate, setValidate] = React.useState<IRegisterValidation>();
    const [selectOption, setSelectOption] = React.useState("");

    const onSubmit = React.useCallback (() => {
        const validate = validateRegister(formValues); // Ham luu valid session
        setValidate(validate);
        if (!validRegister(validate)){return;} // Ham check valid
        onRegister(formValues);
        const registerData = JSON.stringify([formValues.email, formValues.password, formValues.name, formValues.gender, formValues.region, formValues.state]);
        localStorage.setItem("registerData", registerData);
        dispatch(replace(ROUTES.login));
    }, [dispatch, formValues, onRegister]);

    if (errorMessage !== "") {return(
        <Alert severity="error">{errorMessage}</Alert>);}

    const renderGender = () => {
        return (
            <>
                <option value="">--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </>);
    };

    const renderRegion = () => {
        return (
            <>    
                <option value="">--</option>
                <option value="North">North</option>
                <option value="South">South</option>
            </>
        )
    };

    const renderState = (selectOption: string) => {
        if (selectOption === "North") return (
            <>
                <option value="">--</option>
                <option value="Virginia">Virginia</option>    
                <option value="South Dakota">South Dakota</option>
            </>
            )
        else return (
            <>
                <option value="">--</option>
                <option value="Texas">Texas</option>
            </>
        )
    };

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
                {!!validate?.password && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.password} />
                    </small>
                )}
            </div>

            <div className="col-md-12">
                <label htmlFor="inputConfirmPassword" className="form-label">
                    <FormattedMessage id="confirmPassword" />
                </label>
                <input type="password" className="form-control" id="confirmPassword" value={formValues.confirmPassword} onChange={(e) => setFormValues ({ ...formValues, confirmPassword: e.target.value})}/>

                {!!validate?.confirmPassword && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.confirmPassword} />
                    </small>
                )}
            </div>

            <div className="col-md-12">
                <label htmlFor="inputName" className="form-label">
                    <FormattedMessage id="name" />
                </label>
                <input type="text" className="form-control" id="inputName" value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value})}/>
            
                {!!validate?.name && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.name} />
                    </small>
                )}
            </div>

            <div className="col-md-12">
                <label htmlFor="selectGender" className="form-label">
                    <FormattedMessage id="gender" />
                </label>
                <select className="form-control" id="selectGender" value={formValues.gender} onChange={(e) => setFormValues({ ...formValues, gender: e.target.value})}>
                    {renderGender()}
                </select>
            
                {!!validate?.gender && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.gender} />
                    </small>
                )}
            </div>

            <div className="col-md-12">
                <label htmlFor="selectRegion" className="form-label">
                    <FormattedMessage id="region" />
                </label>
                <select className="form-control" id="selectRegion" value={formValues.region} onChange={(e) => { setSelectOption(e.target.value); setFormValues({ ...formValues, region: e.target.value})}}>
                    {renderRegion()}
                </select>
            
                {!!validate?.region && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.region} />
                    </small>
                )}
            </div>

            <div className="col-md-12">
                <label htmlFor="selectState" className="form-label">
                    <FormattedMessage id="state" />
                </label>
                <select className="form-control" id="selectState" value={formValues.state} onChange={(e) => setFormValues({ ...formValues, state: e.target.value})}>
                    {renderState(selectOption)}
                </select>
            
                {!!validate?.state && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.state} />
                    </small>
                )}
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
                        {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status"/>}
                        <FormattedMessage id="register" />
                    </button>
                </div>
            </div>
        </form>
    );
}

export default RegisterForm;

