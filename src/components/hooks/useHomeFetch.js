import { useState, useEffect } from 'react';
import { POPULAR_BASE_URL } from '../../config';
// create a customer hook
export const useHomeFetch = (searchTerm) =>{
        //create hook state
        const [state,setState] = useState({movies:[]});
        const [loading,setLoading] = useState(false);
        const [error,setError] = useState(false);
        
        const fetchMovies = async endpoint =>{
            setError(false);
            setLoading(true);
            //if it contain page then it is from popularEndpoint
            const isLoadMore = endpoint.search('page');
            try{
                const result =  await (await fetch(endpoint)).json();
                setState(prev =>({
                    // copy own state,
                    ...prev,
                    movies: isLoadMore !== -1 ?
                    // append previously result into current results
                    [...prev.movies,...result.results] :[...result.results],
                    heroImage:prev.heroImage || result.results[0],
                    currentPage: result.page,
                    totalPages:result.total_pages
                }));
    
            }catch (err) {
                setError(true);
                console.log(error);
            }
            setLoading(false);
    
        }
    
        useEffect(()=>{
            //get data from sessionStorage
            if(sessionStorage.homeState){
                setState(JSON.parse(sessionStorage.homeState));
                setLoading(false);

            }else{
                fetchMovies(POPULAR_BASE_URL);
            }

        },[])

        useEffect(()=>{
            //save into session storage when we have no searchTerm
            if(!searchTerm){
                sessionStorage.setItem('homeState',JSON.stringify(state));
            }

        },[searchTerm,state])

        return [{state,loading,error},fetchMovies];
}