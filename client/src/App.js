import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

// Component
import Navbar from './Component/layout/navbar';
import Footer from './Component/layout/footer';
import Landing from './Component/layout/landing';
import Alert from './Component/layout/alert';
import Register from './Component/auth/register';
import Login from './Component/auth/login';
import Dashboard from './Component/dashboard/dashboard';
import PrivateRoute from './Component/routing/PrivateRoute';
import CreateProfile from './Component/profile-form/CreateProfile';
import EditProfile from './Component/profile-form/EditProfile';
import AddExperience from './Component/profile-form/AddExperience';
import AddEducation from './Component/profile-form/AddEducation';
import Profiles from "./Component/profiles/Profiles";
import Profile from './Component/profile/Profile';
import Posts from './Component/posts/Posts';

// Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from "./actions/auth";
import {setAuthToken} from "./utils/setAuthToken";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);


    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar/>
                    <Route exact path='/' component={Landing}/>
                    <section className="container">
                        <Alert/>
                        <Switch>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/profiles' component={Profiles}/>
                            <Route exact path='/profile' component={Profile}/>
                            <PrivateRoute exact path='/dashboard' component={Dashboard} />
                            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                            <PrivateRoute exact path='/add-experience' component={AddExperience} />
                            <PrivateRoute exact path='/add-education' component={AddEducation} />
                            <PrivateRoute exact path='/posts' component={Posts} />
                        </Switch>
                    </section>
                    <Footer/>
                </Fragment>
            </Router>
        </Provider>
    )
};

export default App;
