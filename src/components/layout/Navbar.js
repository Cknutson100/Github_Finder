import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// This is the strucuture for functional based components:
const Navbar = ({icon, title}) => {

        return (
            <nav className='navbar bg-primary'>
                <h1>
                    <i className={icon}></i> {title}
                </h1>
                <ul>
                    <li>
                        {/* It's bad practice to use a-tags when you are working in React with React Router. You should use Link. */}
                        <Link to="/">Home</Link> 
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        )
}

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar


// THIS IS THE SAME STRUCTURE AS ABOVE BUT IN CLASS FORM:
//export class Navbar extends Component {
//     static defaultProps = {
//         title: 'Github Finder',
//         icon: 'fab fa-github'
//     }

//     static propTypes = {
//         title: PropTypes.string.isRequired,
//         icon: PropTypes.string.isRequired
//     }
//     render() {
//         return (
//             <nav className='navbar bg-primary'>
//                 <h1>
//                     <i className={this.props.icon}></i> {this.props.title}
//                 </h1>
//             </nav>
//         )
//     }
// }