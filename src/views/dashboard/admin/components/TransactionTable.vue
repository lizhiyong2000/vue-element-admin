<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="200">
      <template #default="scope">
        {{ scope.row.order_no }}
      </template>
    </el-table-column>

    <el-table-column label="Date" width="195" align="center">
      <template #default="scope">
        {{ formatTime(scope.row.timestamp, '{y}-{m}-{d}') }}
      </template>
    </el-table-column>

    <el-table-column label="User" width="195" align="center">
      <template #default="scope">
        {{ scope.row.username }}
      </template>
    </el-table-column>

    <el-table-column label="Price" width="195" align="right">
      <template #default="scope">
        ¥{{ toThousandFilter(scope.row.price) }}
      </template>
    </el-table-column>

    <el-table-column label="Status" width="100" align="center">
      <template #default="{row}">
        <el-tag :type="statusFilter(row.status)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'

import {toThousandFilter} from '@/filters'

import { parseTime, formatTime } from '@/utils'

export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       success: 'success',
  //       pending: 'danger'
  //     }
  //     return statusMap[status]
  //   },
  //   orderNoFilter(str) {
  //     return str.substring(0, 30)
  //   }
  // },
  data() {
    return {
      list: null
    }
  },

  computed: {
    toThousandFilter(){
      return toThousandFilter
    },
    statusFilter() {
      return (status) => {
        const statusMap = {
          success: 'success',
          pending: 'danger'
        }

        console.log(`statusFilter, origin:${status}`)
        return statusMap[status]
      }
    }
  ,
    orderNoFilter(){
     return (str) => {
        return str.substring(0, 30)
      }
    },
    formatTime() {
      return formatTime
    }
  },


  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items
        // this.list = response.data.items.slice(0, 8)
        
      })
    }
  }
}
</script>
