const instance = require('../helpers/axios')

class Controllers {
    static async getNowPlaying(req, res, next) {
        try {
            const {page} = req.query
            const moviesNowPlaying = await instance.get('/movie/now_playing', {
                params: {page}
            })

            const {results} = moviesNowPlaying.data
            const movies = results.map(movie => {
                const {id, title, poster_path, release_date, vote_average} = movie
                const poster = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : null

                return {id, title, poster, release_date, vote_average}
            })

            res.status(200).json({...moviesNowPlaying.data, results: movies})

        } catch (error) {
            next(error)
        }
    }

    static async getPopular(req, res, next) {
        try {
            const {page} = req.query
            const moviesPopular = await instance.get('/movie/popular', {
                params: {page}
            })
            const {results} = moviesPopular.data
            const movies = results.map(movie => {
                const {id, title, poster_path, release_date, vote_average} = movie
                const poster = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : null

                return {id, title, poster, release_date, vote_average}
            })

            res.status(200).json({...moviesPopular.data, results: movies})

        } catch (error) {
            next(error)
        }
    }

    static async getTopRated(req, res, next) {
        try {
            const {page} = req.query
            const moviesTopRated = await instance.get('/movie/top_rated', {
                params: {page}
            })

            const {results} = moviesTopRated.data
            const movies = results.map(movie => {
                const {id, title, poster_path, release_date, vote_average} = movie
                const poster = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : null

                return {id, title, poster, release_date, vote_average}
            })

            res.status(200).json({...moviesTopRated.data, results: movies})

        } catch (error) {
            next(error)
        }
    }

    static async getUpcoming(req, res, next) {
        try {
            const {page} = req.query
            const moviesUpcoming = await instance.get('/movie/upcoming', {
                params: {page}
            })
            const {results} = moviesUpcoming.data
            const movies = results.map(movie => {
                const {id, title, poster_path, release_date, vote_average} = movie
                const poster = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : null

                return {id, title, poster, release_date, vote_average}
            })

            res.status(200).json({...moviesUpcoming.data, results: movies})
        } catch (error) {
            next(error)
        }
    }

    static async getMovieDetail(req, res, next) {
        try {
            const {id} = req.params
            const {data} = await instance.get(`/movie/${id}`)

            const {title, poster_path, backdrop_path, release_date, vote_average, overview, genres, runtime} = data
            const poster = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : null
            const backdrop = backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : null

            res.status(200).json({id, title, poster, backdrop, release_date, vote_average, overview, genres, runtime})

        } catch (error) {
            next(error)
        }
    }

    static async getMovieSearch(req, res, next) {
        try {
            const {query, page} = req.query
            const movieSearch = await instance.get('/search/movie', {
                params: {query, page}
            })

            const {results} = movieSearch.data

            if (!results.length) throw {name: 'not_found'}

            const movies = results.map(movie => {
                const {id, title, poster_path, release_date, vote_average} = movie
                const poster = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : null

                return {id, title, poster, release_date, vote_average}
            })

            res.status(200).json({...movieSearch.data, results: movies})

        } catch (error) {
            next(error)
        }
    }


}

module.exports = Controllers