import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useDisplay } from 'vuetify'

export const useGlobalStore = defineStore('globalStore', {
  actions: {
    display () {
      return reactive(useDisplay())
    },
   },
})
