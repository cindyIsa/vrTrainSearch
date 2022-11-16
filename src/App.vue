<template>
    <Ticket></Ticket>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Ticket from '@/components/Ticket.vue'
export default defineComponent({
    components: {
        Ticket,
    },
})
</script>

<style lang="scss">
@import './styles/style.scss';
</style>
