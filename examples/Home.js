import React, { Component } from 'react';
import css from './styles.css';
import { IndexLink } from 'react-router';

class Home extends Component {

  render() {
    return (
      <div className={css.Home}>
        <h2>What is this? </h2>
        A small React component rendering a video with object-fit: cover, or a fallback if object-fit is not available.
        This is not a polyfill, it just creates a similar effect and it only works for videos.

        <h2> Why? </h2>
        There are existing object-fit polyfills:
        <ul>
          <li><a href="https://github.com/jonathantneal/fitie"> fitie </a> by Jonathan Neal </li>
          <li><a href="https://github.com/anselmh/object-fit"> object-fit </a> by Anselm Hanneman </li>
        </ul>
        You should check them out. In comparison this component gives you a lot of control and probably works better in the context of a React application.

        <h2>How does it work?</h2>
        You should have a look at the <a href="https://github.com/t-obi/react-video-cover/blob/master/README.md">readme</a> and the <IndexLink to="/resizable">examples</IndexLink>.
        I also encourage you to have a look at the code, it should be relatively easy to understand.
        <div>If you have any questions or spot an error I would be glad to help.</div>
      </div>
    );
  }
}

export default Home;
