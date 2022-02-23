const playerState = {}
let isPlaying = false
let player = null

const action_btn = document.getElementById('player_action')
const previous_btn = document.getElementById('player_previous')
const next_btn = document.getElementById('player_next')

function getPlayerState() {
  player.getCurrentState().then(state => {
    if (!state) {
      console.error('User is not playing music through the Web Playback SDK');
      return;
    }
    var current_track = state.track_window.current_track;
    
    Object.assign(playerState, {
      id: current_track.id,
      name: current_track.name,
      duration_ms: current_track.duration_ms,
      artists: current_track.artists.reduce((str, value) => {
        return str ? `${str}, ${value.name}` : `${value.name}`
      }, ''),
      album: current_track.album.name,
      album_img: current_track.album.images[0].url
    })
  
    console.log('Currently Player State', playerState);
    document.getElementById('player_title').innerHTML = playerState.name
    document.getElementById('player_artists').innerHTML = `${playerState.album} | ${playerState.artists}`
    document.getElementById('player_img').src = playerState.album_img
  });
}

function onPlay() {
  if (!isPlaying) {
    document.getElementById('action_icon').innerHTML = 'pause'
    player.togglePlay()
    isPlaying = true
    getPlayerState()
  } else {
    document.getElementById('action_icon').innerHTML = 'play_arrow'
    player.pause()
    isPlaying = false
    getPlayerState()
  }

  
}

window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQDKfoEUscvPsRDRfCAn6ov1yvFKd_KqZGb7aTVbNAV5GtC9xzngggff-aXvNvfI5NNgjJ5tOtcIp4jy_3Zf7UCcVKgHqZvq3vrASy4D_ZFDjV9iJcJCKhUonlRUuwoPOHDjz7iKt1gm4sElvlrkkcThJpxfsfS1iHUu';
  player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.2
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);

  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
  });

  player.addListener('initialization_error', ({ message }) => {
      console.error(message);
  });

  player.addListener('authentication_error', ({ message }) => {
      console.error(message);
  });

  player.addListener('player_state_changed', ({ message }) => {
    getPlayerState()
  });

  player.addListener('account_error', ({ message }) => {
    console.error(message);
});

  action_btn.onclick = function() {
    onPlay() 
  };

  previous_btn.onclick = function() {
    player.previousTrack()
    
  }

  next_btn.onclick = function() {
    player.nextTrack()
  }

  player.connect();
}