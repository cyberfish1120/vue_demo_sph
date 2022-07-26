<template>
  <div class="pagination">
    <span @click="goPage">
      <button :disabled="pageNo===1">上一页</button>
      <button v-if="startNumAndEndNum.start > 1" :class="{active:pageNo===1}">1</button>
      <button v-if="startNumAndEndNum.start > 2">···</button>
      <button
        v-for="(page, index) in startNumAndEndNum.end - startNumAndEndNum.start"
        :key="index"
        :class="{active:pageNo===startNumAndEndNum.start + page - 1}"
      >
        {{ startNumAndEndNum.start + page - 1 }}
      </button>
      <button v-if="startNumAndEndNum.end < totalPages - 1">···</button>
      <button :class="{active:pageNo===totalPages}">{{ totalPages }}</button>
      <button :disabled="pageNo===totalPages">下一页</button>
    </span>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'totalPages', 'continues', 'getPageNo'],
  computed: {
    startNumAndEndNum() {
      // console.log(this.pageNo, this.pageSize, this.total, this.totalPages, this.continues)
      let start = this.pageNo - (this.continues>>1) || 1,
        end = this.pageNo + (this.continues>>1) + 1 || 1;
      if (start < 1) start = 1;
      if (end > this.totalPages) end = this.totalPages;
      return { start, end };
    },
  },
  methods: {
    goPage(e) {
      let text = e.target.innerText;
      if (text !== "...") {
        if (text === "上一页") this.$emit('getPageNo', this.pageNo - 1)
        else if (text === "下一页") this.$emit('getPageNo', this.pageNo + 1)
        else this.$emit('getPageNo', Number(text))
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
    //   cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  };
}
</style>