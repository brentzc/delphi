import { modifier } from 'ember-modifier';

export default modifier(function onResize(element, [ callback ]) {
    if (ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {
            callback({
                width: element.offsetWidth,
                height: element.offsetHeight
            });
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.unobserve(element);
        }
    }
});
