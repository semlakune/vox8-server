const instance = require('../helpers/axios');
const { getColor } = require('colorthief');


class Controllers {
    static constructImageUrl(path) {
        return path ? `https://image.tmdb.org/t/p/original${path}` : null;
    }

    static  mapResults(data) {
        return data.map(item => {
            const { id, title, name, poster_path, release_date, vote_average, backdrop_path, media_type } = item;
            const poster = this.constructImageUrl(poster_path);
            const backdrop = this.constructImageUrl(backdrop_path);
            let formattedVote = parseFloat(vote_average).toFixed(1);

            if (!poster) return null;
            return {
                id,
                title: title || name,
                poster,
                backdrop,
                release_date,
                vote_average: formattedVote,
                group: media_type || ""
            };
        })
            .filter(Boolean);
    }

    static async fetchData(endpoint, params) {
        return await instance.get(endpoint, { params });
    }

    static async getResults(req, res, endpoint, next) {
        try {
            const { page } = req.query;
            const { group } = req.params;
            const response = await this.fetchData(`/${group}/${endpoint}`, { page });
            res.status(200).json({ ...response.data, results: this.mapResults(response.data.results) });
        } catch (error) {
            next(error);
        }
    }

    static getPopular(req, res, next) {
        return Controllers.getResults(req, res, 'popular', next);
    }

    static getTopRated(req, res, next) {
        return Controllers.getResults(req, res, 'top_rated', next);
    }

    static async getDetail(req, res, next) {
        try {
            const { id, group } = req.params;
            const { data } = await Controllers.fetchData(`/${group}/${id}`);
            const poster = Controllers.constructImageUrl(data.poster_path);
            const backdrop = Controllers.constructImageUrl(data.backdrop_path);
            const { title, name, release_date, vote_average, overview, genres, runtime } = data;

            res.status(200).json({ id, title: title || name, poster, backdrop, release_date, vote_average, overview, genres, runtime });

        } catch (error) {
            next(error);
        }
    }

    static async getSearch(req, res, next) {
        try {
            const { query, page } = req.query;
            const response = await Controllers.fetchData(`/search/multi`, { query, page });

            if (!response.data.results.length) throw { name: 'not_found' };

            res.status(200).json({ ...response.data, results: Controllers.mapResults(response.data.results) });

        } catch (error) {
            next(error);
        }
    }

    static async getTrending(req, res, next) {
        try {
            const { time } = req.params;
            const { page } = req.query;
            const response = await Controllers.fetchData(`/trending/all/${time}`, { page });
            res.status(200).json({ ...response.data, results: Controllers.mapResults(response.data.results) });
        } catch (error) {
            next(error);
        }
    }

    static async getSimilar(req, res, next) {
        try {
            const { id, group } = req.params;
            const { page } = req.query;
            const response = await Controllers.fetchData(`/${group}/${id}/similar`, { page });
            res.status(200).json({ ...response.data, results: Controllers.mapResults(response.data.results) });
        } catch (error) {
            next(error);
        }
    }

    static async getDominantColor(req, res, next) {
        try {
            const { imagePath } = req.query;
            const dominantColor = await getColor(imagePath);
            res.status(200).json({ dominantColor });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getAiringToday(req, res, next) {
        try {
            const { page } = req.query;
            const response = await Controllers.fetchData(`/tv/airing_today`, { page });
            res.status(200).json({ ...response.data, results: Controllers.mapResults(response.data.results) });
        } catch (error) {
            next(error);
        }
    }

    static async getOnTheAir(req, res, next) {
        try {
            const { page } = req.query;
            const response = await Controllers.fetchData(`/tv/on_the_air`, { page });
            res.status(200).json({ ...response.data, results: Controllers.mapResults(response.data.results) });
        } catch (error) {
            next(error);
        }
    }

    static async getNowPlaying(req, res, next) {
        try {
            const { page, region } = req.query;
            const response = await Controllers.fetchData(`/movie/now_playing`, { page, region });
            res.status(200).json({ ...response.data, results: Controllers.mapResults(response.data.results) });
        } catch (error) {
            next(error);
        }
    }

    static async getUpcoming(req, res, next) {
        try {
            const { page, region } = req.query;
            const response = await Controllers.fetchData(`/movie/upcoming`, { page, region });
            res.status(200).json({ ...response.data, results: Controllers.mapResults(response.data.results) });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controllers;
