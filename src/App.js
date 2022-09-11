import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./views/login";
import Categories from "./views/categories";
import Products from "./views/products";
import Order from "./views/order";
import Users from "./views/users";
import Settings from "./views/settings";
import Company from "./views/company";
import Materials from "./views/materials";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Settings/>}/>
              <Route path="/users" element={<Users/>}/>
              <Route path="/categories" element={<Categories/>}/>
              <Route path="/companies" element={<Company/>}/>
              <Route path="/material" element={<Materials/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/orders" element={<Order/>}/>
              <Route path="/login" element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
