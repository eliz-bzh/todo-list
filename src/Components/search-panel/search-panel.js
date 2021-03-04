import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component{
    constructor(props){
        super(props);
        this.state = {search: ''};
    }

    onLabelSearch=(el)=>{
        const search = el.target.value;
        this.setState({search});
        this.props.onLabelSearch(search);
    };

    render(){
        return(
            <input type="text" className="form-control search-panel" placeholder='Search' value={this.state.search} onChange={this.onLabelSearch}/>
        )
    }
}