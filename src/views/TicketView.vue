<template>
    <div v-if="train_not_found()" class="error">
        Sorry!The data only support for direct train
    </div>
    <div v-if="!train_not_found()" class="trains">
        <div v-for="train in trains" :key="train" class="train">
            <div class="time">
                {{ getTime(train, 'departure') }}
                <NIcon :component="ArrowForward"></NIcon>
                {{ getTime(train, 'arrival') }}
            </div>
            <div class="duration">
                <n-icon :component="TimerOutline"> </n-icon>
                {{ getDuration(train) }}
            </div>
            <div class="trainType">
                <n-icon :component="TrainOutline"></n-icon>
                {{ getTrainType(train) }}
            </div>
            <div class="trianTrack">
                platform:
                <n-icon :component="LogOut"> </n-icon>

                {{ getTrack(train, 'departure') }}

                <n-icon :component="LogIn"> </n-icon>
                {{ getTrack(train, 'arrival') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'
import {
    ArrowForward,
    TimerOutline,
    TrainOutline,
    LogIn,
    LogOut,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import router from '@/router'
import { useRoute } from 'vue-router'

export default defineComponent({
    components: { NIcon },
    setup() {
        const store = useStore()
        const trains = computed(() => store.state.ticket.tickets)
        const train_not_found = () => {
            return trains.value.code !== undefined
        }
        const getTime = (train: any, cond: string) => {
            let time = null
            if (cond == 'departure') {
                time = new Date(train.timeTableRows[0].scheduledTime)
            } else {
                time = new Date(train.timeTableRows.at(-1).scheduledTime)
            }
            const h = ('0' + time.getHours()).slice(-2)
            const m = ('0' + time.getMinutes()).slice(-2)
            return h + ':' + m
        }
        const getDuration = (train: any) => {
            const departure = new Date(
                train.timeTableRows[0].scheduledTime
            ).getTime()
            const arrival = new Date(
                train.timeTableRows.at(-1).scheduledTime
            ).getTime()
            const duration = arrival - departure
            const seconds = duration / 1000

            const sec = Math.floor(seconds % 60)
            const minute = Math.floor((seconds / 60) % 60)
            const hour = Math.floor(seconds / 60 / 60)

            return (
                ('0' + hour).slice(-2) +
                ':' +
                ('0' + minute).slice(-2) +
                ':' +
                ('0' + sec).slice(-2)
            )
        }
        const getTrainType = (train: any) => {
            return train.trainType + '-' + train.trainNumber
        }
        const getTrack = (train: any, cond: string) => {
            let track = ''
            if (cond == 'departure') {
                track = train.timeTableRows[0].commercialTrack
            } else {
                track = train.timeTableRows.at(-1).commercialTrack
            }
            return track
        }
        onMounted(() => {
            console.log('trig')
            const { from, to, date } = useRoute().params
            store.dispatch('ticket/get_ticket_from_api', { from, to, date })
        })
        return {
            trains,
            ArrowForward,
            TimerOutline,
            TrainOutline,
            LogIn,
            LogOut,
            train_not_found,
            getTime,
            getTrainType,
            getTrack,
            getDuration,
        }
    },
})
</script>

<style lang="scss" scoped>
@import '../styles/style.scss';
.trains {
    display: flex;
    flex-direction: column;
    .train {
        background: $white;
        padding: 5px 10px;
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div {
            flex: 1;
            display: flex;
            justify-items: left;
        }
    }
}
</style>
