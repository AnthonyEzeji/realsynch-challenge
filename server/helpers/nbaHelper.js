const axios = require('axios')

class nba{

    async getTeams(){
        try {
            let request = await axios.get('https://www.balldontlie.io/api/v1/teams')
            return request.data
        } catch (error) {
            
            throw new Error(error)
        }
        
    }

}
module.exports = nba