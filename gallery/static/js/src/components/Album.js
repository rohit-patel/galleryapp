import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchAlbum} from '../actions';
import bindActionCreators from 'redux';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import ReactDOM from 'react-dom';
import _ from 'lodash';


function setVendor(element, property, value) {
  element.style["webkit" + property] = value;
  element.style["moz" + property] = value;
  element.style["ms" + property] = value;
  element.style["o" + property] = value;
  return element
}


class Album extends Component{
	constructor(props) {
	  super(props);
	  this.clickPhoto = this.clickPhoto.bind(this);
	  this.resizeImages = this.resizeImages.bind(this);
	  this.closeSlider = this.closeSlider.bind(this);
	  this.renderColumn = this.renderColumn.bind(this);
	  this.renderImage = this.renderImage.bind(this);
	  this.slider = {}
	  var w = window.innerWidth;
	  var h = window.innerHeight;
	  this.state = {
	  	window_height:h,
	  	window_width:w
	  }
	}
	
	componentDidMount(){
		const { slug } = this.props.match.params
	    this.props.fetchAlbum(slug);
	    var it = this;
	    
	      window.addEventListener("orientationchange", function() {
	      	it.render();
			it.resizeImages();
		  }, false);
		  window.addEventListener("resize", function() {
		  	it.render();
			it.resizeImages();
		  }, false);
	    
	}
	
	resizeImages(currentIndex=0){
		
		var w = window.innerWidth;
		var h = window.innerHeight;
		var s = document.querySelectorAll('.image-gallery-image img');
		var image_class = ''
		var device = ''
		if(w<760){
			device = 'mobile'
			if(w>h){
				image_class = 'hor'
			} else {
				image_class = 'ver'
			}

		}
		_.map(s,function(item) {
			if(device == 'mobile'){
				var style = {}
				if(item.naturalHeight < item.naturalWidth){
					if(w < h){
                        item.classList.add('rotate')
                        var i = setVendor(item,"transform-origin",(w/2)+"px 50%");
						console.log(i)
						var style = {
							maxHeight:  w+"px",
							maxWidth: h+"px",
							height: w+"px",
							width: h+"px",
							WebkitTransformOrigin:(w/2)+"px 50%",
							MozTransformOrigin:(w/2)+"px 50%",
							msTransformOrigin:(w/2)+"px 50%"
						}
                        //item.style.maxHeight =  w+"px";
						//item.style.maxWidth = h+"px";
						item.style.height =  w+"px";
						item.style.width = h+"px";


						console.log("offsetLeft ",item.offsetLeft)
						console.log("width ",w)
						console.log("height ",h)
						console.log(item)
					} else {
						item.classList.remove('rotate')
						item.style.maxHeight =  h+"px";
						item.style.maxWidth = w+"px";
						item.style.height =  h+"px";
						item.style.width = w+"px";
					}
					
				} else {
					item.style.maxHeight =  h+"px";
					item.style.maxWidth = w+"px";
					item.style.height =  h+"px";
					item.style.width = w+"px";

				}
			} else {
				item.style.maxHeight =  h+"px";
				item.style.maxWidth = w+"px";
				item.style.height =  h+"px";
				item.style.width = w+"px";

			}

		  	
		});
		var wrap = document.querySelectorAll('.image-gallery-image');
		_.map(wrap,function(item) {
			item.style.height =  h+"px";
			item.style.width = w+"px";
		});
		var center = document.querySelector('.image-gallery-slides .center');
		
		if(!center){
			setTimeout(function(){
				var center = document.querySelector('.image-gallery-slides .center');
				
				if(!center){
					setTimeout(function(){
						var center = document.querySelector('.image-gallery-slides .center');
						if(!center){
							
						} else {
							center.style.height =  h+"px";
							center.style.width = w+"px";
						}
						
					},300)

				} else {
					center.style.height =  h+"px";
					center.style.width = w+"px";
				}
				
			},300)
		} else {
			center.style.height =  h+"px";
			center.style.width = w+"px";
		}
		
		var slider = document.querySelector('#slider');
		if(slider){
			
			slider.style.maxHeight =  h+"px";
			slider.style.maxWidth = w+"px";
			slider.style.height =  h+"px";
			slider.style.width = w+"px";
		}
		
		var wraper = document.querySelector('.image-gallery-slide-wrapper');

		if(wraper){
			
			wraper.style.maxHeight =  h+"px";
			wraper.style.maxWidth = w+"px";
			wraper.style.height =  h+"px";
			wraper.style.width = w+"px";
		}
		
	}
	closeSlider(){
		var el = document.getElementById('slider');
		el.classList.remove("active");
		el.innerHTML = "";
	}
	
	clickPhoto(event){
		var w = window.innerWidth;
		var h = window.innerHeight;
		var image_index = event.target.getAttribute('data');
		var images = _.mapKeys(this.props.album.albums_photos,'id');
		
		var result_images = _.map(images,image =>{
			if(w>1280){
					
					var src = image.thumbs.big_xxl.url;
				} else if(w<=1280 && w>=1100){
					var src = image.thumbs.big_lg.url;
				} else if(w<=1100 && w>=1000){
					var src = image.thumbs.big_lg.url;
				} else if(w<=1000 && w>=800){
					var src = image.thumbs.big_md.url;
				} else if(w<=800){
					var src = image.thumbs.big_sm.url;
				}
			return {
				original: src,
            	thumbnail: image.thumbs.slider_thumb.url,
			}
		})
		var el = document.getElementById('slider');
		el.classList.add("active");
		el.style.maxHeight =  h+"px";
		el.style.maxWidth = w+"px";
		
		ReactDOM.render(
			<div>
				<div onClick={this.closeSlider} className="close-slider"></div>
				<ImageGallery
				ref={i => this.slide = i}
	            items={result_images}
	            showThumbnails={w < 767 ? false : true}
	            slideInterval={2000}
	            infinite={true}
	            showNav={w < 767 ? false : true}
	            startIndex={parseInt(image_index)}
	            showPlayButton={false}
	            onClick={this.closeSlider}
	            useBrowserFullscreen={true}
	            onImageLoad={this.resizeImages}
	            onSlide={this.resizeImages}
	            onScreenChange={this.resizeImages}
	            showFullscreenButton={w < 767 ? false : true}
	            />
            </div>,
			document.getElementById('slider'));
		var it = this;

	    setTimeout(function(){
	    	var s = document.querySelector('.image-gallery-slide-wrapper');
	    	s.style.maxHeight =  h+"px";
			s.style.maxWidth = w+"px";
			it.resizeImages();
			if(w < 1025){
				it.slide.fullScreen()
			}
			
	    },500)
	    setTimeout(function(){
			it.resizeImages();
			var el = document.getElementById('slider');

	    },1000)
	    setTimeout(function(){
			it.resizeImages;
	    },1500)

	}
	renderImage(items){
		var it = this
		var images = []
		var w = window.innerWidth;
		return items.map(function(photo,index) {
			if(w>1280){	
				var src = photo.thumbs.thumb_xxl.url;
				images[index] = new Image();
				images[index].src = photo.thumbs.big_xxl.url;
				images[index].onload = function(){console.log("upload1")}
			} else if(w<=1280 && w>=1100){
				var src = photo.thumbs.thumb_lg.url;
				images[index] = new Image();
				images[index].src = photo.thumbs.big_lg.url;
				images[index].onload = function(){console.log("upload1")}
			} else if(w<=1100 && w>=1000){
				var src = photo.thumbs.thumb_lg.url;
				images[index] = new Image();
				images[index].src = photo.thumbs.big_lg.url;
				images[index].onload = function(){console.log("upload1")}
			} else if(w<=1000 && w>=800){
				var src = photo.thumbs.thumb_lg.url;
				images[index] = new Image();
				images[index].src = photo.thumbs.big_lg.url;
				images[index].onload = function(){console.log("upload1")}
			} else if(w<=800){
				var src = photo.thumbs.thumb_lg.url;
				images[index] = new Image();
				images[index].src = photo.thumbs.big_lg.url;
				images[index].onload = function(){console.log("upload1")}
			}
			return (
				<div className=" gallery-item " key={index}>
					<img onClick={it.clickPhoto}  data={index} className="gallery-image" src={src}/>
				</div>
				)
		})
	}
	renderColumn(items,index){
		
		return (
			<div className="column" key={index}>
				{this.renderImage(items)}
			</div>
		)
	}
	
	renderPhoto(){
		let w = window.innerWidth;
		window.images = []
		var count_column = 0
		
		
		var result = ""
		if(this.props.album != undefined){
			if(Object.keys(this.props.album).length > 0){
				if(w >= 992){
					count_column = Math.ceil(this.props.album.albums_photos.length /4)
				} else if (w < 992 && w > 767){
					count_column = Math.ceil(this.props.album.albums_photos.length /3)
				} else {
					count_column = Math.ceil(this.props.album.albums_photos.length /2)
				}
				console.log(count_column)
				var chunk_column = _.chunk(this.props.album.albums_photos, count_column)
				if(chunk_column.length > 0){
					return chunk_column.map((items,index) => {
						return this.renderColumn(items,index)
					})
				}
			}
		}
	}
	render(){
		
		return(
			<div className="grid">
				{this.renderPhoto()}
			</div>
			)
	}
}

function mapStateToProps (state) {
  
  return {
    album: state.albums.album
  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(fetchAlbum, dispatch)
    };
}

export default connect(mapStateToProps,{fetchAlbum})(Album);