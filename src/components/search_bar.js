import React, {Component} from 'react';

// const SearchBar = () => {
//     return <input/>;
// };

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {term: ''};
    }

    render() {
        //this is creating an event Handler onChange and passing it a function
        //this function is in es6 and drops the () around event because only
        //one argument is being passed in.
        return  (
            <div className="search-bar">
                {/*this is a controlled component because value was added meaning that
                the input value is controlled by state and value only changes when state changes*/}
                <input
                    value = {this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;