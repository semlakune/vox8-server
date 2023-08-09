const instance = require('../helpers/axios');

class Controllers {
    static constructImageUrl(path) {
        return path ? `https://image.tmdb.org/t/p/original${path}` : null;
    }

    static mapResults(data) {
        return data.map(item => {
            const { id, title, name, poster_path, release_date, vote_average, backdrop_path } = item;
            const poster = this.constructImageUrl(poster_path);
            const backdrop = this.constructImageUrl(backdrop_path);

            if (!poster) return null;
            return {
                id,
                title: title || name,
                poster,
                backdrop,
                release_date,
                vote_average
            };
        });
    }

    static async fetchData(endpoint, params) {
        return await instance.get(endpoint, { params });
    }

    static async getResults(req, res, endpoint) {
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
        return this.getResults(req, res, 'popular', next);
    }

    static getTopRated(req, res, next) {
        return this.getResults(req, res, 'top_rated', next);
    }

    static async getDetail(req, res, next) {
        try {
            const { id, group } = req.params;
            const { data } = await this.fetchData(`/${group}/${id}`);
            const poster = this.constructImageUrl(data.poster_path);
            const backdrop = this.constructImageUrl(data.backdrop_path);
            const { title, release_date, vote_average, overview, genres, runtime } = data;

            res.status(200).json({ id, title, poster, backdrop, release_date, vote_average, overview, genres, runtime });

        } catch (error) {
            next(error);
        }
    }

    static async getSearch(req, res, next) {
        try {
            const { query, page } = req.query;
            const { group } = req.params;
            const response = await this.fetchData(`/search/${group}`, { query, page });

            if (!response.data.results.length) throw { name: 'not_found' };

            res.status(200).json({ ...response.data, results: this.mapResults(response.data.results) });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controllers;
