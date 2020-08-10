var dbPromised = idb.open("news-reader", 1, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("articles", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function DBSave(article) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("articles", "readwrite");
      var store = tx.objectStore("articles");
      store.add(article);
      return tx.complete;
    })
    .then(function () {
      console.log("Artikel berhasil di simpan.");
    });
}

function DBDelete(id) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("articles", "readwrite");
      var store = tx.objectStore("articles");
      store.delete(id);
      return tx.complete;
    })
    .then(function () {
      console.log("Artikel berhasil di simpan.");
    });
}

function DBShowAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.getAll();
      })
      .then(function (articles) {
        resolve(articles);
      });
  });
}

function DBShowItem(idteam) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        // var tx = db.transaction("articles", "readonly");
        // var store = tx.objectStore("articles");
        // return store.getAll();

        var tx = db.transaction('articles', 'readonly');
        var store = tx.objectStore('articles');
        return store.get(idteam);
      })
      .then(function (articles) {
        resolve(articles);
      });
  });
}