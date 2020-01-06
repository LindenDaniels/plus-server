<h1>Plus Server</h1>

This is the API for the Grocery Plus app found here: https://github.com/LindenDaniels/groceryplus-client/tree/add-styling
<h2>Folders</h2>
<ul>
  <li>URL<br/>
    /folders
  </li>
  <li>Method:<br/>
    <code>GET</code>
  </li>
  <li>URL Params<br>
    None
  </li>
  <li>Data Params<br>
    None
  </li>
  <li>Success Response<br>
    Code: 200<br />
    Content: <code>{"id":1,"name":"Christmas","items":"Cookies, Almond Milk, Wrapping Paper, Chocolate chips"}</code>
  </li>
  <li>Error Response<br>
    Code: 404 NOT FOUND<br />
    Content: <code>Cannot GET</code>
  </li>
  <li>Sample Call:
    <code>return fetch(`${config.API_ENDPOINT}/folders`, {<br>
      headers: {<br>
      },<br>
    })<br>
      .then(res => <br>
         (!res.ok)<br>
          ? res.json().then(e => Promise.reject(e))<br>
          : res.json()<br>
      )},</code>
  </li>
  <li>Method:<br/>
    <code>POST</code>
  </li>
  <li>URL Params<br>
    Required:<br/>
    <code>folder_id=[integer]</code><br/>
    <code>name=[text]</code>
  </li>
  <li>Data Params<br>
    None
  </li>
  <li>Success Response<br>
    Code: 201<br />
    Content: <code>Folder with id ${folder.id} created.</code>
  </li>
  <li>Error Response<br>
    Code: 400<br />
    Content: <code>error: { message: `Missing ${field}.` }</code>
  </li>
  <li>Sample Call:
    <code>return fetch(`${config.API_ENDPOINT}/folders`, {<br>
      headers: {<br>
      },<br>
    })<br>
      .then(res => <br>
         (!res.ok)<br>
          ? res.json().then(e => Promise.reject(e))<br>
          : res.json()<br>
      )},</code>
  </li>
  </ul>
  <br/>
  
  <h3>Get Folders by ID</h3>
<ul>Gets recipes in a single folder.<br/>
  <li>URL<br/>
    /folders/:folder_Id
  </li>
  <li>Method:<br/>
    <code>GET</code>
  </li>
  <li>URL Params<br>
    Required:<br/>
    <code>folder_id=[integer]</code>
  </li>
  <li>Data Params<br>
    None
  </li>
  <li>Success Response<br>
    Code: 200<br />
    Content: <code>{"id":1,"name":"Breakfast"}</code>
  </li>
  <li>Error Response<br>
    Code: 404 NOT FOUND<br />
    Content: <code>Folder with id ${folder} not found.</code>
  </li>
  <li>Sample Call:
    <code>return fetch(`${config.API_ENDPOINT}/folders/${folder_id}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )},}</code>
  </li>
  
  <h2>Recipes</h2>
<ul>
  <li>URL<br/>
    /recipes
  </li>
  <li>Method:<br/>
    <code>GET</code>
  </li>
  <li>URL Params<br>
    None
  </li>
  <li>Data Params<br>
    None
  </li>
  <li>Success Response<br>
    Code: 200<br />
    Content: <code>{"id":1,"folderid":4,"name":"Cheesecake","ingredients":"Lorem ipsum","instructions":"Corporis accusamus placeat quas non voluptas. Harum fugit molestias qui. Velit ex animi reiciendis quasi}</code>
  </li>
  <li>Error Response<br>
    Code: 404 NOT FOUND<br />
    Content: <code>Cannot GET</code>
  </li>
  <li>Sample Call:
    <code>return fetch(`${config.API_ENDPOINT}/recipes`, {<br>
      headers: {<br>
      },<br>
    })<br>
      .then(res => <br>
         (!res.ok)<br>
          ? res.json().then(e => Promise.reject(e))<br>
          : res.json()<br>
      )},</code>
  </li>
  <li>Method:<br/>
    <code>POST</code>
  </li>
  <li>URL Params<br>
    Required:<br/>
    <code>folderid=[integer]</code><br/>
    <code>name=[text]</code><br/>
    <code>instructions=[text]</code><br/>
    <code>ingredients=[text]</code><br/>
  </li>
  <li>Data Params<br>
    None
  </li>
  <li>Success Response<br>
    Code: 201<br />
    Content: <code>Recipe with id ${recipe.id} created.</code>
  </li>
  <li>Error Response<br>
    Code: 400<br />
    Content: <code>error: { message: `Field '${field}' is required` }</code>
  </li>
  <li>Sample Call:
    <code>return fetch(`${config.API_ENDPOINT}/recipes`, {<br>
      headers: {<br>
      },<br>
    })<br>
      .then(res => <br>
         (!res.ok)<br>
          ? res.json().then(e => Promise.reject(e))<br>
          : res.json()<br>
      )},</code>
  </li>
  </ul>
  <br/>
  
  <h3>Get Recipe by ID</h3>
<ul>Get a single recipe.<br/>
  <li>URL<br/>
    /folders/:recipe_id
  </li>
  <li>Method:<br/>
    <code>GET</code>
  </li>
  <li>URL Params<br>
    Required:<br/>
    <code>recipe_id=[integer]</code>
  </li>
  <li>Data Params<br>
    None
  </li>
  <li>Success Response<br>
    Code: 200<br />
    Content: <code>{"id":1,"folderid":4,"name":"Cheesecake","ingredients":"Lorem ipsum","instructions":"Corporis accusamus placeat quas non voluptas. Harum fugit molestias qui. Velit ex animi reiciendis quasi.}</code>
  </li>
  <li>Error Response<br>
    Code: 404 NOT FOUND<br />
    Content: <code>Folder with id ${recipe} not found.</code>
  </li>
  <li>Sample Call:
    <code>return fetch(`${config.API_ENDPOINT}/recipes/${recipe_id}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )},}</code>
  </li>

Technology Used: Node, Express
Technology Used: Node, Express
