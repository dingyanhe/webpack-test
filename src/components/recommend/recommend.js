
import React from 'react'
import Swiper from 'swiper'
import {getCarousel, getNewAlbum} from "@/api/recommend"
import * as AlbumModel from "@/model/album"
import {CODE_SUCCESS} from "@/api/config"

import Loading from '@/common/loading/loading'
import Scroll from '@/common/scroll/scroll'
import 'swiper/dist/css/swiper.css'
import './recommend.styl'

export default class Recommend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            sliderList: [],
            newAlbums: [],
            refreshScroll: false
        }
    }

    componentDidMount() {
        getCarousel().then(res => {
            console.log('请求接口', res)
            if (res.code === CODE_SUCCESS) {
                this.setState({
                    sliderList: res.data.slider
                }, () => {
                    if (!this.sliderSwiper) {
                        this.sliderSwiper = new Swiper(".slider-container", {
                            loop: true,
                            autoplay: 3000,
                            autoplayDisableOnInteraction: false,
                            pagination: '.swiper-pagination'
                        })
                    }
                })
            }
        })
        getNewAlbum().then(res => {
            console.log('获取最新专辑', res)
            if (res.code === CODE_SUCCESS) {
                let albumList = res.albumlib.data.list
                albumList.sort((a, b) => {
                    return new Date(b.public_time).getTime() - new Date(a.public_time).getTime()
                })
                this.setState({
                    loading: false,
                    newAlbums: albumList
                }, () => {
                    this.setState({
                        refreshScroll: true
                    })
                })
            }
        })
    }

    toLink(linkUrl) {
        return () => {
            window.location.href = linkUrl
        }
    }
    
    getAlbums() {
        return this.state.newAlbums.map(item => {
            //通过函数创建专辑对象
            let album = AlbumModel.createAlbumByList(item)
            return (
                <div className="album-wrapper" key={album.mId}>
                    <div className="left">
                        <img src={album.img} width="100%" height="100%" alt={album.name}/>
                    </div>
                    <div className="right">
                        <div className="album-name">
                            {album.name}
                        </div>
                        <div className="singer-name">
                            {album.singer}
                        </div>
                        <div className="public—time">
                            {album.publicTime}
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="music-recommend">
                <Scroll refresh={this.state.refreshScroll}>
                    <div>
                        <div className="slider-container">
                            <div className="swiper-wrapper">
                                {
                                    this.state.sliderList.map(slider => {
                                        return (
                                            <div className="swiper-slide" key={slider.id}>
                                                <a className="slider-nav" onClick={this.toLink(slider.linkUrl)} href="xx">
                                                    <img src={slider.picUrl} width="100%" height="100%" alt="推荐" />
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="swiper-pagination"></div>
                        <div className="album-container">
                            <h1 className="title">最新专辑</h1>
                            <div className="album-list">
                                {this.getAlbums()}
                            </div>
                        </div>
                    </div>
                </Scroll>
                <Loading title="正在加载..." show={this.state.loading} />
            </div>
        )
    }
}

