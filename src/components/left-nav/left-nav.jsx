/*
左侧导航的组件
 */
import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'

import './index.less'
import menuList from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils";

const SubMenu=Menu.SubMenu
const Item=Menu.Item
class LeftNav extends Component{


    hasAuth=(item)=>{
        const {key,isPublic}=item
        const {menus}=memoryUtils.user.role
        const {username}=memoryUtils.user
        if(username==='admin'||isPublic||menus.indexOf(key)!==-1){
            return true
        }else if(item.children){
           return  !!item.children.find(child=>menus.indexOf(child.key)!==-1)
        }
        return  false
    }
    getMenuNodes=(menuList)=>{
       return  menuList.map((item)=>{
           if(this.hasAuth(item)){
               if(item.children){
                   const path=this.props.location.pathname
                   const citem=item.children.find(citem=>path.indexOf(citem.key)===0)
                   if(citem) this.openKey=item.key
                   return (
                       <SubMenu
                           title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}
                           key={item.key}>
                           {this.getMenuNodes(item.children)}
                       </SubMenu>
                   )
               }else{
                   return (<Item key={item.key}>
                       <Link to={item.key}>
                           <Icon type={item.icon}/>
                           <span>{item.title}</span>
                       </Link>
                   </Item>)
               }
           }else{
               return null
           }
        })
    }

    constructor(props) {
        super(props);
        this.menuNodes= this.getMenuNodes(menuList)
    }

    render(){
        let path= this.props.location.pathname
        if(path.indexOf('/product')===0){
           path='/product'
        }
        return (
            <div className='left-nav'>
                <Link  to='/' className='left-nav-header'>
                        <img src={require('../../assets/images/logo.png')} alt="logo"/>
                        <h1>某某后台</h1>
                </Link>
                <section className='left-nav-content'>
                    <Menu
                        mode='inline'
                        theme='dark'
                        selectedKeys={[path]}
                        defaultOpenKeys={[this.openKey]}
                    >
                        {this.menuNodes}
                    </Menu>
                </section>
            </div>
        )
    }
}
export default withRouter(LeftNav)
