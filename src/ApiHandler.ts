import * as he from "he";
import strings from "./Localization";

export const postData = (url: string, data: {}, customerID: string, textResponse?: boolean) => {
    return new Promise<any>((resolve, reject) => {
        fetch(url, {
            ...buildHeaders("POST", customerID),
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    if (textResponse) {
                        resolve(response.text());
                    } else {
                        parseAsJson(response).then((json) => resolve(decodeValues(json)));
                    }
                } else {
                    rejectResponse(response).then((reason) => reject(reason));
                }
            }).catch(() => reject({
                Status: undefined,
                Message: strings.TODO,
            }));
    });
};

export const postFile = (url: string, data: File) => {
    return new Promise<any>((resolve, reject) => {
        if (data.size > 8388608) {
            reject({
                Status: 400,
                Message: strings.formatString(strings.TODO, data.name),
            });
        }
        const form = new FormData();
        form.append("file", data);
        const headers: any = {
            Accept: "application/json",
        };

        fetch(url, {
            method: "POST",
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers,
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: form,
        }).then((response) => {
            if (response.ok) {
                parseAsJson(response).then((json) => resolve(json), (reason) => reject(reason));
            } else {
                rejectResponse(response).then((reason) => reject(reason));
            }
        }, () => reject({
            Status: undefined,
            Message: strings.TODO,
        }));
    });
};

export const putData = (url: string, data: {}, customerID?: string) => {
    return new Promise<any>((resolve, reject) => {
        fetch(url, {
            ...buildHeaders("PUT", customerID),
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    parseAsJson(response).then((json) => resolve(decodeValues(json)));
                } else {
                    rejectResponse(response).then((reason) => reject(reason));
                }
            }).catch(() => reject({
                Status: undefined,
                Message: strings.TODO,
            }));
    });
};

export const getData = (url: string, customerID?: string) => {
    return new Promise<any>((resolve, reject) => {
        fetch(url, buildHeaders("GET", customerID))
            .then((response) => {
                if (response.ok) {
                    parseAsJson(response).then((json) => resolve(decodeValues(json)), (reason) => reject(reason));
                } else {
                    rejectResponse(response).then((reason) => reject(reason));
                }
            }).catch(() => reject({
                Status: undefined,
                Message: strings.TODO,
            }));
    });
};

export const buildUrl = (base: string, path: string) => {
    while (base.endsWith("/")) {
        base = base.substr(0, base.length - 1);
    }
    while (path.startsWith("/")) {
        path = path.substr(1, path.length);
    }
    return `${base}/${path}`;
};

export const buildHeaders = (method: string, customerID?: string): RequestInit => {
    return {
        method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    };
};

const rejectResponse = (response: Response) => {
    return new Promise<any>((resolve) => {
        parseAsJson(response).then((json: any[]) => {
            let messages = "";
            for (let index = 0; index < json.length; index++) {
                if (json[index].message) {
                    messages += json[index].message + "\n";
                }
                if (messages.length > 1) {
                    messages.substr(0, messages.length - 2);
                }
            }
            switch (response.status) {
                case 400:
                    resolve({
                        Status: 400,
                        Message: messages ? messages : strings.TODO,
                    });
                case 401:
                    resolve({
                        Status: 401,
                        Message: messages ? messages : strings.TODO,
                    });
                case 404:
                    resolve({
                        Status: 404,
                        Message: messages ? messages : strings.TODO,
                    });
                case 500:
                    resolve({
                        Status: 500,
                        Message: messages ? messages : strings.TODO,
                    });
            }
        }, (reason) => resolve(reason));
    });
};

const decodeValues = (obj: any) => {
    if (!obj) {
        return obj;
    }
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        const prop = obj[key];
        switch (typeof prop) {
            case "string": {
                obj[key] = he.decode(prop);
                break;
            }
            case "object": { // should also work for arrays...
                obj[key] = decodeValues(prop);
                break;
            }
        }
    }
    return obj;
};

const parseAsJson = (response: Response): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        response.json().then((data) => {
            resolve(data);
        }, (reason) => reject({ Status: `${response.status} - No JSON`, Message: reason.toString() }));
    });
};
