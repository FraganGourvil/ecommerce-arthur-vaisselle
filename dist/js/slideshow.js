const slideshow = document.querySelector('.slideshow-content');

const items = document.querySelectorAll('.slideshow-item');

const controls = document.querySelectorAll('.slideshow-control');

const delay = 490;

const interval = 5000;

let visible = 2;

const isEnd = () => {

    return items.length === visible;

};

const setHidden = (item) => {

    if(item.classList.contains('active')) {

        item.classList.add('closing');

        setTimeout(fct => {

            item.classList.remove('active');
            item.classList.remove('closing');

        }, delay);

    }

}

const setVisible = (item) => {

    setTimeout(fct => {

        item.classList.add('active');

    }, delay);

}

const incrementVisible = () => {

    return (!isEnd()) ? visible + 1 : 1;

};

const nextElement = () => {

    let item = items[visible - 1];

    items.forEach(item => setHidden(item));

    setVisible(item);

    controls.forEach(control => control.classList.remove('active'));

    controls[visible - 1].classList.add('active');

    visible = incrementVisible();

};

let timer = setInterval(nextElement, interval);

controls.forEach(control => {

    control.addEventListener('click', event => {

        let index = control.dataset.slideshowItem;

        let item = items[index - 1];

        items.forEach(item => setHidden(item));

        setVisible(item);

        controls.forEach(control => control.classList.remove('active'));

        control.classList.add('active');

        visible = incrementVisible();

        clearInterval(timer);

        timer = setInterval(nextElement, interval);

    });

});