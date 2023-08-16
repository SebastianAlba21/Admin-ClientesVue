export default {
	obtenerClientes: () => {
		return fetch('http://localhost:4000/clientes', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => res.json())
	},
	agregarCliente: data => {
		return fetch('http://localhost:4000/clientes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => res.json())
	},
	obtenerCliente: id => {
		return fetch(`http://localhost:4000/clientes/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => res.json())
	},
	actualizarCliente: (id, data) => {
		return fetch(`http://localhost:4000/clientes/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => res.json())
	},
	cambiarEstadoCliente: (id, data) => {
		return fetch(`http://localhost:4000/clientes/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => res.json())
	},
	borrarCliente: id => {
		return fetch(`http://localhost:4000/clientes/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => res.json())
	},
}
