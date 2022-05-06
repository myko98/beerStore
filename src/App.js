import brands from "./data/info";
import { useState, useEffect } from "react";
import {
  Router,
  Switch,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Fridge from "./routes/fridge";
import beerAxios from "./services/beerAxios";

function App() {
  const [search, setSearch] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [outputLabatt, setOutputLabatt] = useState([]);
  const [outputImports, setOutputImports] = useState([]);
  const [outputMolson, setOutputMolson] = useState([]);
  const [outputSleeman, setOutputSleeman] = useState([]);
  const [outputBE, setOutputBE] = useState([]);
  const [fridge, setFridge] = useState([]);
  const [addToFridge, setAddToFridge] = useState({});
  const [updateBool, setUpdateBool] = useState(false)

  let Labatt = brands.Labatt;
  let Imports = brands.Imports;
  let Molson = brands.Molson;
  let Sleeman = brands.Sleeman;
  let BrewerExpansion = brands.BrewerExpansion;

  let arrayOfBrands = [Labatt, Imports, Molson, Sleeman, BrewerExpansion];

  const capitalize = (brand) => {
    let capitalizeBrand = brand.map((drink) => {
      let words = drink.split(" ");
      return words
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");
    });
    return capitalizeBrand;
  };

  arrayOfBrands = arrayOfBrands.map((brand) => capitalize(brand));
  Labatt = arrayOfBrands[0];
  Imports = arrayOfBrands[1];
  Molson = arrayOfBrands[2];
  Sleeman = arrayOfBrands[3];
  BrewerExpansion = arrayOfBrands[4];

  const filterLabatt = isEmpty ? Labatt : outputLabatt;
  const filterImports = isEmpty ? Imports : outputImports;
  const filterMolson = isEmpty ? Molson : outputMolson;
  const filterSleeman = isEmpty ? Sleeman : outputSleeman;
  const filterBE = isEmpty ? BrewerExpansion : outputBE;

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

  //get fridge info
  //current set to [], but pretty sure it should be empty so that it will keep grabbing updated amounts for DB whenever it gets updated, will change later
  useEffect(() => {
    beerAxios
      .getAll()
      .then((fridge) => {
        setFridge(fridge);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setOutputLabatt([]);
    setOutputImports([]);
    setOutputMolson([]);
    setOutputSleeman([]);
    setOutputBE([]);

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

    BrewerExpansion.filter((beer) => {
      if (beer.toLowerCase().includes(search.toLowerCase())) {
        setOutputBE((outputBE) => [...outputBE, beer]);
      }
    });
  }, [search]);

  //updates beer DB whenever update values button is pressed
  const add = async (event) => {
    event.preventDefault();
    
    try {
      await beerAxios.updateFridge(addToFridge)
      let result = await beerAxios.getAll()
      setFridge(result)
      setAddToFridge({})
    } catch(error) {
      console.log(error)
    }
  };

  const resetFridge = async (event) => {
    event.preventDefault();
    
    try {
      await beerAxios.resetFridge(addToFridge)
      let result = await beerAxios.getAll()
      setFridge(result)
      setAddToFridge({})
    } catch(error) {
      console.log(error)
    }
  }
  function Brands() {
    return (
      <div className="flex">
        {removeColumn(filterLabatt, "Labatt", outputLabatt)}
        {removeColumn(filterMolson, "Molson", outputMolson)}
        {removeColumn(filterSleeman, "Sleeman", outputSleeman)}
        {removeColumn(filterImports, "Imports", outputImports)}
        {removeColumn(filterBE, "Brewer Expansion", outputBE)}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App font center">
        <div className="centerText">
          <nav>
            <Link to="/">Brands</Link>
            <Link to="/fridge">Fridge</Link>
          </nav>
          <input
            onChange={updateSearch}
            type="text"
            placeholder="enter brand"
          />
        </div>
        <Routes>
          <Route path="/" element={<Brands />} />
          <Route
            path="fridge"
            element={
              <Fridge
                fridge={fridge}
                add={add}
                addToFridge={addToFridge}
                setAddToFridge={setAddToFridge}
                resetFridge={resetFridge}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
