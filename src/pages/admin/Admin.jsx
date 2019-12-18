import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Layout} from 'antd'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'

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
import NotFound from "../not-found/not-found";

const {Content,Footer,Sider}=Layout
class Admin extends Component{
    render(){
        const {user}=this.props
        if(!user||!user._id){
            return <Redirect to={'/login'}/>
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{backgroundColor:'white',margin:20}}>
                        <Switch>
                            <Redirect exact from='/' to='/home'/>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'gray'}}>推荐使用谷歌浏览器，体验更佳</Footer>
                </Layout>
            </Layout>

        )
    }
}
export  default connect(
    state=>({user:state.user})
)(Admin)