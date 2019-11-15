let sound_effects = [
    { key: 'gameover', src: 'audio/warp.wav'},
    { key: 'getFlashlight', src: 'audio/getFlashlight.wav'},
    { key: 'pickupKey', src: 'audio/pickupKey.wav'},
    { key: 'walk', src: 'audio/walking.wav'},
    { key: 'locked', src: 'audio/locked.wav'},
    { key: 'doorOpen', src: 'audio/door_open.wav'}
];

function loadSFXs() {
    sound_effects.forEach((v) => {
        let audio = new Audio(v.src);
        sfx[v.key] = audio;

        console.log(`'${v.src} loaded!'`);
    });
}

function PlaySFX(audio) {
    audio.volume = 0.4;
    audio.play();
}