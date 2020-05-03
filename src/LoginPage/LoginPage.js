import React from 'react';
//import { Formik, Field, Form, ErrorMessage } from 'formik';
//import * as Yup from 'yup';

import { authenticationService } from "../services/authenticationService";
//import { userService} from "../services/userService";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        //const { dispatch } = this.props;
        if (username && password) {
            authenticationService.login(username, password);
            //dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        //const { loggingIn } = true;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>

                    </div>
                </form>
            </div>
        );

        // (
        //     <div>
        //         <div className="alert alert-info">
        //             Username: test<br />
        //             Password: test
        //         </div>
        //         <h2>Login</h2>
        //         <Formik
        //             initialValues={{
        //                 username: '',
        //                 password: ''
        //             }}
        //             validationSchema={Yup.object().shape({
        //                 username: Yup.string().required('Username is required'),
        //                 password: Yup.string().required('Password is required')
        //             })}
        //             onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
        //                 setStatus();
        //                 authenticationService.login(username, password)
        //                     .then(
        //                         user => {
        //                             const { from } = this.props.location.state || { from: { pathname: "/" } };
        //                             this.props.history.push(from);
        //                         },
        //                         error => {
        //                             setSubmitting(false);
        //                             setStatus(error);
        //                         }
        //                     );
        //             }}
        //             render={({ errors, status, touched, isSubmitting }) => (
        //                 <Form>
        //                     <div className="form-group">
        //                         <label htmlFor="username">Username</label>
        //                         <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
        //                         <ErrorMessage name="username" component="div" className="invalid-feedback" />
        //                     </div>
        //                     <div className="form-group">
        //                         <label htmlFor="password">Password</label>
        //                         <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
        //                         <ErrorMessage name="password" component="div" className="invalid-feedback" />
        //                     </div>
        //                     <div className="form-group">
        //                         <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
        //                         {isSubmitting &&
        //                         <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        //                         }
        //                     </div>
        //                     {status &&
        //                     <div className={'alert alert-danger'}>{status}</div>
        //                     }
        //                 </Form>
        //             )}
        //         />
        //     </div>
        // )
    }
}

export { LoginPage };
