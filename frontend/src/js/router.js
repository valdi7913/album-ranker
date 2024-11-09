function route(event) {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
}

const routes = {
  404: "404.html",
  "/": "index.html",
};

async function handleLocation(event) {}

window.route = route;
