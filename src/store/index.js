import Dispatcher from "../dispatcher"
import EventEmitter from "events"
import {ADD_TODO, DELETE_TODO} from "../constants"

const CHANGE_EVENT = 'change'

const _todos = {} // 初期化

const create = (text) => {
	const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	_todos[id] = {
		id: id,
		text: text
	}
}

const destroy = (id) => {
	delete _todos[id]
}

const store = Object.assign({}, EventEmitter.prototype, {

	getAll(){
		return _todos
	},

	emitChange(){
		this.emit(CHANGE_EVENT)
	},

	addChangeListener(callback){
		this.on(CHANGE_EVENT, callback)
	},

	removeChangeListener(callback){
		this.removeListener(CHANGE_EVENT, callback)
	}

})

Dispatcher.register((action) => {
	switch(action.type){
		case ADD_TODO:
			const text = action.text.trim()
			if(text !== ''){
				create(text)
				store.emitChange()
			}
			break;

		case DELETE_TODO:
			destroy(action.id)
			store.emitChange()
			break;

		default:
			console.error("switch default")
	}
})
export default store