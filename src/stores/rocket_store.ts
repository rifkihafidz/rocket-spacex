import { ConvertDataRocket, type DataRocket } from "@/models/dataRocket";
import { getDataRocket, getDetailRocket } from "@/services/rocket_service";
import { RequestStatus } from "@/utils/const";
import { defineStore } from "pinia";

export const useRocketStore = defineStore('rocketStore', {
  state: () => ({
    dataRocket: [] as DataRocket[],
    detailRocket: {} as DataRocket,
    filteredDataRocket: [] as DataRocket[],
    keywordSearch: '',
    statusGetDetailRocket: RequestStatus.Initial,
    statusGetListDataRocket: RequestStatus.Initial,
  }),
  actions: {
    filterRocketByName() {
      const regex = new RegExp('^' + this.keywordSearch, 'i')
      this.filteredDataRocket = this.dataRocket.filter((rocket) => regex.test(rocket.name))
    },
    async getDataRocket() {
      this.statusGetListDataRocket = RequestStatus.Loading

      try {
        const responseData = await getDataRocket()

        if (Array.isArray(responseData)) {
          this.dataRocket = ConvertDataRocket.toRocketList(JSON.stringify(responseData))

          this.filteredDataRocket = this.dataRocket

          this.statusGetListDataRocket = RequestStatus.Success
        } else {
          this.statusGetListDataRocket = RequestStatus.Error
        }
      } catch (error) {
        this.statusGetListDataRocket = RequestStatus.Error
        throw error
      }
    },
    async getDetailRocket(id: string) {
      this.statusGetDetailRocket = RequestStatus.Loading

      try {
        const responseData = await getDetailRocket(id)

        if (responseData && typeof responseData === 'object') {
          this.detailRocket = ConvertDataRocket.toDataRocket(JSON.stringify(responseData))
          this.statusGetDetailRocket = RequestStatus.Success
        } else {
          this.statusGetDetailRocket = RequestStatus.Error
        }
      } catch (error) {
        this.statusGetDetailRocket = RequestStatus.Error
        throw error
      }
    }

  },
})
