import React,{Component} from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'

const Item=Form.Item
const Option=Select.Option
class AddForm extends Component{

    static propTypes={
        setForm:PropTypes.func.isRequired,
        categorys:PropTypes.array.isRequired,
        parentId:PropTypes.string.isRequired
    }
    validateValue=(rule,value,callback)=>{
        const repeateName=this.props.categorys.find(item=>item.name===value)
        if(!value){
            callback('分类名称必须输入')
        }else if(repeateName){
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
        const {getFieldDecorator}=this.props.form
        const {categorys,parentId}=this.props
        return (
            <Form>
                <Item>
                {
                    getFieldDecorator('parentId',{
                        initialValue:parentId
                    })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                {
                                    categorys.map(item=><Option key={item._id} value={item._id}>{item.name}</Option>)
                                }
                            </Select>
                    )
                }
                </Item>
                <Item>
                {
                    getFieldDecorator('categoryName',{
                        initialValue:'',
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
export default Form.create()(AddForm)