export default class ItemRenderer {
    constructor(item) {
        this.item = item;
    }

    // Render the item
    render() {
        return `<p>${this.item}</p>`;
    }

    // Rerender the item within a specified element
    rerender(element) {
        // Find the index of the element within its parent's children
        const children = element.parentElement.children;
        let index = 0;
        while (index < children.length && children.item(index) !== element) {
            index++;
        }

        // Replace the element's outerHTML with the updated rendering
        element.outerHTML = this.render();

        // Get the new element after rerendering
        const newElement = children.item(index);
        if (this.postRender) {
            this.postRender(newElement);
        }
    }

}
