<template>
    <div class="question_container">
        <page-container father-component="item"></page-container>
    </div>
</template>

<script>
    import pageContainer from '@/components/pageContainer'
    export default {
        name: 'item',
        components: {pageContainer},
        created() {
            this.$store.commit('REMBER_TIME');
        },
    }
    
</script>

<style lang="scss" scoped>

</style>