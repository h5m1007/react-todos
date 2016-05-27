import React from "react";

class TodoHeader extends React.Component{
	handlerKeyUp(e){
		if(e.keyCode === 13){
			let value = e.target.value;

			if(!value) return false;

			let newTodoItem = {
				text: value,
				isDone: false
			};

			e.target.value = "";
			this.props.addTodo(newTodoItem);
		}
	}

	render(){
		return (
			<div className = "panel-header">
				<input onKeyUp = {this.handlerKeyUp.bind(this)}
					type = "text" placeholder = "what's your task?"/>
			</div>
		)
	}
};

export default TodoHeader;