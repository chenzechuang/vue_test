<template>
    <div>
        <input type="text" :value="currentValue" @change="handleChange" @focus="listenUpDown" @blur="unListenUpDown">
        <button @click="handleNumber('increase')" :disabled="currentValue >= max">+</button>
        <button @click="handleNumber('reduce')" :disabled="currentValue <= min">-</button>
    </div>
</template>

<script>
    export default {
        props: {
            max: {
                type: Number,
                default: Infinity 
            },
            min: {
                type: Number,
                default: -Infinity
            },
            value: {
                type: Number,
                default: 0
            },
            step: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                currentValue: this.value
            }
        },
        watch: {
            currentValue: function(val) {
                this.$emit('input', val);
                this.$emit('changenum', val);
            },
            value: function(val) {
                this.updateValue(val);
            }
        },        
        methods: {
            isValueNumber(val) {
                return (/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/).test(val);
            },
            handleNumber(type) {
                if (type == 'increase') {
                    if (this.currentValue >= this.max) {
                        return
                    } else {
                        this.currentValue += this.step;
                    }
                } else {
                    if (this.currentValue <= this.min) {
                        return
                    } else {
                        this.currentValue -= this.step;
                    }
                }
            },
            handleChange(event) {
                let val = event.target.value.trim();
                val = Number(val);
                if(this.isValueNumber(val)) {
                    this.currentValue = val;  
                    if (val > this.max) {
                        this.currentValue = this.max;
                    } else if (val < this.min) {
                        this.currentValue = this.min;
                    }
                } else {
                    event.target.value = this.currentValue;
                }
            },
            updateValue(val) {
                if (val > this.max) {
                    val = this.max;
                } else if (val < this.min) {
                    val = this.min;
                }
                this.currentValue = val;
            },
            handleKeyDown(event) {
                if (event.keyCode == 40) {
                    this.currentValue -= this.step;
                } else if (event.keyCode == 38) {
                    this.currentValue += this.step;
                }
            },
            listenUpDown(event) {
                event.target.addEventListener("keydown", this.handleKeyDown);
            },
            unListenUpDown(event) {
                event.target.removeEventListener("keydown", this.handleKeyDown);
            }
        },
        mounted() {
            this.updateValue(this.value);
        },
    }
</script>