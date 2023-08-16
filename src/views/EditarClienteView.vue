<script setup>
import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import ClienteService from '../services/ClienteService';
import { FormKit } from '@formkit/vue';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { reactive } from 'vue';

defineProps({
    titulo: {
        type: String,
    },
});

const router = useRouter();
const route = useRoute();

const { id } = route.params;

const formData = reactive({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    puesto: '',
})

onMounted(async () => {
    ClienteService.obtenerCliente(id)
        .then(cliente => {
            Object.assign(formData, cliente);
        })
        .catch(error => {
            console.log(error);
        });
});

const handleSubmit = (data) => {
    ClienteService.actualizarCliente(id, data)
        .then(() => {
            router.push({ name: 'home' });
        })
        .catch(error => {
            console.log(error);
        });
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
                <FormKit type="form" incomplete-message="Faltan campos por rellenar" submit-label="Editar cliente"
                    @submit="handleSubmit">
                    <FormKit type="text" label="Nombre" help="Coloca el Nombre del cliente que deseas registrar"
                        name="nombre" validation="required"
                        :validation-messages="{ required: 'El Nombre del cliente es obligatorio' }"
                        v-model="formData.nombre" />
                    <FormKit type="text" label="Apellido" help="Coloca el Apellido del cliente que deseas registrar"
                        name="apellido" validation="required"
                        :validation-messages="{ required: 'El Apellido del cliente es obligatorio' }"
                        v-model="formData.apellido" />
                    <FormKit type="email" label="Email" help="Coloca el Email del cliente que deseas registrar" name="email"
                        validation="required|email"
                        :validation-messages="{ required: 'El Email del cliente es obligatorio', email: 'Email no válido' }"
                        v-model="formData.email" />
                    <FormKit type="text" label="Teléfono" placeholder="Teléfono: XXX-XXX-XXXX" name="telefono"
                        validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                        :validation-messages="{ matches: 'Formato del teléfono NO válido' }" v-model="formData.telefono" />
                    <FormKit type="text" label="Empresa" help="Coloca el Empresa del cliente" name="empresa"
                        v-model="formData.empresa" />
                    <FormKit type="text" label="Puesto" help="Coloca el Puesto del cliente" name="puesto"
                        v-model="formData.puesto" />
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
