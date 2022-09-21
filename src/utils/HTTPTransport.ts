enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type TRequestData = Record<string, string | number>;

export type TRequestOptions = {
  method?: Methods
  headers?: Record<string, string>
  timeout?: number
  data?: unknown
};

function queryStringify(data: TRequestData) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get = (url: string, options: TRequestOptions = {}): Promise<XMLHttpRequest> => {
    url = this.endpoint + url
    if (!!options.data) {
      url = `${url}${queryStringify(options.data as TRequestData)}`;
    }
    return this.request(url, { ...options, method: Methods.GET });
  };

  public post = (url: string, options = {}): Promise<XMLHttpRequest> => {
    url = this.endpoint + url;
		// console.log('post-opt',options)
    return this.request(url, { ...options, method: Methods.POST })
  };

  public put = (url: string, options = {}): Promise<XMLHttpRequest> => {
    url = this.endpoint + url;
    return this.request(url, { ...options, method: Methods.PUT })
  };

  public delete = (url: string, options = {}): Promise<XMLHttpRequest> => { 
    url = this.endpoint + url;
    return this.request(url, { ...options, method: Methods.DELETE })
  };

  private request = (url: string, options: TRequestOptions = {}): any => {
    const {
      headers = {},
      method = Methods.GET,
      data,
      timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

			// console.log('headers', headers)
      Object.keys(headers).forEach((key) => {
				// console.log('headers-key',headers, key)
        xhr.setRequestHeader(key, headers[key]);
      });

			// если убрать, то нужно в контроллере менять поведение на user = response.response
			// функция из примера
			// xhr.onreadystatechange = (e) => {

      //   if (xhr.readyState === XMLHttpRequest.DONE) {
      //     if (xhr.status < 400) {
      //       resolve(xhr.response);
      //     } else {
      //       reject(xhr.response);
      //     }
      //   }
      // };

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

			// без нее нельзя!!!
			// xhr.setRequestHeader('Content-Type', 'application/json');
			// xhr.setRequestHeader('Content-Type', 'multipart/form-data');
			// xhr.setRequestHeader('accept', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';
			
			// console.log('HTTP-opt-data',options, data)
			// console.log('HTTP',JSON.stringify(data))
      if (!data) {
        xhr.send();
				// console.log('if')
      } else {
				// console.log('else')
				// console.log('HTTP', data.get('avatar'))
        xhr.send(data as any);
        // xhr.send(data as any);
      }
    });
  };
}
