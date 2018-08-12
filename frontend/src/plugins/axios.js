import * as axios from 'axios'

let options = {}
options.timeout = 60000
options.baseURL = `http://127.0.0.1:4000`
options.withCredentials = true

export default axios.create(options)