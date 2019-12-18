/*
头部组件
 */
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'
import {connect} from 'react-redux'

import './index.less'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api/index'
import menuList from "../../config/menuConfig";
import LinkButton from "../link-button/linkButton";
import {logout} from '../../redux/actions'

class Header extends Component{
    state={
        currentTime:formateDate(Date.now()),
        temperature:'',
        weather:''
    }

    logout=()=>{
        Modal.confirm({
            title:'确定退出吗?',
            content:'退出登录',
            onOk:()=>{
                this.props.logout()
            },
            okText:'确定',
            cancelText:'取消'
        })
    }
    getWeather=async ()=>{
        const {temperature,weather}= await reqWeather('成都')
        this.setState({
         temperature,weather
        })
    }
    getTitle=()=>{
        const path=this.props.location.pathname
        let title=''
        menuList.forEach((item)=>{
            if(item.key===path){
                title=item.title
            }else if(item.children){
               const citem= item.children.find((citem)=>path.indexOf(citem.key)===0)
                if(citem){
                    title=citem.title
                }
            }
        })
        return title
    }
    componentDidMount() {
        this.intervalId=setInterval(()=>{
            this.setState({
                currentTime:formateDate(Date.now())
            })
        },1000)
        //this.getWeather()
    }
    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render(){
        const {currentTime,temperature,weather}=this.state
        const {username}=this.props.user
        const title=this.props.headTitle
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎, {username}</span>
                    <LinkButton  onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <span>{temperature}</span>
                        <span>{weather}&nbsp;&nbsp;&nbsp;成都</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({headTitle:state.headTitle,user:state.user}),{logout}
)(withRouter(Header))