import React from "react";
import { ILocationParams, IRegisterParams, IRegisterValidation } from "../../../models/auth";
import { FormattedMessage } from "react-intl";
import { validateRegister, validRegister } from '../utils';

interface Props {
    onRegister(values: IRegisterParams): void;
    loading: boolean;
    errorMessage: string;
    locations: Array<ILocationParams>;
}

const RegisterForm = (props: Props) => {
    const {onRegister, loading, errorMessage, locations} = props;
    const [formValues, setFormValues] =  React.useState<IRegisterParams>({email: '', password: '', confirmPassword: '', name: '', gender: '', region: '', state: ''});
    const [validate, setValidate] = React.useState<IRegisterValidation>();

    const onSubmit = React.useCallback (() => {
        const validate = validateRegister(formValues);
        setValidate(validate);
        if (!validRegister(validate)){ return;}
        onRegister(formValues);
    }, [formValues, onRegister]);
    const renderGender = () => {
    };
    const renderRegion = () => {};
    const renderState = () => {};

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

            <div className="col-md-12">
                <label htmlFor="inputConfirmPassword" className="form-label">
                    <FormattedMessage id="confirmPassword" />
                </label>
                <input type="password" className="form-control" id="confirmPassword" value={formValues.confirmPassword} onChange={(e) => setFormValues ({ ...formValues, confirmPassword: e.target.value})}/>
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
                <select className="form-control" id="selectRegion" value={formValues.region} onChange={(e) => setFormValues({ ...formValues, region: e.target.value})}>
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
                    {renderState()}
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

/*
    import { useCallback, useState } from "react";
    import { IRegisterParams, IRegisterValidation, ILocationParams, ICapitalParams } from "../../../models/auth";
    import { validateRegister, validRegister } from "../utils";
    import { Box, TextField, Alert, Button, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, InputLabel, Select, MenuItem } from "@mui/material"
    import { LoadingButton } from "@mui/lab"
    import { FormattedMessage } from "react-intl"
    import { setStatusBarMessage } from '../../../../../Visual Studio Code.app/Contents/Resources/app/out/vscode-dts/vscode.d';

    interface Props {
        onRegister(values: IRegisterParams): void;
        loading: boolean;
        errorMessage: string;
        locations: Array<ILocationParams>;
        capitals: Array<ICapitalParams>;
        getCapitals: (pid: number) => Promise<void>;
    }
    const RegisterForm = (props: Props) => {
        const { onRegister, loading, errorMessage, locations, capitals, getCapitals } = props;
        const [formValues, setFormValues] = useState<IRegisterParams>({ email: "", password: "", confirmPassword: "", name: "", gender: "male", region: "", state: "" })
        const [validate, setValidate] = useState<IRegisterValidation>()
        const submit = useCallback((e) => {
            e.preventDefault();
            const validate = validateRegister(formValues);
            setValidate(validate);
    
            if (!validRegister(validate)) {
                return;
            }
            onRegister(formValues)
        }, [formValues, onRegister])
        return (
            <Box component="form" width={1} maxWidth={"600px"} p={3} autoComplete="off" sx={{ display: "flex", flexDirection: "column", '& .MuiTextField-root': { width: '100%', pb: 2 }, '& .MuiFormControl-root': { pb: 2 }, "& .MuiAlert-root": { mb: 2 } }} noValidate onSubmit={submit}>
                <TextField
                    required
                    label={!!validate?.email ? <FormattedMessage id={validate.email} /> : <FormattedMessage id="email" />}
                    type="email"
                    error={!!validate?.email}
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                />
                <TextField
                    required
                    label={!!validate?.name ? <FormattedMessage id={validate.name} /> : <FormattedMessage id="name" />}
                    type="text"
                    error={!!validate?.name}
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                />
                <TextField
                    required
                    label={!!validate?.password ? <FormattedMessage id={validate.password} /> : <FormattedMessage id="password" />}
                    type="password"
                    error={!!validate?.password}
                    value={formValues.password}
                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                />  <TextField
                    required
                    label={!!validate?.confirmPassword ? <FormattedMessage id={validate.confirmPassword} /> : <FormattedMessage id="repeatPassword" />}
                    type="password"
                    error={!!validate?.confirmPassword}
                    value={formValues.confirmPassword}
                    onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
                />
                <FormControl fullWidth >
                    <FormLabel><FormattedMessage id="gender" /></FormLabel>
                    <RadioGroup
                        row
                        value={formValues.gender}
                        onChange={(e) => setFormValues({ ...formValues, gender: formValues.gender === "male" ? "female" : "male" })}
                    >
                        <FormControlLabel value="male" checked={formValues.gender === "male"} control={<Radio />} label={<FormattedMessage id="male" />} />
                        <FormControlLabel value="female" control={<Radio />} label={<FormattedMessage id="female" />} />
                    </RadioGroup>
                </FormControl>
                <FormControl fullWidth error={!!validate?.region}><InputLabel>{!!validate?.region ? <FormattedMessage id={validate.region} /> : <FormattedMessage id="region" />}</InputLabel>
                    <Select
                        value={formValues.region}
                        label={!!validate?.state ? <FormattedMessage id={validate.region} /> : <FormattedMessage id="region" />}
                        onChange={async (e) => {
                            setFormValues({ ...formValues, region: e.target.value, state: "" })
                            await getCapitals(+e.target.value)
                        }}>
                        {locations.map(item => <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                </FormControl>
                {capitals.length > 0 && <FormControl fullWidth error={!!validate?.state}><InputLabel>{!!validate?.state ? <FormattedMessage id={validate.state} /> : <FormattedMessage id="state" />}</InputLabel>
                    <Select
    
                        value={formValues.state}
                        label={!!validate?.state ? <FormattedMessage id={validate.state} /> : <FormattedMessage id="state" />}
                        onChange={(e) => {
                            setFormValues({ ...formValues, state: e.target.value })
                        }}>
                        {capitals.map(item => <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                </FormControl>}
                {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}
                <Box width={1} display="flex" justifyContent="space-between" alignItems="center">
                    <LoadingButton variant="outlined" size="large" type="submit" loading={loading}><FormattedMessage id="register" /></LoadingButton>
                    <Button variant="text" href="/login"><FormattedMessage id="alreadyhaveanaccount" /></Button>
                </Box>
            </Box>)
    }
    export default RegisterForm
    */