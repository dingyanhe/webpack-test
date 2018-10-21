import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import './scroll.styl'

export default class Scroll extends React.Component {
    componentDidUpdate() {
        if (this.bScroll && this.props.refresh) {
            this.bScroll.refresh()
        }
    }
    componentDidMount() {
        this.scrollView = ReactDom.findDOMNode(this.refs.scrollView)
        if (!this.bScroll) {
            this.bScroll = new BScroll(this.scrollView, {
                probeType: 3,
                click: this.props.click
            })
            if (this.props.onScroll) {

                this.bScroll.on('scroll', scroll => {
                    this.props.onScroll(scroll)
                })
            }
        }
    }
    componentWillUnmount() {
        this.bScroll.off("scroll")
        this.bScroll = null
    }
    refresh() {
        if (this.bScroll) {
            this.bScroll.refresh()
        }
    }

    render() {
        return (
            <div className="scroll-view" ref="scrollView">
                {this.props.children}
            </div>
        )
    }
}

Scroll.defaultProps = {
    click: true,
    refresh: false,
    onScroll: null
}

Scroll.propTypes = {
    click: PropTypes.bool,
    refresh: PropTypes.bool,
    onScroll: PropTypes.func
}