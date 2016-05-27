import React from "react";
import LocalDb from "localDb";

import TodoHeader from "./TodoHeader.js";
import TodoMain from "./TodoMain.js";
import TodoFooter from "./TodoFooter.js";

class App extends React.Component {
	constructor(){
		// 构造器
		super(); // 调用父类构造器初始化
		this.db = new LocalDb('React-Todos'); // 初始化数据库
		this.state = {
			// 初始化state
			todos: this.db.get("todos") || [],
			isAllChecked: false
		};
	};

	allChecked(){
		// 判断是否所有任务状态已完成
		let isAllChecked = false;
		if(this.state.todos.every((todo) => todo.isDone)){
			// 当.isDone均为true时 返回true
			// 当.isDone有一个为false 就返回false
			isAllChecked = true;
		}
		this.setState({
			// 并同步底部全选框
			todos: this.state.todos,
			isAllChecked
		});
	}

	// 添加任务 并传递给Header组件
	addTodo(todoItem){
		this.state.todos.push(todoItem);
		this.allChecked();
		this.db.set('todos', this.state.todos);
	}

	// 改变任务状态 并传递给TodoItem和Footer组件
	// index是第几个任务 isDone是状态 isChangeALL是控制全部状态
	changeTodoState(index, isDone, isChangeAll = false){
		if(isChangeAll){
			this.setState({
				todos: this.state.todos.map((todo) => {
					todo.isDone = isDone;
					return todo;
				}),
				isAllChecked: isDone
			})
		}else{
			this.state.todos[index].isDone = isDone;
			this.allChecked();
		}
		this.db.set('todos', this.state.todos);
	}

	// 清除已完成任务 并传递给Footer组件
	clearDone(){
		// 回调fn返回true则.filter保留当前项
		// 回调fn返回false则.filter移除当前项
		let todos = this.state.todos.filter(todo => !todo.isDone);
		this.setState({
			todos: todos,
			isAllChecked: false
		});
		this.db.set('todos', todos);
	}

	// 删除当前任务 并传递给TodoItem
	// 删除面板第几个任务
	deleteTodo(index){
		this.state.todos.splice(index, 1);
		this.setState({
			todos: this.state.todos
		});
		this.db.set('todos', this.state.todos);
	}

	render(){
		var props = {
			todoCount: this.state.todos.length || 0,
			todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
		};
		return (
			<div className="panel">
				<TodoHeader addTodo={this.addTodo.bind(this)}/>
				<TodoMain delectTodo = {this.delectTodo.bind(this)}
					todos = {this.state.todos}
					changeTodoState = {this.changeTodoState.bind(this)}/>
				<TodoFooter isAllChecked = {this.state.isAllChecked}
					clearDone={this.clearDone.bind(this)}
					{...props} changeTodoState = {this.changeTodoState.bind(this)}/>
			</div>
		)
	}
};

React.render(
	<App />,
	document.getElementById('app')
);