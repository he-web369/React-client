/*
编辑商品详情的富文本编辑组件
 */
import React,{Component} from 'react'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import {Editor} from 'react-draft-wysiwyg'
import {EditorState,convertToRaw,ContentState} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import PropTypes from "prop-types"

export default class RichTextEditor extends Component{
    static propTypes={
        detail:PropTypes.string
    }

    onEditorStateChange=(editorState)=>this.setState({editorState})

    getDetail=()=>draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

    uploadImageCallback=(file)=>{
       return  new Promise((resolve ,reject)=>{
            const xhr=new XMLHttpRequest()
            xhr.open('POST','/manage/img/upload')
            const data=new FormData()
            data.append('image',file)
            xhr.send(data)
            xhr.addEventListener('load',()=>{
                const response=JSON.parse(xhr.responseText)
                const {url}=response.data
                resolve({data:{link:url}})
            })
            xhr.addEventListener('error',()=>{
                const error=JSON.parse(xhr.responseText)
                reject(error)
            })
        })
    }
    constructor(props) {
        super(props)
        const {detail}=this.props
        if(detail){
            const contentBlock =  htmlToDraft(detail)
            const contentState=ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState=EditorState.createWithContent(contentState)
            this.state={
                editorState
            }
        }else{
            this.state={
                editorState:EditorState.createEmpty()
            }
        }
    }


    render(){
        const {editorState}=this.state
        return (
            <Editor editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    editorStyle={{border:'1px solid',minHeight:200}}
                    toolbar={{image:{uploadCallback:this.uploadImageCallback,alt:{present:true,mandatory:true}}} }
            />
        )
    }
}