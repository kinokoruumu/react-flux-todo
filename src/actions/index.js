import Dispatcher from "../dispatcher"
import { ADD_TODO, DELETE_TODO } from "../constants"

const actions = {

	addTodo(text){
		Dispatcher.dispatch({
			type: ADD_TODO,
			text: text
		})
	},

	deleteTodo(id){
		Dispatcher.dispatch({
			type: DELETE_TODO,
			id: id
		})
	}
}

export default actions