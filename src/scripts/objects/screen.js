const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info"><img src="${
      user.avatarUrl
    }" alt="foto de perfil do usuário"/>
                    <div class=data>
                    <h1>${user.name ?? "Não possui nome cadastrado 😕"}</h1>
                    <p>${user.bio ?? "Não possui bio cadastrada 😕"}</p> <br>
                    <p>Seguidores: ${user.followers}  Seguindo: ${
      user.following
    }</p>
                    </div>
                </div>`;

    let repositoriesItens = "";
    user.repositories.forEach( (repo) =>
        (repositoriesItens += `<li>
            <div class="repo-container">
            
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>

                            <div class="repo-info">
                                <p>🍴 ${repo.forks_count}</p>
                                <p>🌟 ${repo.stargazers_count}</p>
                                <p>👀 ${repo.watchers_count}</p>
                                <p>💻 ${repo.language}</p>                                                                                                                                    
                            </div>
            </div>
            </li>
            `)
    );
    if (user.repositories.length > 0) {
    this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                                </div>`;
    }

    let eventsItens = "";

    user.events
      .filter(
        (event) => event.type === "CreateEvent" || event.type === "PushEvent"
      )
      .forEach((event) => {
        if (event.type === "PushEvent") {
          eventsItens += `<li> <a href="https://github.com/${
            event.repo.name
          }" target="_blank"> ${event.repo.name}</a> - ${
            event.payload.commits.slice(-1)[0].message
          } </li>`;
          console.log(eventsItens);
        } else if (event.type === "CreateEvent") {
          eventsItens += `<li> Create ${event.payload.ref_type} (Sem mensagem de commit!) </li>`;
        }
      });

    if (eventsItens) {
      this.userProfile.innerHTML += ` <div class="events section">
                                                <h2> Eventos </h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`;
    }
  },

  renderNotFound() {
    this.userProfile.innerHTML += "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
