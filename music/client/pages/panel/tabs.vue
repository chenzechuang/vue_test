<template>
    <div class="tabs">
        <div class="tabs-bar">
            <div 
                v-for="(item, index) in navList"
                :class="tabCls(item)"
                @click="handleChange(index)">
                {{ item.label }}
            </div>
        </div>
        <div class="tabs-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentValue: this.value,
            navList: []
        }
    },
    props: {
        value: {
            type: [Number, String]
        }
    },
    methods: {
        tabCls(item) {
            return [
                'tabs-tab', {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        getTabs() {
            this.$children.filters(function(item) {
                return item.$options.name === "pane";
            })
        },
        updateNav() {
            this.navList = [];
            this.getTabs().forEach((pane, index) => {
                this.navList.push({
                    name: pane.name || index,
                    label: pane.label
                })
                if (index === 0) {
                    if (!this.currentValue) {
                        this.currentValue === pane.name || 0;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus() {
            
        },
        handleChange(index) {
            
        } 
    },
}
</script>