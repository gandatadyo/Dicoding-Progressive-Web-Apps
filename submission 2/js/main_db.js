let dbPromised = idb.open("footbal-data.org", 1, function (upgradeDb) {
    let mydataObjectStore = upgradeDb.createObjectStore("mydata", {
        keyPath: "id"
    });
    mydataObjectStore.createIndex("name", "name", {
        unique: false
    });
});

function DBSave(data) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("mydata", "readwrite");
            let store = tx.objectStore("mydata");
            store.add(data);
            return tx.complete;
        })
        .then(function () {
            console.log("Data berhasil di simpan.");
        });
}

function DBDelete(id) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("mydata", "readwrite");
            let store = tx.objectStore("mydata");
            store.delete(id);
            return tx.complete;
        })
        .then(function () {
            console.log("Data berhasil di simpan.");
        });
}

function DBShowAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("mydata", "readonly");
                let store = tx.objectStore("mydata");
                return store.getAll();
            })
            .then(function (mydata) {
                resolve(mydata);
            })
            .catch(function (error) {
                reject(error)
            });
    });
}

function DBShowItem(idteam) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction('mydata', 'readonly');
                var store = tx.objectStore('mydata');
                return store.get(idteam);
            })
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            });
    });
}