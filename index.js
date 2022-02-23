const greeting_messages = [
  'Bom dia,',
  'Boa tarde,',
  'Boa noite,'
];

const my_favorites_pages = [
  {
    url: 'https://www.twitch.tv/',
    img_url: 'https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png',
    name: 'Twitch TV'
  },
  {
    url: 'https://www.youtube.com',
    img_url: 'https://www.youtube.com/s/desktop/5783224d/img/favicon_144x144.png',
    name: 'Youtube'
  }
]

function renderFavorites() {
  const container = document.getElementsByClassName('favorite_container')[0]

  const elements = my_favorites_pages.map(page => {
    const img_element = document.createElement('img')
    img_element.src = page.img_url
    img_element.alt = page.name
    img_element.width = '32px'
    img_element.height = '32px'
    const link_element = document.createElement('a')
    link_element.href = page.url
    link_element.innerHTML = page.name

    const el = document.createElement('div')

    el.append(img_element)
    el.append(link_element)
    return el
  })

  elements.forEach(el => container.append(el))

  
}

async function getLocationFromGoogle() {
  const google_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=128+Rua+Geni+Naime+Silva&key=AIzaSyCS_8yhBoQYaClW7ta9wuUmqZBi_-4F5js';

  const fetchResponse = await fetch(google_url, { method: 'GET' });
  const json = await fetchResponse.json();
  const cityObject = json.results[0].address_components.filter(
    (components) => components.types.indexOf('administrative_area_level_2') != -1
  )[0];

  return cityObject.long_name
}

async function renderLocation() {
  const locationLabel = document.getElementById('location_name');
  const locationName = await getLocationFromGoogle()

  locationLabel.classList.remove('empty-location')
  locationLabel.classList.remove('empty-animation')
  if (!locationName) {
    locationLabel.innerHTML = 'Florestal 🦇'
  } else {
    locationLabel.innerHTML = locationName
  }
}

function renderTime() {
  const dateLabel = document.getElementById('date');
  const timeLabel = document.getElementById('time');
  const greetingLabel = document.getElementById('greeting_message');

  const dateNow = new Date();

  const date = dateNow.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const time = dateNow.toLocaleDateString('pt-BR', {
    hour: 'numeric',
    minute: 'numeric',

  }).split(' ')[1]

  dateLabel.classList.remove('empty-date')
  dateLabel.classList.remove('empty-animation')
  dateLabel.innerHTML = date;
  dateLabel.setAttribute('datetime', date);
  timeLabel.classList.remove('empty-time')
  timeLabel.classList.remove('empty-animation')
  timeLabel.innerHTML = time;
  timeLabel.setAttribute('datetime', time);

  if (dateNow.getHours() < 12) {
    greetingLabel.innerHTML = greeting_messages[0]
  } else if (dateNow.getHours() < 18) {
    greetingLabel.innerHTML = greeting_messages[1]
  } else {
    greetingLabel.innerHTML = greeting_messages[2]
  }
}

function main() {
  renderTime()
  
}

function render() {
  renderLocation()
  // renderFavorites()

  setInterval(renderTime, 1000);


}

function searchHandler() {
  const input = document.getElementById('google_search')
  const value = input.value
  const search_term = value.replace(/\s+/g, '+')
  const search_url = `https://www.google.com/search?q=${search_term}`
  window.open(search_url)
  input.value = ''
}

render()

document.getElementById('btn_search').addEventListener('click', searchHandler)