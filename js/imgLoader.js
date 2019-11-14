let imagesToLoad = [
    { key: 'pingoo', src: 'img/pingoo.png' },
    { key: 'brick1', src: 'img/brick1.png' },
    { key: 'floor1', src: 'img/floor1.png' },
    { key: 'doorOpen', src: 'img/door_opened.png' },
    { key: 'doorClose', src: 'img/door_locked.png' },
    { key: 'key', src: 'img/key1.png' },
    { key: 'fog', src: 'img/darkfog.png' },
];

function loadImages() {
    imagesToLoad.forEach((v) => {
        let img = new Image();
        img.src = v.src;
        img.onload = () => {
            console.log(`'${v.src}' loaded!`)
        };
        images[v.key] = img;
    });
}
