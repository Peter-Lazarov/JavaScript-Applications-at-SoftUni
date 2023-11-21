import { homePage } from "./home.js";

export function deleteMovie(event, movieId, user) {
    event.preventDefault();

    // try {
    //     const response = await fetch(`http://localhost:3030/data/movies/${movieId}`, {
    //         method: 'delete',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-Authorization': user.accessToken
    //         }
    //     });

    //     if(response.ok){
    //         event.target.parentElement.remove();
    //     }else{
    //         throw new Error("Movie not found");
    //     }
    // } catch (error) {
    //     throw new Error(error);
    // }

    fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        }
    });

    homePage();
}
