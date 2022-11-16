<template>
    <div id="touristDetail">
        <h1 align="left">Kuka matkustaa</h1>
        <div class="detailDialog" v-for="number in touristNumber" :key="number">
            <n-grid
                class="personInfo"
                cols="3 xs:1 s:3"
                :x-gap="10"
                responsive="screen"
            >
                <n-grid-item>
                    <label for="person">matkustaja {{ number }}</label>
                    <n-select
                        id="person"
                        v-model:value="tourist[number - 1].touristValue"
                        :default-value="personType.adult"
                        :options="personOptions"
                    />
                </n-grid-item>
                <n-grid-item>
                    <label for="pet">Lemmikki mukana?</label>
                    <n-select
                        id="pet"
                        v-model:value="tourist[number - 1].withPet"
                        :default-value="0"
                        :options="petOptions"
                    />
                </n-grid-item>
                <n-grid-item>
                    <label for="transport">Pyörä mukana?</label>
                    <n-select
                        id="transport"
                        v-model:value="tourist[number - 1].withBycicle"
                        :default-value="0"
                        :options="withBycicleOptions"
                    />
                </n-grid-item>
            </n-grid>

            <div class="right_delete" @click="removePerson(number)">
                <n-icon size="30">
                    <CloseCircle />
                </n-icon>
                <span>poista</span>
            </div>
        </div>
        <div>
            <n-button type="info" @click="addNewTourist">
                lisää matkustaja {{ touristNumber + 1 }}
            </n-button>
        </div>

        <n-button
            type="success"
            class="ready"
            size="medium"
            @click="closeDialog"
            >valmis</n-button
        >
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { NGrid, NGridItem, darkTheme, NSelect, NIcon, NButton } from 'naive-ui'
import { CloseCircle } from '@vicons/ionicons5'
import { personType } from '../assets/files/personType'
import { useStore } from 'vuex'
export default defineComponent({
    components: {
        NGrid,
        NGridItem,
        NSelect,
        NIcon,
        NButton,
        CloseCircle,
    },
    setup(props, { emit }) {
        const store = useStore()
        const tourist = reactive([
            ...JSON.parse(JSON.stringify(store.state.touristDetail.tourists)),
        ])

        const touristNumber = computed(() => tourist.length)
        const personOptions = [
            {
                label: 'Aikuinen',
                value: personType.adult,
            },
            {
                label: 'Opiskelija',
                value: personType.student,
            },
            {
                label: 'Lapsi',
                value: personType.child,
            },
            {
                label: 'Asevelvollinen',
                value: personType.conscript,
            },
            {
                label: 'Eläkeläinen',
                value: personType.pensioner,
            },
        ]

        const petOptions = [
            {
                label: 'Ei lemmikkejä',
                value: 0,
            },
            {
                label: '1 lemmikki',
                value: 1,
            },
            {
                label: '2 lemmikkiä',
                value: 2,
            },
        ]
        const withBycicleOptions = [
            {
                label: 'Ei polkupyörää',
                value: 0,
            },
            {
                label: '1 polkupyörä',
                value: 1,
            },
        ]
        const addNewTourist = () => {
            tourist.push({
                touristValue: personType.adult,
                withPet: 0,
                withBycicle: 0,
            })
        }
        const closeDialog = () => {
            emit('setDialogVisible')
            store.commit(
                'touristDetail/UPDATE_NEW_PERSON',
                JSON.parse(JSON.stringify(tourist))
            )
        }
        const removePerson = (id: number) => {
            if (tourist.length < 2) {
                return
            }
            tourist.splice(id - 1, 1)
        }
        return {
            tourist,
            touristNumber,
            personOptions,
            petOptions,
            withBycicleOptions,
            personType,
            darkTheme,
            addNewTourist,
            closeDialog,
            removePerson,
        }
    },
})
</script>

<style lang="scss" scoped>
@import '../styles/style.scss';

#touristDetail {
    padding: 40px;
    .detailDialog {
        display: flex;
        flex-direction: row;
        background: $light-dark-gray;
        border-radius: 0 10px 10px 0;
        margin-bottom: 20px;

        :deep(.n-base-selection-label) {
            background-color: $gray-white;
            height: 50px;
        }
        :deep(.n-base-selection-input) {
            color: $black;
        }
        :deep(.n-base-selection .n-base-suffix .n-base-suffix__arrow) {
            color: $blue;
        }
        .personInfo {
            background: $white;
            padding: 20px;
            border-radius: 10px;
            color: $dark-gray;
        }
        .right_delete {
            padding: 20px;
            text-align: center;
        }
    }
    .ready {
        margin-top: 20px;
        width: 50%;
        background: $green;
        color: $white;
    }
}
</style>
