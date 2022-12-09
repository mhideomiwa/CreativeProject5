import {Link, redirect} from "react-router-dom";
import axios from 'axios';
import '../App.css';
import {Component} from "react";
import {Routes, Route} from 'react-router-dom'
import PortalLogin from './PortalLogin'
import Portalnavbar from "./Portalnavbar";


class Portal extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            username: null,
            redirect: false
        }

        // this.logout = this.logout.bind(this)

        this.getUser = this.getUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }

    // logout(event) {
    //     event.preventDefault()
    //     console.log('logging out')
    //     axios.post('/user/logout').then(response => {
    //         console.log(response.data)
    //         if (response.status === 200) {
    //             this.props.updateUser({
    //                 loggedIn: false,
    //                 username: null
    //             })
    //             this.updateUser()
    //         }
    //     }).catch(error => {
    //         console.log('Logout error')
    //     })
    // }

    componentDidMount() {
        this.getUser()
    }

    updateUser (userObject) {
        this.setState(userObject)
    }

    getUser() {
        axios.get('/user/').then(response => {
            console.log('Get user response: ')
            console.log(response.data)
            if (response.data.user) {
                console.log('Get User: There is a user saved in the server session: ')

                this.setState({
                    loggedIn: true,
                    username: response.data.user.username
                })
            } else {
                console.log('Get user: no user');
                this.setState({
                    loggedIn: false,
                    username: null
                })
            }
        })
    }

    render() {
        // const loggedIn = this.props.loggedIn;
        // console.log('navbar render, props: ')
        console.log(this.props);

        if(this.state.loggedIn === false) {
            return (<PortalLogin updateUser={this.updateUser} loggedIn={this.state.loggedIn} />)
        }


        return (
            <>
                <Portalnavbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
                <div class="content">


                    <iframe src={'https://docs.google.com/spreadsheets/d/1eAe0ZSb5x_6MOXQ7dhUjALekDz18HTJcZQ5W2V3npYY/edit#gid=0'} width={800} height={600} />


                </div>
            </>
        );
    }
}

export default Portal;