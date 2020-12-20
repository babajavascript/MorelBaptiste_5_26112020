function ajax({ url, method, status, data }) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == status) {
                resolve(this.responseText);
            }
            else if (this.readyState == 4 && this.status != status) {
                reject(this.responseText);
            }
        }
        request.open(method, 'http://localhost:3000/api' + url);

        if (method === 'POST') {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        }
        request.send(JSON.stringify(data));
    })
}