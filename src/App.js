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

  const filterLabatt = isEmpty ? Labatt : outputLabatt
  const filterImports = isEmpty ? Imports : outputImports
  const filterMolson = isEmpty ? Molson : outputMolson
  const filterSleeman = isEmpty ? Sleeman : outputSleeman

  return (
    <div className="App">
      <input onChange={updateSearch} type="text" placeholder="enter brand" />
      <h1 className="red">hi</h1>
      <div className="flex">
        <div>
          Labatt
          {filterLabatt.map((item) => (
            <p>{item}</p>
          ))}
        </div>
        <div>
          Molson
          {filterMolson.map((item) => (
            <p>{item}</p>
          ))}
        </div>
        <div>
          Sleeman
          {filterSleeman.map((item) => (
            <p>{item}</p>
          ))}
        </div>
        <div>
          Imports
          {filterImports.map((item) => (
            <p>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
