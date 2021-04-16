export default class ProductSlideshow {

    constructor() {

        this.slideshow = document.querySelector('#productSlideshow');

        this.products = [];

        if(this.slideshow !== null) {

            this.preview = document.querySelector('.product-slideshow-preview');

            this.init();

        }

    }

    init() {


        this.slideshow.querySelectorAll('.product-slideshow-control img').forEach(img => {

            this.products.push(img);

        });


    }

    eventsListener() {

        this.products.forEach(product => {

            product.addEventListener('click', event => {

                console.log(this.preview.children);

                let beforeRenderPreview = this.preview.children[0].src.replace(/(url\(\")|(\"\))/g, '');

                this.preview.children[0].src = `${product.src}`;

                product.src = beforeRenderPreview;

            });

        });

    }

}

