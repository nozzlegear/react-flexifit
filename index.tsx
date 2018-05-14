import * as React from "react";
import choke = require('lodash/throttle');
import { Component, Children, cloneElement } from 'react';

const isPositiveFinite = (num) => (num > 0) && Number.isFinite(num);

export interface IProps extends React.Props<any> {
	aspectRatio?: number;
	width?: number;
	height?: number;
	throttle?: number;
}

export interface IState {
	flexer?: any;
	ratio?: number;
	width?: number;
	height?: number;
}

export default class FlexiFrame extends Component<IProps, IState> {
	constructor(props: IProps, context) {
		super(props, context);

		const {aspectRatio, width, height, throttle = 100, children} = props;
		let flexer;

		try {
			flexer = Children.only(children);
		} catch (e) {
			const message = [
				"It looks as though you tried to include more than one child to Flexifit.",
				"Flexifit can only manage one non-responsive element at a time.",
				"Try wrapping additional non-responsive elements in their own Flexifit component.",
			];
			
			throw message.join(" ");
		}

		const { style, ...flexerProps } = flexer.props;
		this.throttledResize = choke(this.handleResize, throttle).bind(this);

		this.state = {
			ratio: aspectRatio || (isPositiveFinite(width / height) ? width / height : 1),
			flexer: cloneElement(flexer, {
				...flexerProps,
				key: 1,
				onLoad: this.throttledResize,
				style: {
					...(style || {}),
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					position: 'absolute'
				}
			}, [flexer.children]),
		};
	}

	throttledResize: () => void;

	flexWrapper: HTMLDivElement;

	componentDidMount() {
		window.addEventListener('resize', this.throttledResize);
		this.throttledResize();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.throttledResize);
	}

	handleResize() {
		const width = parseInt(window.getComputedStyle(this.flexWrapper).width) || 0;
		this.setState({ width });
	}

	render() {
		const { width, ratio } = this.state;
		const height = (width || 1) / ratio;
		const style: React.CSSProperties = {width: "100%", height: height + "px", position: "relative"};

		return (
			<div style={style} ref={(f) => this.flexWrapper = f}>
				{[this.state.flexer]}
			</div>
		);
	}
}
