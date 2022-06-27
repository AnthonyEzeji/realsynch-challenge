const axios = require('axios')


class weather{
//Send get request to http://api.weatherapi.com/v1/current.json?key=2d67d04c726a426f99771430222406&q=${city} with city param and send data`
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