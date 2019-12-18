/*
左侧导航的组件
 */
import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'
import {connect} from 'react-redux'

import './index.less'
import menuList from "../../config/menuConfig";
import {setHeadTitle} from '../../redux/actions'

const SubMenu=Menu.SubMenu
const Item=Menu.Item
class LeftNav extends Component{

    hasAuth=(item)=>{
        const {key,isPublic}=item
        const {menus}=this.props.user.role
        const {username}=this.props.user
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
               const path=this.props.location.pathname
               if(item.children){
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
                   if(item.key===path||path.indexOf(item.key)===0){
                       this.props.setHeadTitle(item.title)
                   }
                   return (<Item key={item.key}>
                       <Link to={item.key} onClick={()=>this.props.setHeadTitle(item.title)}>
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
export default connect(
    state=>({user:state.user}),
    {setHeadTitle}
)(withRouter(LeftNav))
