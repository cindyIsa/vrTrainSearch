<template>
    <div class="buyTicket">
        <n-config-provider :theme="darkTheme" preflight-style-disabled>
            <n-grid
                class="lactionRow"
                :x-gap="10"
                :y-gap="10"
                cols="2 xs:1 s:2"
                responsive="screen"
            >
                <n-grid-item @click="setPostion(true)" class="from_location">
                    <div class="infoInput">{{ from }}</div>
                </n-grid-item>
                <n-grid-item @click="setPostion(false)" class="to_location">
                    <div class="infoInput">
                        {{ to }}
                    </div>
                </n-grid-item>
                <n-grid-item>
                    <n-icon
                        class="swap"
                        size="30px"
                        color="white"
                        :class="{ active: is_active }"
                        @click="swapStation"
                    >
                        <SwapHorizontal v-if="window_width > 768" />
                        <SwapVertical v-if="window_width <= 768" />
                    </n-icon>
                </n-grid-item>
            </n-grid>
            <n-grid
                class="infoRow"
                :x-gap="10"
                :y-gap="10"
                cols="2 xs:1 s:2"
                responsive="screen"
            >
                <n-grid-item>
                    <n-grid
                        class="timeRow"
                        :x-gap="10"
                        :y-gap="10"
                        cols="2"
                        responsive="screen"
                    >
                        <n-grid-item>
                            <n-date-picker
                                size="large"
                                :input-readonly="true"
                                :format="format"
                                v-model:value="outboundDate"
                            >
                            </n-date-picker>
                        </n-grid-item>
                        <n-grid-item>
                            <n-date-picker
                                size="large"
                                :input-readonly="true"
                                :format="format"
                                v-model:value="returnDate"
                                placeholder="--"
                            >
                            </n-date-picker>
                        </n-grid-item>
                    </n-grid>
                </n-grid-item>
                <n-grid-item>
                    <div class="infoInput" @click="activate('top')">
                        <div class="details">
                            <div v-if="details.length < 2">
                                <span> 1 {{ details[0].touristValue }}</span>
                            </div>
                            <div v-if="details.length > 1">
                                <span>{{ details.length }} matkustaja </span>
                            </div>
                            <div class="detail-icons">
                                <n-button
                                    round
                                    v-if="petNumber > 0"
                                    class="pet"
                                >
                                    <n-icon size="30">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            viewBox="0 0 576 512"
                                        >
                                            <path
                                                d="M298.06 224L448 277.55V496a16 16 0 0 1-16 16h-64a16 16 0 0 1-16-16V384H192v112a16 16 0 0 1-16 16h-64a16 16 0 0 1-16-16V282.09C58.84 268.84 32 233.66 32 192a32 32 0 0 1 64 0a32.06 32.06 0 0 0 32 32zM544 112v32a64 64 0 0 1-64 64h-32v35.58l-128-45.71V48c0-14.25 17.22-21.39 27.31-11.31L374.59 64h53.63c10.91 0 23.75 7.92 28.62 17.69L464 96h64a16 16 0 0 1 16 16zm-112 0a16 16 0 1 0-16 16a16 16 0 0 0 16-16z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </n-icon>
                                    <span>{{ petNumber }}</span>
                                </n-button>
                                <n-button
                                    round
                                    v-if="bikeNumber > 0"
                                    class="transport"
                                >
                                    <n-icon size="30">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M18.18 10L16 4h-4v2h2.6l1.46 4h-4.81l-.36-1H12V7H7v2h1.75l1.82 5H9.9c-.44-2.23-2.31-3.88-4.65-3.99C2.45 9.87 0 12.2 0 15c0 2.8 2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h4.2c.44 2.23 2.31 3.88 4.65 3.99c2.8.13 5.25-2.19 5.25-5c0-2.8-2.2-5-5-5h-.82zM7.82 16c-.4 1.17-1.49 2-2.82 2c-1.68 0-3-1.32-3-3s1.32-3 3-3c1.33 0 2.42.83 2.82 2H5v2h2.82zm6.28-2h-1.4l-.73-2H15c-.44.58-.76 1.25-.9 2zm4.9 4c-1.68 0-3-1.32-3-3c0-.93.41-1.73 1.05-2.28l.96 2.64l1.88-.68l-.97-2.67c.03 0 .06-.01.09-.01c1.68 0 3 1.32 3 3s-1.33 3-3.01 3z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </n-icon>
                                    <span>{{ bikeNumber }}</span>
                                </n-button>
                            </div>
                        </div>
                    </div>
                </n-grid-item>
            </n-grid>
            <div class="confirmWraper">
                <div
                    @click="getTicket"
                    class="confirm"
                    :class="{ active: is_active }"
                >
                    Hae matkoja
                </div>
            </div>
            <n-drawer
                v-model:show="list_active"
                height="100%"
                :placement="placement"
            >
                <city-list
                    @setLocation="setloc"
                    @setDialogVisible="
                        () => {
                            list_active = false
                        }
                    "
                ></city-list>
            </n-drawer>
            <n-drawer
                v-model:show="active"
                height="100%"
                :placement="placement"
            >
                <detail-list @setDialogVisible="() => (active = false)" />
            </n-drawer>
        </n-config-provider>
    </div>
    <router-view></router-view>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    toRefs,
} from 'vue'
import 'axios'

import { SwapHorizontal, SwapVertical } from '@vicons/ionicons5'
import {
    NConfigProvider,
    NGrid,
    NGridItem,
    NDatePicker,
    NDrawer,
    NIcon,
    NButton,
    darkTheme,
} from 'naive-ui'
import type { DrawerPlacement } from 'naive-ui'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import CityList from './CityList.vue'
import DetailList from './DetailList.vue'
import { cities } from '../assets/files/cities'
import router from '@/router'

export default defineComponent({
    name: 'TicketApp',
    components: {
        //vicons
        SwapHorizontal,
        SwapVertical,
        //naive ui
        NConfigProvider,
        NGrid,
        NGridItem,
        NDatePicker,
        NDrawer,
        NIcon,
        NButton,
        //others
        CityList,
        DetailList,
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const { from, to, date } = reactive(route.params)
        const tourist = reactive({
            details: computed(() => store.state.touristDetail.tourists),
            from: from ? from.toString() : 'Mistä',
            to: to ? from.toString() : 'Minne',
            outboundDate: date
                ? new Date(date.toString()).getTime()
                : Date.now(),
        })
        const returnDate = ref(null)
        const petNumber = computed(() =>
            store.getters['touristDetail/getNumberByTag']('withPet')
        )
        const bikeNumber = computed(() =>
            store.getters['touristDetail/getNumberByTag']('withBycicle')
        )
        const active = ref(false)
        const placement = ref<DrawerPlacement>('right')
        const activate = (place: DrawerPlacement) => {
            active.value = true
            placement.value = place
        }
        const dialogVisible = ref(false)
        const detailDialogVisible = ref(false)
        const from_where = ref(true)
        const window_width = ref(window.innerWidth)
        const format = 'EEE d.M.'
        const list_active = ref(false)

        const is_active = computed(
            () =>
                tourist.to !== 'Minne' &&
                tourist.from !== 'Mistä' &&
                tourist.from !== tourist.to
        )
        const setloc = (value: string) => {
            if (!value) {
                return
            }
            if (from_where.value) {
                tourist.from = value
            } else {
                tourist.to = value
            }
        }
        const setPostion = (where: boolean) => {
            list_active.value = true
            placement.value = 'top'
            from_where.value = where
        }
        const swapStation = () => {
            if (is_active.value) {
                const temp = tourist.to
                tourist.to = tourist.from
                tourist.from = temp
            }
        }

        const getTicket = () => {
            if (!is_active.value) {
                return
            }
            const departure = new Date(tourist.outboundDate)
            const leave = departure
                .toLocaleDateString('ch', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
                .replaceAll('/', '-')
            const n_from = cities[tourist.from] ?? from
            const n_to = cities[tourist.to] ?? to
            // const base_url =
            //     'https://rata.digitraffic.fi/api/v1/live-trains/station'
            // const api =
            //     base_url + '/' + from + '/' + to + '?departure_date=' + leave
            // axios.get(api).then((resp) => {
            //     store.dispatch('ticket/get_ticket_from_api', resp.data)
            // })
            store.dispatch('ticket/get_ticket_from_api', {
                from: n_from,
                to: n_to,
                date: leave,
            })
            router.push('/ticket/' + n_from + '/' + n_to + '/' + leave)
        }
        onMounted(() => {
            window.addEventListener('resize', () => {
                window_width.value = window.innerWidth
            })
        })
        onUnmounted(() => {
            window.removeEventListener('resize', () => {
                window_width.value = window.innerWidth
            })
        })

        return {
            ...toRefs(tourist),
            petNumber,
            bikeNumber,
            from_where,
            is_active,
            window_width,
            dialogVisible,
            detailDialogVisible,
            darkTheme,
            format,
            active,
            list_active,
            placement,
            returnDate,
            activate,
            setloc,
            setPostion,
            swapStation,
            getTicket,
        }
    },
})
</script>

<style lang="scss" scoped>
@import '../styles/components/ticket.scss';
</style>
