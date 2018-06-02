import ImageGallery from 'react-image-gallery';



export default class Slider extends React.Component {

      handleImageLoad(event) {
        //console.log('Image loaded ', event.target)
      }

      render() {

        const images = [
          {
            original: '/static/images/runmageddon-slider/1.jpg',
            thumbnail: '/static/images/runmageddon-slider/1-mini.jpg',
          },
          {
            original: '/static/images/runmageddon-slider/2.jpg',
            thumbnail: '/static/images/runmageddon-slider/2-mini.jpg',
          },
          {
            original: '/static/images/runmageddon-slider/3.jpg',
            thumbnail: '/static/images/runmageddon-slider/3-mini.jpg',
          },
          {
            original: '/static/images/runmageddon-slider/4.jpg',
            thumbnail: '/static/images/runmageddon-slider/4-mini.jpg',
          },
          {
            original: '/static/images/runmageddon-slider/5.jpg',
            thumbnail: '/static/images/runmageddon-slider/5-mini.jpg',
          },
          {
            original: '/static/images/runmageddon-slider/6.jpg',
            thumbnail: '/static/images/runmageddon-slider/6-mini.jpg',
          },
          {
            original: '/static/images/runmageddon-slider/7.jpg',
            thumbnail: '/static/images/runmageddon-slider/7-mini.jpg',
          },
          {
            original: '/static/images/runmageddon-slider/8.jpg',
            thumbnail: '/static/images/runmageddon-slider/8-mini.jpg',
          },
          {
            original: '/static/images/runmageddon-slider/9.jpg',
            thumbnail: '/static/images/runmageddon-slider/9-mini.jpg',
          },
          {
            original: '/static/images/runmageddon-slider/16.jpg',
            thumbnail: '/static/images/runmageddon-slider/16-mini.jpg',
          },
          {
            original: '/static/images/runmageddon-slider/17.jpg',
            thumbnail: '/static/images/runmageddon-slider/17-mini.jpg',
          }
        ]

        return (
          <ImageGallery
            items={images}
            slideInterval={2000}
            showPlayButton={false}
            showFullscreenButton={false}
            onImageLoad={this.handleImageLoad}/>
        );
      }

    }
