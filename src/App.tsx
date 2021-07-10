import '@fontsource/roboto';
import { Typography, Container } from '@material-ui/core';
import { sortBy } from 'lodash';
import moment from "moment";
import 'moment/locale/vi';
import { useEffect, useState } from "react";
import countryApi from "./api/fetchData";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

moment.locale('vi');

export interface CountryType {
  Country: string;
  ISO2: string;
  Slug: string;
}

export interface CountryData {
  Active: number;
  City: string;
  CityCode: string;
  Confirmed: number;
  Country: string;
  CountryCode: string;
  Date: Date;
  Deaths: number;
  ID: string;
  Lat: string;
  Lon: string;
  Province: string;
  Recovered: number;
}

const App = () => {
  const [countries, setCountries] = useState<CountryType[]>([])
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [report, setReport] = useState<Array<CountryData>>([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      const res = await countryApi.gettAll();

      const sortedCountry = sortBy(res.data, 'Country');

      setCountries(sortedCountry);

      setSelectedCountryId('vn');
    }

    fetchCountryData();
  }, []);

  const getReportByCountry = async (slug: string) => {
    const res = await countryApi.getByCountry(slug);
    res.data.pop();
    setReport(res.data);
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find((country: CountryType): boolean => country.ISO2.toLowerCase() === selectedCountryId);
  
      getReportByCountry(selectedCountry!.Slug);
    }
  }, [countries, selectedCountryId]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        Covid-19 Tracking Map
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector countries={countries} handleChange={handleChange} value={selectedCountryId} />
      <Highlight report={report} />
      <Summary selectedCountryId={selectedCountryId} report={report} />
    </Container>
  );
}

export default App;
