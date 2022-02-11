const greeting_messages = [
  'Bom dia,',
  'Boa tarde,',
  'Boa noite,'
];

async function renderLocation(position) {
  const locationLabel = document.getElementById('location_name');
  const baseGeoLocationUrl = `
    https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1
  `
  const fetchResponse = await fetch(baseGeoLocationUrl, {method: 'GET'})
  const json = await fetchResponse.json()
  const { city, region } = json

  locationLabel.classList.remove('empty-location')
  locationLabel.classList.remove('empty-animation')
  if (!region && !city) {
    locationLabel.innerHTML = 'Florestal'
  } else {
    locationLabel.innerHTML = region || city
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(renderLocation);
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
  getLocation()


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