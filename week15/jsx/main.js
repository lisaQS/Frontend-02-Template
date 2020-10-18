import { createElement } from './framework.js'
import { Carousel } from './carousel.js'
import { Button } from './button.js'
import { List } from './list.js'


let d = [
    "http://www.517lyq.com/Public/uploadfile/file/2016-10-16/5803361a774d4.jpg",
    "http://img3.iqilu.com/data/attachment/forum/pw/Mon_1112/284_190631_c8147bb44785965.jpg",
    "http://pic34.photophoto.cn/20150315/0034034862056002_b.jpg"
];

let a = <List data={ arr }>
    {(record) =>
        <div>
            <img src={ record.img } />
            <a href={ record.url }>{ record.title }</a>
        </div>
    }
</List>
a.mountTo(document.body);
