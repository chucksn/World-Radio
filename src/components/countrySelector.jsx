import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { setCountry } from "../redux/features/countrySlice";
import { useDispatch } from "react-redux";
import { resetStation } from "../redux/features/stationSlice";

function CountrySelector() {
  const dispatch = useDispatch();
  const [countryValue, setCountryValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    countryValue && dispatch(setCountry(countryValue));
  }, [countryValue]);

  const changeHandler = (value) => {
    setCountryValue(value);
    dispatch(resetStation());
  };

  return (
    <Select
      className=" w-full lg:w-1/5  sm:w-1/2 "
      options={options}
      value={countryValue}
      onChange={changeHandler}
      placeholder="Search Country"
    />
  );
}

export default CountrySelector;
