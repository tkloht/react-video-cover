import { Component } from "react";
import { Props } from "./index";
declare type State = {
    innerRatio: number;
    outerRatio: number;
};
export default class VideoCoverFallback extends Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    componentWillUnmount(): void;
    updateContainerRatio(): void;
    updateVideoRatio(width: number, height: number): void;
    initEventListeners(): void;
    removeEventListeners(): void;
    private containerRef;
    /**
     * We can get the width and height of a video after it has started loading.
     * Then we can compare the aspect ratio of the video to that of it's surrounding container.
     * That is all we need to determine if the video fills the container vertically or horizontally.
     * In the other dimension we just have to maintain the original aspect-ratio.
     */
    render(): JSX.Element;
}
export {};
