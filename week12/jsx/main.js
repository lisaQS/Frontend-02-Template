import { Component,createElement } from './framework'

class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        for (let record of this.attributes.src) {
            let child = document.createElement('div');
            child.style.backgroundImage = `url(${record})`;
            this.root.appendChild(child);
        }

        //自动滚动
        /* let currentIndex = 0;
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;
            let current = children[currentIndex];
            let next = children[nextIndex];
            next.style.transition = "none";
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
            setTimeout(() => {
                next.style.transition = "";
                current.style.transform = `translateX(${ -100 - nextIndex * 100 }%)`
                next.style.transform = `translateX(${ - nextIndex * 100}%)`;
                currentIndex = nextIndex
            }, 16)

        }, 3000) */

        //鼠标事件
        let position = 0;
        this.root.addEventListener('mousedown', event => {
            let children = this.root.children;
            let startX = event.clientX;

            let move = event => {
                let x = event.clientX - startX;
                let current = position -  ((x - x % 500) / 500);

                for (let offset of [0,-Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;
                    children[pos].style.transition = 'none';
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
                }
            }

            let up = event => {
                let x = event.clientX - startX;
                position = position -  Math.round(x / 500);

                for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;
                    children[pos].style.transition = 'none';
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`;
                }

                document.removeEventListener('mousemove', move);
                document.removeEventListener('mousemove', up);
            }
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        })
        return this.root;
    }

    mountTo(parent) {
        parent.appendChild(this.render());
    }
}

let d = [
    "http://www.517lyq.com/Public/uploadfile/file/2016-10-16/5803361a774d4.jpg",
    "http://img3.iqilu.com/data/attachment/forum/pw/Mon_1112/284_190631_c8147bb44785965.jpg",
    "http://pic34.photophoto.cn/20150315/0034034862056002_b.jpg"
];

let a = <Carousel src={ d }/>

a.mountTo(document.body);
