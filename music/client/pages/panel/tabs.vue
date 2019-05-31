<template>
    <div class="tabs">
        <div class="tabs-bar">
            <div 
                v-for="(item, index) in navList"
                :class="tabCls(item)"
                @click="handleChange(index)"
                v-show="item.prop">
                {{ item.label }}
                <i @click="removeTab(index)">X</i>
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
            return this.$children.filter(function(item) {
                return item.$options.name === "pane";
            })
        },
        updateNav() {
            this.navList = [];
            this.getTabs().forEach((pane, index) => {
                this.navList.push({
                    name: pane.name || index,
                    label: pane.label,
                    prop: pane.prop
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
            this.getTabs().forEach(tab => {
                return tab.show = tab.name === this.currentValue;
            })
        },
        handleChange(index) {
            let nav = this.navList[index];
            this.currentValue = nav.name;
            this.$emit("input", nav.name);
        },
        removeTab(index) {
            this.navList.splice(index, 1);
            this.currentValue = '0';
            event.stopPropagation();
        }
    },
    watch: {
        value: function(val) {
            this.currentValue = val;
        },
        currentValue: function() {
            this.updateStatus();
        }
    }
}
</script>
<style lang="scss" scoped>
    .tabs {
        font-size: 14px;
        color: #657180;
        .tabs-bar:after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: #d7dde4;
            margin-top: -1px;
        }
        .tabs-tab {
            position: relative;
            display: inline-block;
            padding: 5px 25px 5px 10px;
            margin: 0 5px;
            background: #fff;
            border: 1px solid #d7dde4;
            cursor: pointer;
            i {
                right: 8px;
                top: 5px;
                position: absolute;
            }
        }
        .tabs-tab-active {
            color: #3399ff;
            border-top: 1px solid #3399ff;
            border-bottom: 1px solid #fff;
            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                color: #3399ff;
            }
        }
        .tabs-content {
            padding: 8px;
        }
    }

</style>