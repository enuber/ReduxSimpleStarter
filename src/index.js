import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyACqNzXlxpehiW2CI4ke-MfD434wFihoPo';



//Create a new component. This component should produce some HTML

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos : [],
            selectedVideo: null
        };
        //because this is in constructor, it happens when the component loads. It calls the videoSearch
        //function with the given term
        this.videoSearch('surfboards');

    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            //this is the same as { videos: videos } only works if key and variable is the same
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

//Take Components generated html and put it into the DOM
//<App /> is an instance of app rather than passing App itself which is a component class the
//< /> is a JSX tag around it
//ReactDOM takes the instance of what we are outputting as first param and, the location as the 2nd param.
ReactDOM.render(<App/>, document.querySelector('.container'));