/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
     if (options.data && options.data.addUrl) {
         options.url += options.data.addUrl;
     }

     /*const xhr = new XMLHttpRequest();

     let url = options.url;
     const formData = new FormData();

     if (options.data) {
       if (options.method == 'GET') {
         url += '?' + Object.entries(options.data).map(
           ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
         ).join('&');
       } else {
         Object.entries(options.data).forEach(v => formData.append(...v));
       }
     }

     xhr.onreadystatechange = () => {
       if (xhr.readyState === XMLHttpRequest.DONE) {
         let err = null;
         let resp = null;

         if (xhr.status === 200) {
           const r = xhr.response;
           if (r && r.success) {
             resp = r;
           } else {
             err = r;
           }
         } else {
           err = new Error()
         }

         options.callback(err, resp);
       }
     }

     xhr.open(options.method, url);
     xhr.send(formData);*/

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
                   let formData = new FormData;
                   for (let key in options.data) {
                       formData.append(key, options.data[key]);
                   }
                     xhr.open(options.method, options.url); // + options.data удалил
                     xhr.send(formData);
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
