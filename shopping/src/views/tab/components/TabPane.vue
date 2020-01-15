<template>
  <div>
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="title" class="filter-item" style="width: 200px;" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="importance" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :value="item" :label="item"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">search</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">create</el-button>
    </div>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column label="ID" width="65" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" min-width="300px">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
          <el-tag>{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Importance" width="120px">
        <template slot-scope="scope">
          <svg-icon v-for="n in scope.row.importance" :key="n" icon-class="star" />
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="120">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/' + scope.row.id">
            <el-button type="primary" size="small" icon="el-edit-icon" @click="handleEdit(scope.row)">Edit</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" :page-sizes="[5,10,20]"></pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width:400px;margin-left:50px">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status">
            <el-option v-for="item in statusOptions" class="filter-item" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Importance">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;"></el-rate>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">cancel</el-button>
        <el-button type="primary" @click="dialogStatus==='create' ? createData() : updateData()">confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, createArticle } from '@/api/article'
  import Pagination from '@/components/Pagination'
  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status];
      }
    },
    components: {
      Pagination
    },
    props: {
      type: {
        type: String,
        default: 'CN'
      }
    },
    data() {
      return {
        list: [],
        importanceOptions: ["all", 1, 2, 3],
        total: 0,
        loading: false,
        listQuery: {
          importance: '',
          title: '',
          type: this.type, 
          page: 1, 
          limit: 5, 
          sort: '+id'
        },
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        calendarTypeOptions,
        statusOptions: ['published', 'draft', 'deleted'],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        this.$emit('create')
        fetchList(this.listQuery).then(res => {
          this.list = res.data.items;
          this.total = res.data.total;
          this.loading = false;
        })
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        }
      },
      handleCreate() {
        this.resetTemp();
        this.dialogFormVisible = true;
        this.dialogStatus = 'create';
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate();
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'czc'
            createArticle(this.temp).then(res => {
              if (res.status === 200 && res.data.data === 'success') {
                this.list.unshift(this.temp);
                this.dialogFormVisible = false;
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      },
      handleEdit(row) {
        this.temp = Object.assign({}, row);
        this.temp.timestamp = new Date(this.temp.timestamp);
        this.dialogFormVisible = true;
        this.dialogStatus = 'update';
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate();
        })
      },
      updateData() {

      }
    },
  }
</script>

<style lang="scss" scoped>

</style>