<template>
    <n-icon size="40px" class="close" :component="Close" @click="close('')" />
    <div class="citylist">
        <div class="header">
            <div class="title">
                {{ from ? 'Mistä lähdet?' : 'Minne matka?' }}
            </div>
            <n-input
                v-model:value="keyWord"
                class="w-50 m-2"
                size="large"
                placeholder=""
            >
                <template #prefix>
                    <n-icon size="30" :component="Search"> </n-icon>
                </template>
            </n-input>
        </div>
        <div class="over-lay"></div>
        <div class="list">
            <div
                class="sort"
                :key="key"
                v-for="[key, cities] in selectedCities"
            >
                <span>{{ key }}</span>
                <n-divider />
                <div v-for="city in cities" :key="city">
                    <div class="sort_result" @click="close(city)">
                        {{ city }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { NInput, NDivider, NIcon } from 'naive-ui'
import { Search, Close } from '@vicons/ionicons5'

import { cities } from '../assets/files/cities'

export default defineComponent({
    components: {
        NInput,
        NDivider,
        NIcon,
    },
    props: ['from'],
    setup(props, { emit }) {
        const keyWord = ref('')
        const selectedCities = computed(() => {
            const mapCities = new Map<string, string[]>()
            Object.keys(cities).map((item: string) => {
                if (item.toLowerCase().includes(keyWord.value)) {
                    if (!mapCities.has(item[0])) {
                        mapCities.set(item[0], [item])
                    } else {
                        mapCities.get(item[0])?.push(item)
                    }
                }
            })
            return mapCities
        })
        const close = (city: string) => {
            emit('setDialogVisible')
            emit('setLocation', city)
        }
        return { keyWord, Search, Close, selectedCities, close }
    },
})
</script>

<style lang="scss" scoped>
@import '../styles/style.scss';
.close {
    z-index: 3;
    position: absolute;
    right: 10%;
}
.citylist {
    background: $dark-gray;
    text-align: left;
    font-family: $font-sans-serif;
    position: relative;
    padding: 60px;
    .header {
        position: sticky;
        top: 0px;
        z-index: 2;
        background: $dark-gray;
        .title {
            color: $white;
            font-size: 30px;
            font-weight: 600;
            margin: 20px 0;
            z-index: 2;
        }
    }

    .list {
        color: $white;
        font-size: 1.2rem;
        font-weight: 600;
        padding: 40px;
        z-index: -1;
        .sort {
            margin-top: 20px;
            .sort_result {
                margin-bottom: 10px;
                padding: 10px;
            }
            .sort_result:hover {
                background: $light-dark-gray;
            }
        }
    }
}
</style>
