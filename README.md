# React Video Cover
A small React component rendering a `<video/>` with `object-fit: cover`, or a Fallback if object-fit is not available.

## Demo
[http://t-obi.github.io/react-video-cover](http://t-obi.github.io/react-video-cover)

## Installation
```shell
npm install --save react-video-cover
```

## Basic Usage
Okay, let's say you have a simple video tag like this
```html
<video src="http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4" />
```
Now you want to display this video so that it always fills some container, while keeping the correct aspect ratio. For this example the container will be 300px by 300px:
```js
  <div style={{
    width: '300px',
    height: '300px',
    overflow: 'hidden',
  }}>
    <video src="http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4" />
  </div>
```

We can use [object-fit: cover](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) to let the video fill the container:
```js
<div style={{
  width: '300px',
  height: '300px',
  overflow: 'hidden',
}}>
  <video
    style={{
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    }}
    src="http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
  />
</div>
```
The only problem with this: [object-fit is not implemented by IE and Edge](http://caniuse.com/#feat=object-fit).
If you do not have to support IE, I would suggest that you stop right here.
If you want to get the same effect in IE, simply replace the video tag with the react-video-cover component:
```js
<div style={{
  width: '300px',
  height: '300px',
  overflow: 'hidden',
}}>
  <VideoCover videoOptions={{src: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'}} />
</div>
```
react-video-cover will set width: 100% and height: 100% because I think these are sensible defaults. You can use the style prop to overwrite it.

Here is the complete example, which also allows you to play/pause by clicking the video:

```js
class MinimalCoverExample extends Component {
  render() {
    const videoOptions = {
      src: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4',
      ref: videoRef => {
        this.videoRef = videoRef;
      },
      onClick: () => {
        if (this.videoRef && this.videoRef.paused) {
          this.videoRef.play();
        } else if (this.videoRef) {
          this.videoRef.pause();
        }
      },
      title: 'click to play/pause',
    };
    return (
      <div style={{
        width: '300px',
        height: '300px',
        overflow: 'hidden',
      }}>
        <VideoCover
          videoOptions={videoOptions}
        />
      </div>
    );
  }
}
```
It is also available as Example 3 on the demo-page.


## Development
To start a webpack-dev-server with the examples:
```shell
npm start
```
Then open `http://localhost:3000/react-video-cover`

To build the examples:
```shell
npm run build-examples
```
You can find the results in `dist_examples`.

To build the Component as published to npm:
```shell
npm run build
```
You can find the results in `dist`.

## License
MIT
