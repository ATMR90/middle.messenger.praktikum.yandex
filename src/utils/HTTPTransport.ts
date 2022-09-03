enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
};

type TRequestData = Record<string, string | number>;

export type TRequestOptions = {
	method?: METHODS
	headers?: Record<string, string>
	timeout?: number
	data?: unknown
};

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data: TRequestData) {
	if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

	// Здесь достаточно и [object Object] для объекта
	const keys = Object.keys(data);
	return keys.reduce((result, key, index) => {
		return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
	}, '?');
}

class HTTPTransport {


	public get = (url: string, options = {}): Promise<XMLHttpRequest> => {

		return this.request(url, { ...options, method: METHODS.GET });
	};

	public post = (url: string, options = {}): Promise<XMLHttpRequest> => {
		return this.request(url, { ...options, method: METHODS.POST });
	};

	public put = (url: string, options = {}): Promise<XMLHttpRequest> => {
		return this.request(url, { ...options, method: METHODS.PUT });
	};

	public delete = (url: string, options = {}): Promise<XMLHttpRequest> => {
		return this.request(url, { ...options, method: METHODS.DELETE });
	};

	request = (url: string, options: TRequestOptions = {}): any => {
		const { 
		headers = {},
		method = METHODS.GET,
		data,
		timeout = 5000
		} = options;



		return new Promise(function (resolve, reject) {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;

			xhr.open(
				method,
				isGet && !!data
					? `${url}${queryStringify(data as TRequestData)}`
					: url,
			);

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else {
				xhr.send(data as any);
			}
		});
	};
}