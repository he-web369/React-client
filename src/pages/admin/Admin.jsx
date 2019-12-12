import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Layout} from 'antd'
import {Switch,Route} from 'react-router-dom'

import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav/left-nav";
import Header from '../../components/header/header'
import Home from "../home/home";
import Role from "../role/role";
import Product from "../product/product";
import Category from "../category/category";
import User from "../user/user";
import Pie from "../charts/pie";
import Line from "../charts/line";
import Bar from "../charts/bar";

const {Content,Footer,Sider}=Layout
export default class Admin extends Component{
    render(){
        const {user}=memoryUtils
        if(!user||!user._id){
            return <Redirect to={'/login'}/>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{backgroundColor:'white',margin:20}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'gray'}}>推荐使用谷歌浏览器，体验更佳</Footer>
                </Layout>
            </Layout>

        )
    }
}