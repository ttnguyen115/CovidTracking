import { useCallback } from "react";
import { useEffect, useState } from "react";
import countryApi from "./api/fetchData";
import CountrySelector from "./components/CountrySelector"
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

export interface CountryType {
  Country: string;
  ISO2: string;
  Slug: string;
}

const App = () => {
  const [countries, setCountries] = useState<CountryType[]>([])
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');

  useEffect(() => {
    (
      async () => {
        const res = await countryApi.gettAll();
        setCountries(res.data);
      }
    )();
  }, []);

  const handleChange = useCallback((e: any) => {
    setSelectedCountryId(e.target.value);
    // const index = countries?.find((country: CountryType): boolean => country.ISO2 === e.target.value);
    // console.log(index);

    // const res = await countryApi.getByCountry(Slug);
    // console.log(res);
  }, []);

  return (
    <>
      <CountrySelector countries={countries} handleChange={handleChange} value={selectedCountryId} />
      <Highlight />
      <Summary />
    </>
  );
}

export default App;
