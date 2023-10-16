export default class ListRenderer {
    constructor(list, container, itemRenderer) {
        // Store the itemRenderer and container elements
        this.itemRenderer = itemRenderer;
        if (container instanceof Element) {
            this.container = container;
        } else if (typeof container === "string") {
            this.container = document.querySelector(container);
        } else {
            console.error("Container is not of the required type");
            console.error(container);
        }
        // Initialize the list and sort the list
        this.setList(list);
    }

    // Set the list of items
    setList(list) {
        // Create a list of itemRenderer instances from the input list
        this.list = list.map((item) => new this.itemRenderer(item));

        // Sort the list based on the specified criteria
        const sortBy = this.sortBy;
        this.sortBy = undefined;
        this.sortBy(sortBy, this.sortDir);
    }

    // Clear the container element
    clear() {
        this.container.innerHTML = "";
    }

    // Render the list of items
    render() {
        this.clear; // Clear the container

        // Filter the list based on filter criteria
        const filteredList = this.list.filter((item) => this.filterProperty === "*" || item.item[this.filterProperty] == this.filterValue);

        // Render and insert each item in the filtered list
        for (const itemRenderer of filteredList) {
            const html = itemRenderer.render();
            this.container.insertAdjacentHTML("beforeend", html);

            // Call postRender method if available
            if (itemRenderer.postRender) {
                const element = this.container.lastElementChild;
                itemRenderer.postRender(element);
            }
        }
    }
}
