# React Video Cover
A small React component rendering a `<video/>` with `object-fit: cover`, or a Fallback if object-fit is not available.

## Demo
[http://tkloht.github.io/react-video-cover](http://tkloht.github.io/react-video-cover)

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

## Props

### videoOptions
**type:** Object  
**default:** `undefined`  
All members of videoOptions will be passed as props to the <video/>.

### style
**type:** Object  
**default:**  `undefined`  

Additional styles which will be merged with those defined by this component.
Please note that some styles are not possible to override, in particular:
  - object-fit: cover (when the fallback is not used)
  - position: relative and overflow: hidden (when the fallback is used)

### className
**type:** String  
**default:**  `undefined`  
Use this to set a custom className.

### forceFallback
**type:** Boolean  
**default:**  `false`  
This component will use object-fit: cover if available, that is in all modern browsers except IE.
This prop forces use of the fallback. This is helpful during troubleshooting,
but apart from that you should not use it.
 
### remeasureOnWindowResize
**type:** Boolean  
**default:**  `false`  
If set, an event listener on window-resize is added when the Fallback is used.
It will re-evaluate the aspect-ratio and update the styles if necessary.
This has no effect if the fallback is not used.
The classic example where it makes sense to use this is when using a background video.
If you need to react to different events to re-measure the aspect-ratio please see the onFallbackDidMount prop.

### onFallbackDidMount
**type:** Function  
**default:**  `undefined`  
Will be executed when the Fallback is mounted.
The only parameter is a function, which can be used to force a re-measuring, for example after the size of the surrounding container has changed.
Please note that this will only be invoked if the fallback is used, that is in IE.
See ResizableCoverExample for an example implementation.
 
### onFallbackWillUnmount
**type:** Function  
**default:**  `undefined`  
Will be executed before the Fallback unmounts.
You probably want to use this to clear any event-listeners added in onFallbackDidMount.


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

## Contact
Find me on [Twitter](https://twitter.com/tkloht) or write me an [email](mailto:tobias.kloht@gmail.com).
Of course you can also use Github issues or open a pull request.

Honestly, it would be really great to know if anyone actually uses my little component. I'm also happy to help if you run into any problems.

## License
MIT
