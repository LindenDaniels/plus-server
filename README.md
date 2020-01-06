<h1>Plus Server</h1>

This is the API for the Grocery Plus app found here: https://github.com/LindenDaniels/groceryplus-client/tree/add-styling
<h2>Folders</h2>
<ul>
  <li>URL<br/>
    /folders
  </li>
  <li>Method:<br/>
    GET
  </li>
  <li>URL Params<br>
    None
  </li>
  <li>Data Params<br>
    None
  </li>
  <li>Success Response<br>
    Code: 200<br />
    Content: {"id":1,"name":"Christmas","items":"Cookies, Almond Milk, Wrapping Paper, Chocolate chips"}
  </li>
  <li>Error Response<br>
    Code: 404 NOT FOUND
    Content: Cannot GET
  </li>
  <li>Sample Call:
    return fetch(`${config.API_ENDPOINT}/folders`, {
      headers: {
      },
    })
      .then(res => 
         (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  </li>

Technology Used: Node, Express
