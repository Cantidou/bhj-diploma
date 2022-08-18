/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
     const xhr = new XMLHttpRequest;
     xhr.responseType = 'json';
     if (options.method == 'GET') {
         try {
             if ( options.data != null && options.data.password != undefined) {
                 xhr.open('GET', `${options.url}?mail=${options.data.email}&password=${options.data.password}`);
             }
             else {
                 xhr.open('GET', options.url);
             }
             xhr.send();
             xhr.addEventListener('readystatechange', () => {
                 if (xhr.readyState == xhr.DONE) {
                     if (xhr.response.success) {
                         options.callback(xhr.response.error, xhr.response);
                     }
                     else {
                         options.callback(xhr.response.error);
                     }
                 }
             });

         }
         catch (e) {
             options.callback(e);
         }
     }
     else {
         try {
             if (options.method == 'DELETE') {
                 if (options.data != null) {
                     xhr.open(options.method, options.url + options.data);
                     xhr.send();
                 }
                 else {
                     xhr.open(options.method, options.url);
                     xhr.send();
                 }
             }
             else {
                 let formData = new FormData;
                 for (let key in options.data) {
                     formData.append(key, options.data[key]);
                 }
                 xhr.open(options.method, options.url);
                 xhr.send(formData);
             }

             xhr.addEventListener('readystatechange', () => {
                 if (xhr.readyState == xhr.DONE) {
                     if (xhr.response.success) {
                         options.callback(xhr.response.error, xhr.response);
                     }
                     else {
                         options.callback(xhr.response.error);
                     }
                 }
             });
         }
         catch (e) {
             options.callback(e);
         }
     }
 };
