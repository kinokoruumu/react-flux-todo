import React from "react"
import store from "../store"
import actions from '../actions'

const getTodoState = () => {
	return store.getAll()
}

class App extends React.Component {

	constructor(){
		super()
		this.state = {
			value: "",
			todos: getTodoState()
		}
	}

	componentDidMount(){
		store.addChangeListener(this._onChange.bind(this))
	}

	componentWillUnmount(){
		store.removeChangeListener(this._onChange.bind(this));
	}

	_delete(e){
		var id = e.target.parentNode.id
		actions.deleteTodo(id)
	}

	_submit(){
		actions.addTodo(this.state.value)
		this.setState({
			value: ""
		})
	}

	_Input(e){
		this.setState({
			value: e.target.value
		})
	}

	_onChange(){
		this.setState(getTodoState())
	}

	render(){
		let todoElements = []
		const {todos, value} = this.state
		for(let key in todos){
			todoElements.push(
				<li key={key} id={todos[key].id}>
					<span style={{marginRight: "30px"}}>{todos[key].text}</span>
					<button onClick={this._delete.bind(this)}>&times;</button>
				</li>
			)
		}
		return(
			<div>
				<input type="text" value={value} onChange={this._Input.bind(this)}/>
				<button onClick={this._submit.bind(this)}>Add.</button>
				<ul>
					{todoElements}
				</ul>
			</div>
		)
	}
}

export default App
