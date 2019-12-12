/*
左侧导航的组件
 */
import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'

import './index.less'
import menuList from "../../config/menuConfig";

const SubMenu=Menu.SubMenu
const Item=Menu.Item
class LeftNav extends Component{

    getMenuNodes=(menuList)=>{
       return  menuList.map((item)=>{
            if(item.children){
                const path=this.props.location.pathname
                const citem=item.children.find(citem=>citem.key===path)
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
        })
    }

    constructor(props) {
        super(props);
        this.menuNodes= this.getMenuNodes(menuList)
    }

    render(){
        const path= this.props.location.pathname
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
