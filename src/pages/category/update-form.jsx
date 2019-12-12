import React,{Component} from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item=Form.Item
class UpdateForm extends Component{
    static propTypes={
        categoryName:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }
    validateValue=(rule,value,callback)=>{
        if(!value){
            callback('分类名称必须输入')
        }else if(value===this.props.categoryName){
            callback('分类名称重复，请重新输入')
        }else{
            callback()
        }
    }
    constructor(props) {
        super(props);
        this.props.setForm(this.props.form)
    }

    render(){
        const {categoryName}=this.props
        const {getFieldDecorator}=this.props.form
        return (
            <Form>
                <Item>
                {
                    getFieldDecorator('categoryName',{
                        initialValue:categoryName,
                        rules:[{required:true,message:'分类名称必须输入'},
                            {validator:this.validateValue}]
                    })(
                            <Input placeholder='请输入分类名称'/>
                    )
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateForm)