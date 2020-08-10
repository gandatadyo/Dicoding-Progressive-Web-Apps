function LoadNavbar() {
    return new Promise((resolve, reject) => {
        fetch('nav.html')
            .then(response => response.text())
            .then(data => {
                resolve(data)
                document.getElementById('nav').innerHTML = data;
            })
            .catch((error) => reject(error));
    })
}

function LoadPage(page) {
    let sidenav = document.querySelector(".sidenav");
    M.Sidenav.getInstance(sidenav).close();

    let surl = null;
    if (page == 'home') surl = 'pages/list_league.html'
    else if (page == 'standings') surl = 'pages/list_standings.html'
    else if (page == 'team') surl = 'pages/info_team.html'
    else if (page == 'favorite') surl = 'pages/list_favorite.html'
    else if (page == 'favorite_team') surl = 'pages/info_team_favorite.html'
    else {
        page = 'home';
        surl = 'pages/list_league.html';
    }

    if (page != 'standings' && page != 'team' && page != 'favorite_team')
        history.pushState(null, null, "?page=" + page)
    if (surl) {
        fetch(surl)
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
                let render = new Render();
                if (page == 'home') render.RenderDataLiga()
                else if (page == 'standings') render.RenderDataStanding()
                else if (page == 'team') render.RenderDataTeam();
                else if (page == 'favorite') render.RenderDataFavorite();
                else if (page == 'favorite_team') render.RenderDataTeamFavorite();
            });
    }
}

function LoadStanding(ctx) {
    let idleague = ctx.getAttribute('data-id');
    history.pushState(null, null, "?page=standings&idleague=" + idleague);
    LoadPage('standings');
};

function LoadTeam(ctx) {
    let idteam = ctx.getAttribute('data-id');
    let urlParams = new URLSearchParams(window.location.search);
    history.pushState(null, null, `?page=team&idleague=${urlParams.get('idleague')}&idteam=` + idteam)
    LoadPage('team');
};

function LoadTeamFavorite(ctx) {
    let idteam = ctx.getAttribute('data-id');
    let urlParams = new URLSearchParams(window.location.search);
    history.pushState(null, null, `?page=favorite_team&idteam=` + idteam)
    LoadPage('favorite_team');
};

function Rest_API(mode_restapi) {
    return new Promise((resolve, reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let header_http = { "X-Auth-Token": "55ea38a93aae4e17afb8ddb99b393277" }
        let surl = ''
        if (mode_restapi == 'standings') surl = "https://api.football-data.org/v2/competitions/" + urlParams.get("idleague") + "/standings";
        else if (mode_restapi == 'team') surl = "https://api.football-data.org/v2/teams/" + urlParams.get("idteam");

        fetch(surl, { headers: header_http })
            .then(response => response.json())
            .then(data => { resolve({ status: "true", data: data }) })
            .catch(error => reject({ status: "error" }));
    })
}

function Loading(mode) {
    if (mode == 'show') document.getElementById('loading').classList = 'loadingshow'
    else if (mode == 'hide') document.getElementById('loading').classList = 'loadinghide';
}

class Render {
    RenderDataLiga() {
        let data = [
            { "name": "Champions League", "id": "2001", "img": "https://www.football-data.org/assets/logo_cl.png" },
            { "name": "Liga Jerman", "id": "2002", "img": "https://www.football-data.org/assets/logo_bundesliga.png" },
            { "name": "Liga Belanda", "id": "2003", "img": "https://www.football-data.org/assets/logo_eredivisie.png" },
            { "name": "Liga Inggris", "id": "2021", "img": "https://www.football-data.org/assets/portugueseprimeradivision.png" },
            { "name": "Liga Spanyol", "id": "2014", "img": "https://www.football-data.org/assets/logo_laliga.png" },
            { "name": "Liga Perancis", "id": "2015", "img": "https://www.football-data.org/assets/logo_ligue_1.png" }
        ]
        let main_data = document.getElementById('main_content');
        main_data.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            let div = document.createElement('div');
            div.classList = "col s6 m3";
            div.innerHTML = `<div class="card">
                                <div class="card-image">
                                    <img src="${data[i].img}" style="height:200px;object-fit:contain">
                                </div>
                                <div class="card-action">
                                    <a href="javascript:void(0);" data-id="${data[i].id}" class="link-standings" style="color:blue" onclick="LoadStanding(this)">${data[i].name}</a>
                                </div>
                            </div>`
            main_data.appendChild(div);
        }
    }

    async RenderDataStanding() {
        Loading('show');
        let item_api = await Rest_API('standings');
        Loading('hide');
        if (item_api.status == "true") {
            let data = item_api.data;
            let main_data = document.getElementById('main_content');
            main_data.innerHTML = '';

            let h5 = document.createElement('h5');
            h5.innerHTML = data.competition.name;
            main_data.appendChild(h5);
            let item_standings = data.standings;

            for (let i = 0; i < item_standings.length; i++) {

                if (item_standings[i].type == 'TOTAL') {
                    if (item_standings[i].group) {
                        let h6_stage = document.createElement('h6');
                        h6_stage.innerHTML = item_standings[i].group;
                        main_data.appendChild(h6_stage);
                    }

                    let row = document.createElement('div');
                    row.classList = 'row';

                    let clubitem = item_standings[i].table;
                    for (let i = 0; i < clubitem.length; i++) {
                        let div = document.createElement('div');
                        div.classList = "col s12 m3";
                        div.innerHTML = `<div class="card">
                                            <div class="card-image">
                                                <img src="${clubitem[i].team.crestUrl}" style="height:200px">
                                            </div>
                                            <div class="card-action">
                                                <a href="javascript:void(0);" data-id="${clubitem[i].team.id}" class="link-standings" style="color:blue;font-size:12px" onclick="LoadTeam(this);">${clubitem[i].team.name}</a>
                                            </div>
                                        </div>`
                        row.appendChild(div);
                    }
                    main_data.appendChild(row);
                }
            }
        }
    }

    async RenderDataTeam() {
        Loading('show');
        let item_api = await Rest_API('team');
        Loading('hide');
        if (item_api.status == "true") {
            let data = item_api.data;
            // materialize configuration
            let elems = document.querySelectorAll('.materialboxed');
            M.Materialbox.init(elems);

            let urlParams = new URLSearchParams(window.location.search);
            document.getElementById('lblNavigationStandings').setAttribute("data-id", urlParams.get('idleague'));

            document.getElementById('img_Team').src = data.crestUrl;
            document.getElementById('lblName_Team').innerHTML = data.name;
            document.getElementById('lblWebsite_Team').innerHTML = data.website;
            document.getElementById('lblCountry_Team').innerHTML = data.area.name;
            document.getElementById('lblEmail_Team').innerHTML = data.email;
            document.getElementById('lblPhone_Team').innerHTML = data.phone;

            let btnAction = document.getElementById('btnSave_Team');

            // check if data already exists indexdb
            DBShowItem(data.id).then(function (response) {
                if (response) {
                    btnAction.innerHTML = 'Remove from favorite';
                    btnAction.onclick = function () {
                        DBDelete(data.id);
                        M.toast({ html: 'Deleted' });
                        LoadPage('team');
                    }
                    document.getElementById('main_content').style.display = 'block';
                } else {
                    btnAction.innerHTML = 'Save to favorite';
                    btnAction.onclick = function () {
                        let data_temp = {
                            id: data.id,
                            crestUrl: data.crestUrl,
                            name: data.name,
                            area: { name: data.area.name },
                            phone: data.phone,
                            email: data.email,
                            website: data.website
                        }
                        DBSave(data_temp);
                        M.toast({ html: 'Saved' });
                        LoadPage('team');
                    }
                    document.getElementById('main_content').style.display = 'block';
                }
            });
        }
    }

    async RenderDataTeamFavorite() {
        Loading('show');
        let item_api = await Rest_API('team');
        Loading('hide');
        if (item_api.status == "true") {
            let data = item_api.data;
            // materialize configuration
            let elems = document.querySelectorAll('.materialboxed');
            M.Materialbox.init(elems);

            document.getElementById('img_Team').src = data.crestUrl;
            document.getElementById('lblName_Team').innerHTML = data.name;
            document.getElementById('lblWebsite_Team').innerHTML = data.website;
            document.getElementById('lblCountry_Team').innerHTML = data.area.name;
            document.getElementById('lblEmail_Team').innerHTML = data.email;
            document.getElementById('lblPhone_Team').innerHTML = data.phone;

            document.getElementById('btnSave_Team').onclick = function () {
                DBDelete(data.id);
                M.toast({ html: 'Deleted' });
                LoadPage('favorite');
            }
            document.getElementById('main_content').style.display = 'block';
        }
    }

    async RenderDataFavorite() {
        let main_data = document.getElementById('main_content');
        DBShowAll().then((mydata) => {
            mydata.forEach(function (data) {
                let chil_component = document.createElement('div');
                chil_component.classList = "col s12 m3";
                chil_component.innerHTML = `<div class="card">
                                    <div class="card-image">
                                        <img src="${data.crestUrl}" style="height:200px">
                                    </div>
                                    <div class="card-action">
                                        <a href="javascript:void(0);" data-id="${data.id}" class="link-standings" style="color:blue;font-size:12px" onclick="LoadTeamFavorite(this);">${data.name}</a>
                                    </div>
                                </div>`
                main_data.appendChild(chil_component);
            });
        })
    }
}



