import { ConvertDataRocket, type DataRocket } from "@/models/data_rocket";
import { createRocket, getDataRocket, getDetailRocket } from "@/services/rocket_service";
import { imageLinks, phoneticAlphabet, RequestStatus } from "@/utils/const";
import { defineStore } from "pinia";

export const useRocketStore = defineStore('rocketStore', {
  state: () => ({
    dataRocket: [] as DataRocket[],
    detailRocket: {} as DataRocket,
    filteredDataRocket: [] as DataRocket[],
    key: 0,
    keywordSearch: '',
    snackbarColor: '',
    snackbarMessage: '',
    snackbarShown: false,
    statusCreateRocket: RequestStatus.Initial,
    statusGetDetailRocket: RequestStatus.Initial,
    statusGetListDataRocket: RequestStatus.Initial,
  }),
  actions: {
    async createRocket() {
      this.statusCreateRocket = RequestStatus.Loading;

      try {
        const generateRandomName = () => {
          return `${phoneticAlphabet[Math.floor(Math.random() * phoneticAlphabet.length)]} ${Math.floor(Math.random() * 9) + 1}`;
        };

        let randomName = generateRandomName();

        while (this.dataRocket.some((rocket) => rocket.name === randomName)) {
          randomName = generateRandomName();
        }

        const description = `${randomName} is an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, ${randomName} became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.`;

        const shuffledImages = [...imageLinks].sort(() => Math.random() - 0.5);

        const selectedImages = shuffledImages.slice(0, 3);

        const responseData = await createRocket({
          "flickr_images": selectedImages,
          "name": randomName,
          "type": "rocket",
          "cost_per_launch": 6700000,
          "first_flight": "2006-03-24",
          "country": "Republic of the Marshall Islands",
          "description": description,
          "id": ""
        });

        if ((responseData as { status: number }).status === 201) {
          this.statusCreateRocket = RequestStatus.Success;

          this.showSnackbar(false, 'Success Create!')

          this.getDataRocket();
        } else {
          this.showSnackbar(true, 'Failed to Create!')

          this.statusCreateRocket = RequestStatus.Error;
        }

      } catch (error) {
          this.showSnackbar(true, 'Failed to Create!')

        this.statusCreateRocket = RequestStatus.Error;
        throw error;
      }
    },

    filterRocketByName() {
      const regex = new RegExp('^' + this.keywordSearch, 'i')
      this.filteredDataRocket = this.dataRocket.filter((rocket) => regex.test(rocket.name))
    },

    async getDataRocket() {
      this.statusGetListDataRocket = RequestStatus.Loading

      try {
        this.keywordSearch = ''

        this.key += 1

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
    },

    showSnackbar (isError: boolean, message: string) {
      this.snackbarColor = isError ? '#ff5252' : '#4caf50';
      this.snackbarMessage = message
      this.snackbarShown = true
    },

  },
})
