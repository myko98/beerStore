import brands from "./data/info";
import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [outputLabatt, setOutputLabatt] = useState([]);
  const [outputImports, setOutputImports] = useState([]);
  const [outputMolson, setOutputMolson] = useState([]);
  const [outputSleeman, setOutputSleeman] = useState([]);

  const Labatt = brands.Labatt;
  const Imports = brands.Imports;
  const Molson = brands.Molson;
  const Sleeman = brands.Sleeman;

  const filterLabatt = isEmpty ? Labatt : outputLabatt;
  const filterImports = isEmpty ? Imports : outputImports;
  const filterMolson = isEmpty ? Molson : outputMolson;
  const filterSleeman = isEmpty ? Sleeman : outputSleeman;

  const removeColumn = (filterBrand, brand, outputBrand) => {
    if (search.length > 0 && outputBrand.length == 0) {
      return null;
    }
    return (
      <div className="padding">
        {brand}
        {filterBrand.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    );
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);

    if (e.target.value.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  useEffect(() => {
    setOutputLabatt([]);
    setOutputImports([]);
    setOutputMolson([]);
    setOutputSleeman([]);

    Labatt.filter((beer) => {
      if (beer.toLowerCase().includes(search.toLowerCase())) {
        setOutputLabatt((outputLabatt) => [...outputLabatt, beer]);
      }
    });

    Imports.filter((beer) => {
      if (beer.toLowerCase().includes(search.toLowerCase())) {
        setOutputImports((outputImports) => [...outputImports, beer]);
      }
    });

    Molson.filter((beer) => {
      if (beer.toLowerCase().includes(search.toLowerCase())) {
        setOutputMolson((outputMolson) => [...outputMolson, beer]);
      }
    });

    Sleeman.filter((beer) => {
      if (beer.toLowerCase().includes(search.toLowerCase())) {
        setOutputSleeman((outputSleeman) => [...outputSleeman, beer]);
      }
    });
  }, [search]);

  return (
    <div className="App font center">
      <div className="centerText">
        <h1 className="red">Beer Store Brands</h1>
        <input onChange={updateSearch} type="text" placeholder="enter brand" />
      </div>
      <div className="flex">
        {removeColumn(filterLabatt, "Labatt", outputLabatt)}
        {removeColumn(filterMolson, "Molson", outputMolson)}
        {removeColumn(filterSleeman, "Sleeman", outputSleeman)}
        {removeColumn(filterImports, "Imports", outputImports)}
      </div>
    </div>
  );
}

export default App;
