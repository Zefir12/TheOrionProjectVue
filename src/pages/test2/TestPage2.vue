<template>
    <div class="virtual-scroller" @scroll="handleScroll">
        <div class="scroll-content" :style="{ height: totalHeight + 'px' }">
            <div v-for="(item, index) in visibleItems" :key="item.id" class="item" :style="{ transform: `translateY(${item.offset}px)` }">
                <Item v-model="items[item.id]" @delete="removeItem"></Item>
            </div>
        </div>
    </div>
</template>

<script>
import Item from "./Item.vue";
export default {
    components: {
        Item
    },
    data() {
        return {
            items: [], // Your full list of items
            itemHeight: 50, // Height of each item
            visibleItemCount: 10, // Number of items visible in the viewport
            startIndex: 0, // Index of the first visible item
            scrollTop: 0 // Current scroll position
        };
    },
    computed: {
        // Calculate the total height of the scrollable content
        totalHeight() {
            return this.items.length * this.itemHeight;
        },
        // Determine which items are currently visible
        visibleItems() {
            const endIndex = Math.min(this.startIndex + this.visibleItemCount, this.items.length);
            return this.items.slice(this.startIndex, endIndex).map((item, index) => ({
                ...item,
                offset: (this.startIndex + index) * this.itemHeight
            }));
        }
    },
    methods: {
        handleScroll(event) {
            this.scrollTop = event.target.scrollTop;
            this.startIndex = Math.floor(this.scrollTop / this.itemHeight);
        },
        // Method to remove an item by its ID
        removeItem(id) {
            this.items = this.items.filter((item) => item.id !== id);
        }
    },
    mounted() {
        // Populate your items (for example)
        this.items = Array.from({ length: 100000 }, (_, i) => ({
            id: i,
            name: `Item ${i}`,
            tags: [
                { name: "lol", value: 1 },
                { name: "lol2", value: 2 }
            ]
        }));
    }
};
</script>

<style>
.virtual-scroller {
    height: 500px; /* Set a fixed height for the scroller */
    width: 600px;
    overflow-y: auto;
    position: relative;
    margin-left: 200px;
}

.scroll-content {
    position: relative;
}

.item {
    position: absolute;
    width: 100%;
    height: 50px; /* Match itemHeight */
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
}
</style>
