let urlParams = new URLSearchParams(window.location.search);
let header_http = {
    "X-Auth-Token": "55ea38a93aae4e17afb8ddb99b393277"
}

function RestApi_GetLiga(idliga) {
    let resultGetLiga = new Promise(function (resolve, reject) {
        LoadingShow('flex');
        let surl = "https://api.football-data.org/v2/competitions/" + idliga + "/standings"

        if ("caches" in window) {
            caches.match(surl, { ignoreSearch: true }).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resolve(data)
                    });
                }
            });
        }

        fetch(surl, { headers: header_http }).then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json().then(function (data) {
                resolve(data)
            });
        }
        ).catch(function (err) {
            console.log('Fetch Error :-S', err);
            reject(err)
        });

    })
    resultGetLiga.then(function (response) {
        RenderData_PageHome(response);
        LoadingShow('none');
    }).catch(function (err) {
        console.log('error ' + err);
        LoadingShow('none');
    })
}

function RestApi_GetClub() {
    return new Promise(function (resolve, reject) {
        LoadingShow('flex');
        let idParam = urlParams.get("id");
        let surl = `https://api.football-data.org/v2/teams/${idParam}`

        fetch(surl, { headers: header_http }).then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json().then(function (data) {
                resolve(data);
            });
        }
        ).catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    })
}

function RenderData_PageHome(dataset) {
    document.getElementById("main_data").innerHTML = ''
    let datafootbal = dataset.standings
    for (let i = 0; i < datafootbal.length; i++) {

        let dataclub = datafootbal[i].table
        for (let i = 0; i < dataclub.length; i++) {
            let chil_component = document.createElement('div');
            chil_component.classList = 'col s12 m4'
            chil_component.innerHTML = `
                <a href="/article.html?id=${dataclub[i].team.id}">
                    <div class="card waves-effect waves-block" style="padding-top:20px;">
                        
                        <div class="card-image">
                            <img src="${dataclub[i].team.crestUrl}" alt="football" style="max-height:150px;object-fit: scale-down;">
                        </div>
                        
                        <div class="card-content">
                            <p>${dataclub[i].team.name}</p>
                        </div>
                    </div>
                </a>`
            document.getElementById("main_data").appendChild(chil_component);
        }
    }
}

function RenderData_PageFavorite() {
    LoadingShow('flex');

    DBShowAll().then(function (articles) {
        // Menyusun komponen card artikel secara dinamis
        articles.forEach(function (article) {
            let chil_component = document.createElement('div');
            chil_component.classList = 'col s12 m4'
            chil_component.innerHTML = `
                <a href="/article.html?id=${article.id}&mode=save">
                    <div class="card waves-effect waves-block" style="padding-top:20px;">
                        
                        <div class="card-image">
                            <img src="${article.crestUrl}" alt="T-Shirt" style="max-height:150px;object-fit: scale-down;">
                        </div>
                        
                        <div class="card-content">
                            <p>${article.name}</p>
                        </div>
                    </div>
                </a>`
            document.getElementById("main_data").appendChild(chil_component);
        });


        LoadingShow('none');
    });
}

function RenderData_Article(dataset) {
    let mode = urlParams.get("mode");
    let url = ''
    if (!mode) url = `/article.html?id=${dataset.id}&mode=save`
    else url = `/article.html?id=${dataset.id}`

    let data_main = document.getElementById("main_data");

    let chil_component = document.createElement('div');
    chil_component.classList = 'col s12 m4'
    chil_component.innerHTML = `
            <div class="card" style="padding-top:20px;">
                
                <div class="card-image">
                    <img src="${dataset.crestUrl}" alt="football" style="max-height:150px;object-fit: scale-down;">
                </div>
                
                <div class="card-content">
                    <div class="row">
                    <div class="col s12 m3">
                        <b>Nama Club</b>
                    </div>
                    <div class="col s12 m6">
                        ${dataset.name}
                    </div>
                    </div>
                    <div class="row">
                    <div class="col s12 m3">
                        <b>Negara</b>
                    </div>
                    <div class="col s6">
                        ${dataset.name}
                    </div>
                    </div>
                    <div class="row">
                    <div class="col s12 m3">
                        <b>Phone</b>
                    </div>
                    <div class="col s6">
                        ${dataset.phone}
                    </div>
                    </div>
                    <div class="row">
                    <div class="col s12 m3">
                        <b>Email</b>
                    </div>
                    <div class="col s6">
                        ${dataset.email}
                    </div>
                    </div>
                    <div class="row">
                    <div class="col s12 m3">
                        <b>Website</b>
                    </div>
                    <div class="col s6">
                        ${dataset.website}
                    </div>
                    </div>
                </div>
            </div>
          `
    data_main.appendChild(chil_component);
}


// Function for system notification


function showNotifikasiSederhana() {
    const title = 'Notifikasi Sederhana';
    const options = {
        'body': 'Ini adalah konten notifikasi. \nBisa menggunakan baris baru.',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}

function showNotifikasiRequireInteraction() {
    const title = 'Notifikasi yang meminta interaksi pengguna';
    const options = {
        requireInteraction: true,
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

function showNotifikasiIkon() {
    const title = 'Notifikasi Sederhana';
    const options = {
        'body': 'Ini adalah konten notifikasi dengan gambar ikon.',
        'icon': '/img/logo.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

function showNotifikasiBadge() {
    const title = 'Notifikasi dengan Badge';
    const options = {
        'body': 'Ini adalah konten notifikasi dengan gambar badge.',
        'badge': '/img/logo.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

function showNotifikasiActions() {
    const title = 'Notifikasi dengan Actions';
    const options = {
        'body': 'Ini adalah konten notifikasi dengan pilihan actions.',
        'actions': [
            {
                'action': 'yes-action',
                'title': 'Ya',
            },
            {
                'action': 'no-action',
                'title': 'Tidak',
            }
        ]
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}

function LoadingShow(mode) {
    if (mode == 'none') setTimeout(function () { document.getElementById('divloading').style.display = 'none'; }, 500);
    else document.getElementById('divloading').style.display = 'flex';
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
    Notification.requestPermission().then(function (result) {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
        }
        console.log("Fitur notifikasi diijinkan.");
    });
}

function loadPage(page) {
    fetch(`pages/${page}.html`).then(function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }
        response.text().then(function (data) {
            let body = document.getElementById('body-content');
            body.innerHTML = data;

            var elems1 = document.querySelectorAll('select');
            M.FormSelect.init(elems1, {});

            if (page == 'home') RestApi_GetLiga('2001')
            else if (page == 'favorite') RenderData_PageFavorite();
        });
    }
    ).catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}

function loadNav(ctx) {
    let sidenav = document.querySelector(".sidenav");
    M.Sidenav.getInstance(sidenav).close();

    page = ctx.getAttribute("href").substr(1);
    loadPage(page);
}

function ActionButton() {
    if (isThere) {
        DBDelete(article.id)
        M.toast({ html: 'Data dihapus dari daftar favorite' });
        isThere = false;
        document.getElementById('iconbtn').innerHTML = 'save';
        // alert('Data dihapus dari daftar favorite');
        // location.reload();
    } else {
        DBSave(article);
        M.toast({ html: 'Data disimpan di daftar favorite' });
        isThere = true;
        document.getElementById('iconbtn').innerHTML = 'delete';
        // alert('Data disimpan di daftar favorite');
        // location.reload();
    }
    // window.history.back()
}