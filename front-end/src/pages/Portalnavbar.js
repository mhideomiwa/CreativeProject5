import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import logo from './images/cropped-Unified-Languages-Logo-92x92.png';
import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <div>
                    <div >
                        {loggedIn ? (
                            <section className="portalnavbar">
                                <Link className="navbar-brand styles.navbar-brand" to={"/"}><img src={logo} className="portal-nav-lgoo" alt={'Logo'} width={10} height={10}/></Link>
                                <Link to='/Home' class='portalnav-item'>Home</Link>
                                <Link to='/Portalrole'class='portalnav-item'>Attendance</Link>
                                <button class="button" onClick={this.logout}>
                                logout
                                </button>

                            </section>
                        ) : (
                            <>You shouldn't be able to see this</>
                            )}
                    </div>
            </div>

        );

    }
}

export default Navbar