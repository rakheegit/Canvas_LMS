import React, {Component} from 'react';
//import Search from './Search'


export default class Template extends Component {
    render(){
        console.log("this.props.targetId: " + this.props.targetId )
        return (
            <div> Helloooo
            {this.props.targetId}
                    </div>
            )
        }
    }