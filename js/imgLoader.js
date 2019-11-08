let imagesToLoad = [
    { key: 'pingoo', src: 'img/pingoo.png' },
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
