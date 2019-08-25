<script>
    export default {
        props: {
            columns: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            data: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data() {
            return {
                currentColumns: [],
                currentData: []
            }
        },
        render(h) {
            var _this = this;
            var ths = [];
            _this.currentColumns.forEach(function(col, index) {
                if (col.sortable) {
                    ths.push(h('th', [
                        h('span', col.label),
                        h('a', {
                            class: {
                                on: col._sortType === 'asc',
                            },
                            on: {
                                click: function () {
                                    _this.handleSort(index, 'asc');
                                }
                            }
                        }, '↑'),
                        h('a', {
                            class: {
                                on: col._sortType === 'desc',
                            },
                            on: {
                                click: function () {
                                    _this.handleSort(index, 'desc');
                                }
                            }
                        }, '↓')
                    ]))
                } else {
                    ths.push(h('th', col.label));
                }
            });
            var trs = [];
            _this.currentData.forEach(function (row) {
                var tds = [];
                _this.currentColumns.forEach(function (cell) {
                    tds.push(h('td', row[cell.key]));
                });
                trs.push(h('tr', tds));
            })
            return h('table', [
                h('thead', [
                    h('tr', ths)
                ]),
                h('tbody', trs)
            ])
        },
        methods: {
            makeColumns() {
                this.currentColumns = this.columns.map(function (col, index) {
                    col._sortType = 'normal';
                    col._index = index;
                    return col;
                });
            },
            makeData() {
                this.currentData = this.data.map(function (row, index) {
                    row._index = index;
                    return row;
                });
            },
            handleSort(index, type) {

            }
        },
        mounted() {
            this.makeColumns();
            this.makeData();
        },
    }
</script>