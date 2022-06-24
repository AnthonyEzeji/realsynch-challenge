const axios = require('axios')


class weather{

    async getWeather(city){
        try {
            let request = await axios.get(`http://api.weatherapi.com/v1/current.json?key=2d67d04c726a426f99771430222406&q=${city}`)
            return request.data
        } catch (error) {
            
            throw new Error(error)
        }
        
    }

}
module.exports = weather