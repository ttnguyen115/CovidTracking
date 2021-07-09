import { useEffect, useState } from "react";
import countryApi from "./api/fetchData";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

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
      setCountries(res.data);

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
    <>
      <CountrySelector countries={countries} handleChange={handleChange} value={selectedCountryId} />
      <Highlight report={report} />
      <Summary selectedCountryId={selectedCountryId} report={report} />
    </>
  );
}

export default App;
