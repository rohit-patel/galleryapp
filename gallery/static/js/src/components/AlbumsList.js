import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchAlbums} from '../actions';
import bindActionCreators from 'redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';


class AlbumsList extends Component{
  componentDidMount(){
    this.props.fetchAlbums();
  }
  renderAlbums(){
    if(this.props.albums){
      return _.map(this.props.albums, album =>{
        return (
          <li className="card col-sm-4 col-xs-12" key={album.id} >

            <div className="card-body">
              <h4 className="card-title">{album.name}</h4>
              <p className="card-text">{album.count_images} items</p>
              <Link to={"/album/" + album.slug} className="btn btn-primary">Go somewhere</Link>
            </div>
          </li>
        )
      })
    }
    
  }
  render(){
    
    return (
      <div>
        <h1 className="text-center">Albums</h1>
        <ul>
          {this.renderAlbums()}
        </ul>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    albums: state.albums
  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(fetchAlbums, dispatch)
    };
}

export default connect(mapStateToProps,{fetchAlbums})(AlbumsList);
