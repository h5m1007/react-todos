import React from "react";

class TodoFooter extends React.Component{
	// 处理全选与全不选的状态
	handlerAllState(e){
		this.props.changeTodoState(
			null,
			e.target.checked,
			true
		)
	}

	// 清除已完成
	handlerClick(){
		this.props.clearDone();
	}

	render(){
		return (
			<div className = "clearFix todo-footer">
				<input checked = {this.props.isAllChecked}
					onChange = {this.handlerAllState.bind(this)}
					type = "checkbox" className = "fl"/>
				<span className = "fl">
					{this.props.todoDoneCount}已完成 / 
					{this.props.todoCount}总数
				</span>
				<button onClick = {this.handlerClick.bind(this)} className = "fr">
					清除已完成
				</button>
			</div>
		)
	}
}
export default TodoFooter;