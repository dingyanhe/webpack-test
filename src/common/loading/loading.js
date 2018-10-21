import React from 'react'
import loadingItem from '@/assets/images/loading.gif'
import'./loading.styl'

export default class Loading extends React.Component {

     render() {
         const displayStyle = this.props.show ? { display: '' } : { display: 'none' }
         return (
            <div className="loding-container" style={displayStyle}>
                <div className="loading-wrapper">
                    <img src={loadingItem} width="18px" height="18px" alt="loading" />
                    <div className="loading-title">{this.props.title}</div>
                </div>
            </div>
         )
     }
}