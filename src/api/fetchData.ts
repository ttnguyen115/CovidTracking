import axiosClient from './axiosClient';

const countryApi = {
    gettAll() {
        const url: string = "/countries";
        return axiosClient.get(url);
    },

    getByCountry (country: string) {
        const url: string = `/dayone/country/${country}`;
        return axiosClient.get(url);
    }
}

export default countryApi