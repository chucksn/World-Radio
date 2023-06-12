import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { setCountry } from "../features/other/countrySlice";
import { useDispatch } from "react-redux";

function CountrySelector() {
  const dispatch = useDispatch();
  const [countryValue, setCountryValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    countryValue && dispatch(setCountry(countryValue));
  }, [countryValue]);

  const changeHandler = (value) => {
    setCountryValue(value);
  };

  return (
    <Select
      className=" w-full "
      options={options}
      value={countryValue}
      onChange={changeHandler}
      placeholder="Search Country"
    />
  );
}

export default CountrySelector;
