/**
 * @name SearchableList.js
 * @author Mark Heard
 * @version 1.0
 * @copyright 2021
 * @component A simple header comoponent used to display a title logo
 */

 import { useEffect, useState } from "react";
 import { useAuth0 } from "@auth0/auth0-react";
 import { Link, useParams } from "react-router-dom";
 import CustomTextInput from "./CustomTextInput.js";
 
 const SearchableList = props => {
     const { getAccessTokenSilently } = useAuth0();
 
     const [data, setData] = useState([]);
     const [query, setQuery] = useState('');
     //const [queryFocused, setQueryFocused] = useState(false);
 
 
     async function getData(url = '', data = {}) {
         // Default options are marked with *
         const accessToken = await getAccessTokenSilently({
             audience: `fitStat`,
         });
 
         const response = await fetch(url, {
             method: 'GET', // *GET, POST, PUT, DELETE, etc.
             mode: 'cors', // no-cors, *cors, same-origin
             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
             credentials: 'same-origin', // include, *same-origin, omit
             headers: {
                 'Authorization': `Bearer ${accessToken}`
                 // 'Content-Type': 'application/x-www-form-urlencoded',
             },
             redirect: 'follow', // manual, *follow, error
             referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
         });
         return response.json(); // parses JSON response into native JavaScript objects
     }
 
     useEffect(() => {
         getData(`http://localhost:5000/${props.endpoint}`)
             .then(res => {
                 if(res[props.responseKey]!==undefined){
                     setData(res[props.responseKey]);
                 }
                  // JSON data parsed by `data.json()` call
             });
     }, [])
 
 
     return (
 
         // a header tag is returned as the parent element to keep HTML semantic
 
         <div id={`search-list`}>
 
             <div className='form-field'>
 
                 <CustomTextInput
                     type='text'
                     name='query'
                     label={`search ${props.title}`}
                     value={query}
                     onChange={setQuery}
                 />
 
             </div>
 
             <div>
                 {
                     query.length === 0 ?
                         data.map((item, i) => {
                             return (<Link key={i} className='search-list-item' to={`/${props.title}/${item.id}`}>{item.name}</Link>);
                         })
                         :
                         data.filter(item => item.name.toUpperCase().indexOf(query.toUpperCase()) > -1)
                             .map((item, i) => {
                                 return (<Link key={i} className='search-list-item' to={`/${props.title}/${item.id}`}>{item.name}</Link>);
                             })
                 }
             </div>
         </div>
 
     );
 
 }
 
 //ES6 export statement
 export default SearchableList;