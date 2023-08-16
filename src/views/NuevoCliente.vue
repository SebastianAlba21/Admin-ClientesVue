<script setup>
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import ClienteService from '../services/ClienteService';
import { FormKit } from '@formkit/vue';
import { useRouter } from 'vue-router';

defineProps({
	titulo: {
		type: String,
	},
});

const router = useRouter();

const handleSubmit = (data) => {
	data.estado = 1;
	ClienteService.agregarCliente(data)
		.then(() => {
			router.push({ name: 'home' })
		})
		.catch((error) => console.log(error))
		.finally(() => console.log('Finalizado'));
};
</script>
<template>
	<div>
		<div class="flex justify-end">
			<RouterLink to="home">Volver</RouterLink>
		</div>
		<Heading>{{ titulo }}</Heading>
		<div class="mx-auto mt-10 bg-white shadow">
			<div class="mx-auto md:w-2/3 py-20 px-6">
				<FormKit type="form" incomplete-message="Faltan campos por rellenar" submit-label="Agregar cliente"
					@submit="handleSubmit">
					<FormKit type="text" label="Nombre" help="Coloca el Nombre del cliente que deseas registrar"
						name="nombre" validation="required"
						:validation-messages="{ required: 'El Nombre del cliente es obligatorio' }" />
					<FormKit type="text" label="Apellido" help="Coloca el Apellido del cliente que deseas registrar"
						name="apellido" validation="required"
						:validation-messages="{ required: 'El Apellido del cliente es obligatorio' }" />
					<FormKit type="email" label="Email" help="Coloca el Email del cliente que deseas registrar" name="email"
						validation="required|email"
						:validation-messages="{ required: 'El Email del cliente es obligatorio', email: 'Email no válido' }" />
					<FormKit type="text" label="Teléfono" placeholder="Teléfono: XXX-XXX-XXXX" name="telefono"
						validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
						:validation-messages="{ matches: 'Formato del teléfono NO válido' }" />
					<FormKit type="text" label="Empresa" help="Coloca el Empresa del cliente" name="empresa" />
					<FormKit type="text" label="Puesto" help="Coloca el Puesto del cliente" name="puesto" />
				</FormKit>
			</div>
		</div>
	</div>
</template>

<style>
.formkit-wrapper {
	max-width: 100%;
}
</style>
