/*
添加角色组件
 */
import React,{PureComponent} from 'react'
import {Form,Input,Tree} from 'antd'
import PropTypes from 'prop-types'

import menuList from "../../config/menuConfig";

const Item=Form.Item
const {TreeNode}=Tree
export default class AuthForm extends PureComponent{

    static propTypes={
        role:PropTypes.object
    }

    getTreeNodes=(menuList)=>{
        return menuList.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children?this.getTreeNodes(item.children):null}
                </TreeNode>
                )
           return pre
        },[])
    }
    getRoleMenus=()=>this.state.checkedKeys

    constructor(props) {
        super(props);
        this.treeNodes=this.getTreeNodes(menuList)
        const menus=this.props.role.menus
        this.state={
            checkedKeys:menus
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.role.menus!==prevProps.role.menus){
            const  menus=this.props.role.menus
            this.setState({
                checkedKeys:menus
            })
        }
    }
    render(){
        const {role}=this.props
        const {checkedKeys}=this.state
        return (
            <div>
                <Form>
                    <Item label='角色名称：'  labelCol={{span:4}} wrapperCol={{span:12}}>
                        <Input value={role.name}/>
                    </Item>
                </Form>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={checkedKeys=>this.setState({checkedKeys}) }
                >
                    <TreeNode title='平台权限' key='all'>
                       {this.treeNodes}
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}
