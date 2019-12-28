<template>
    <div class="home_container">
        <page-container father-component="home"></page-container>
    </div>
</template>

<script>
    import pageContainer from '@/components/pageContainer'
    export default {
        name: 'home',
        components: {pageContainer},
        data() {
            return {};
        }
    };
</script>

<style lang="scss" scoped>
</style>