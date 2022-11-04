class Api {
  
  /** @description headers.
   * @return {any} header object 
   */
  static count = 0;
  static statuscode;
   
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
    }
  }

  /** @description headers with session id.
   * @return {any} header object 
   */
  static headersWithProps(props) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'Authorization': `Bearer ${props.authorization}`
    }
  }

  static xhr(headerProps, url, params, verb) {
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    
    if (headerProps) {
      options.headers = Api.headersWithProps(headerProps);
    } else {
      options.headers = Api.headers();
    }

    return fetch(url, options)
      .then(resp => {
        let json = resp.json();

	      this.count = resp.headers.get("x-total-count");
        this.statuscode = resp.status;

        if (resp.ok) {
          return json
        }

        return json.then(err => {throw err});

      })
      .then(res => {
        var resObj = {
          body: res,
          statuscode: this.statuscode
        }
        return resObj
      })
      .catch(error => {
        if(this.statuscode==204 || this.statuscode==200) {
          var resObj = {
            body: {success: true},
            statuscode: this.statuscode
          }
          return resObj
        }
        else {
          throw error
        }
      })
  }
}
export default Api