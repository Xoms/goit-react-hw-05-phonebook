import axios from 'axios';

// const API_KEY_V3 = process.env.REACT_APP_TMDB_API_KEY_V3; 
    /*на всякий случай - если ключ в строку добавлять, 
    а так везде тулим options 'Authorization': `Bearer ${API_KEY_V4}`*/

const API_KEY_V4 = process.env.REACT_APP_TMDB_API_KEY_V4;

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/'

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY_V4}`

class FilmotekaApi {

    _page = 1;
    _lang = 'en';


    set page(val) {
        this._page = val;
    }

    get page (){
        return this._page;
    }

    set lang(val){
        this._lang = val; 
    }

    get lang(){
        return this._lang
    }

    async getTrends(viewPage) { 
        let res = await axios(`discover/movie?sort_by=popularity.desc&page=${viewPage}&language=${this._lang}`)
            .then(async ({data}) => {
                // console.log(data)
                return data.results.map( ({id, title})=> ({id, title}) )
            })
        
        return res;
    }
    

    getMoviesByQuery(query){ // 20 по запросу постранично
        return axios(`search/movie?language=${this._lang}&query=${query}&page=${this._page}`) //change multi to movie
            .then(({data}) => {
                const imgArr = data.results.map( ({poster_path}) => poster_path ? 
                `${IMG_BASE_URL}w500${poster_path}` :
                `https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg`
                )
                // console.dir(data.results);
                return {'movies': data.results, 'posters': imgArr}
            })
    }

    async getAllResults(query){ //Все фильмы по запросу
        this._page = 1;
        let currentRes = await this.getMoviesByQuery(query);
        let resultsArr = [currentRes];
        for (let i = 1; i < currentRes.movies.total_pages; i++) {
            this._page++;
            resultsArr.push(this.getMoviesByQuery(query));

        }
        //console.log(resultsArr);
        return Promise.all(resultsArr);
    }

    getMovieById(id){ //конкретный фильм
        return axios(`/movie/${id}`)
            .then(({data}) => {
                let {
                    id, title, poster_path, vote_average, overview, genres, release_date

                } = data;
                poster_path = poster_path ? IMG_BASE_URL+'w500'+ poster_path : `${process.env.PUBLIC_URL}/img/notFound.png`;
                genres = genres.map(({name}) => name + ' ');
                return {id, title, poster_path, vote_average, overview, genres, release_date}
            })
    }

    getCast(id){ //в ролях
        return axios(`/movie/${id}/credits`)
            .then(({data}) => {
                console.log(data);
                return data.cast.map( ({id, name, profile_path, character}) => {
                    profile_path = profile_path ? IMG_BASE_URL+'w500'+ profile_path : `${process.env.PUBLIC_URL}/img/notFound.png`;
                    return {id, name, profile_path, character}
                })
            })
    }

    getReviews(id){ //коменты
        return axios(`/movie/${id}/reviews`)
            .then( ({data}) => {
                console.log(data);
                return data.results.map(({id, author, content}) => ({id, author, content}))
            })
    }
}

export default new FilmotekaApi();