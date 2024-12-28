import React from 'react';

function TodoSearch({
	searchValue,
	setsearchValue,
}){
	
	return (
		<div className="todo-search">
			<input 
			type="text" 
			placeholder="Buscar tarea..." 
			value={searchValue}
				onChange={(event) => {
					console.log('Escribiste en el buscador');
					setsearchValue(event.target.value);
				}}
			/>
		</div>
    );
}
export { TodoSearch };