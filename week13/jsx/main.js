import { Component,createElement } from '../Frontend-02-Template/week12/jsx/framework'
import { Carousel } from './carousel'
import {Timeline, Animation} from "./animation";


let d = [
    "http://www.517lyq.com/Public/uploadfile/file/2016-10-16/5803361a774d4.jpg",
    "http://img3.iqilu.com/data/attachment/forum/pw/Mon_1112/284_190631_c8147bb44785965.jpg",
    "http://pic34.photophoto.cn/20150315/0034034862056002_b.jpg"
];

let a = <Carousel src={ d }/>
a.mountTo(document.body);

let tl = new Timeline();
window.tl = tl;
window.animation = new Animation({set a(v) { console.log(v)}}, "a", 0, 100, 1000, null);
//tl.add(new Animation({set a(v) { console.log(v)}}, "a", 0, 100, 1000, null));
tl.start();
